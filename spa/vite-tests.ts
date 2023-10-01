import { build } from "npm:vite";

import { render } from "./src/server-entry.tsx";

import config from "./vite.config.mjs";

export async function getHtml(
  { Component, transferProps, comm_id }: {
    Component: React.ReactNode;
    transferProps: Record<string, any>;
    comm_id: string;
  },
) {
  // run this first to cache deps
  const appHtml = render({
    source: Component.toString(),
    transferProps: JSON.parse(JSON.stringify(transferProps)),
    comm_id,
  });

  // vite root does not seem to be respected with deno
  const currentWorkingDirectory = Deno.cwd();
  Deno.chdir("/Users/lukewoollard/personal/ljdj/spa/");
  const { output } = await build({
    // configFile: "./vite.config.mjs",
    inlineConfig: config,
    build: {
      write: false,
    },
  });
  Deno.chdir(currentWorkingDirectory);

  let html = output[0].source;

  html = html.replace(
    `globalThis.src = "() => {}"`,
    `globalThis.src = "${encodeURIComponent(Component.toString())}"`,
  );
  html = html.replace(
    `globalThis.transferProps = "{}"`,
    `globalThis.transferProps = "${
      encodeURIComponent(JSON.stringify(transferProps))
    }"`,
  );
  html = html.replace(
    `globalThis.comm_id = ""`,
    `globalThis.comm_id = "${comm_id}"`,
  );

  html = html.replace(`<!--ssr-outlet-->`, appHtml);

  return html;
}
