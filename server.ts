const handler = async (request: Request): Promise<Response> => {
  if (!request.headers.get("accept")?.includes("text/html")) {
    return new Response("Not Found", { status: 404 });
  }

  const requestUrl = new URL(request.url);
  const jsx = requestUrl.searchParams.get("jsx")!;

  const htmlIndexPath = import.meta.resolve("./htmlIndex.html");
  const htmlIndexText = await (await fetch(htmlIndexPath)).text();

  let body = htmlIndexText.replace(
    `globalThis.jsx = "<p>jsx</p>"`,
    `globalThis.jsx = "${encodeURIComponent(jsx.trim())}"`,
  );

  const params = requestUrl.searchParams.get("params")!;
  body = body.replace(
    `globalThis.params = "{}"`,
    `globalThis.params = "${encodeURIComponent(params.trim())}"`,
  );

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
};

Deno.serve({ port: 8578 }, handler);

// The htmlIndex.html file was bundled from something that looks like follows
/*
import * as React from "react";
import * as BabelStandalone from "@babel/standalone";

const commonProps = {
  // react
  React,
};

function App() {
  // @ts-ignore
  const jsx = decodeURIComponent(globalThis.jsx);
  // @ts-ignore
  const params = JSON.parse(decodeURIComponent(globalThis.params));

  const input = jsx || 'const getMessage = () => "Hello World";';
  const output = BabelStandalone.transform(input, { presets: ["env", "react"] })
    .code!;

  const codeWithUseStrictTrimmed = output.replace(/"use strict";/g, "")
    .trimStart();

  const props = Object.keys({ ...commonProps, ...params });
  const result = new Function(
    ...props,
    `return ${codeWithUseStrictTrimmed}; `,
  )(...Object.values({ ...commonProps, ...params }));

  return (
    <>
      {result}
    </>
  );
}

export default App;
*/
