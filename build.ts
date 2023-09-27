const htmlIndexPath = import.meta.resolve("./spa/dist/index.html");
const htmlIndexText = await (await fetch(htmlIndexPath)).text();

Deno.writeTextFileSync(
  "./build/htmlIndexText.ts",
  `export const htmlIndexText = "${encodeURI(htmlIndexText)}"`,
);
