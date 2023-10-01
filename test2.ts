import { getHtml } from "./spa/vite-tests.ts";

const html = await getHtml({ Component: () => null, transferProps: {} });

// debug tooling
console.log(html);
Deno.writeTextFileSync("test.html", html);
