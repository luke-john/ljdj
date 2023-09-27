import React from "npm:react";
import { renderToString } from "npm:react-dom/server";

import { html } from "https://deno.land/x/display@v0.1.1/mod.ts";
import { htmlIndexText } from "./build/htmlIndexText.ts";

export function djSSR(reactNode: React.ReactNode) {
  try {
    return html`${renderToString(reactNode)}`;
  } catch (error) {
    return `Error: ${error}`;
  }
}

/**
 * pass in params
 */
export function djJSX(params: Record<string, any>) {
  return function djJSXRaw(
    strings: TemplateStringsArray,
    ...values: any[]
  ): ReturnType<typeof html> {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        result += values[i];
      }
    }

    return html`<iframe src="http://localhost:8578/?jsx=${
      encodeURIComponent(result)
    }&params=${
      encodeURIComponent(JSON.stringify(params || {}))
    }" frameBorder="1" height="200" width="100%" allow="clipboard-read *; clipboard-write *;"></iframe>`;
  };
}

export function djSPA<TransferProps>(
  transferProps: TransferProps,
  Component: (transferProps: TransferProps) => React.ReactComponent,
) {
  try {
    let body = decodeURI(htmlIndexText);
    body = body.replace(
      `globalThis.src = "() => {}"`,
      `globalThis.src = "${encodeURIComponent(Component.toString())}"`,
    );
    body = body.replace(
      `globalThis.transferProps = "{}"`,
      `globalThis.transferProps = "${
        encodeURIComponent(JSON.stringify(transferProps))
      }"`,
    );

    return html`${body}`;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
