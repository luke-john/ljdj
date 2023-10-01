import React from "npm:react";
import { renderToString } from "npm:react-dom/server";

import { html } from "https://deno.land/x/display@v0.1.1/mod.ts";

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

import { getHtml } from "./spa/vite-tests.ts";

/**
How this works:

1. The props and component are serialized to string representations
2. These are then written to a html string template
3. The html string is then returned as a displayable object
4. Jupyter then renders the html string in a Jupyter frontend
 */
export async function djSPA<TransferProps>(
  transferProps: TransferProps,
  Component: (transferProps: TransferProps) => React.ReactComponent,
  comm_id: string,
  update_display_data?: boolean,
) {
  try {
    const initialHtml = await getHtml({ Component, transferProps, comm_id });

    return Deno.jupyter.broadcast(
      update_display_data ? "update_display_data" : "display_data",
      {
        data: {
          "text/html": initialHtml,
        },
        metadata: {},
        transient: { display_id: comm_id },
      },
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
