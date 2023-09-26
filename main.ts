import { html } from "https://deno.land/x/display@v0.1.1/mod.ts";

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
