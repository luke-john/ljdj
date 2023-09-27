const htmlIndexPath = import.meta.resolve("./htmlIndex.html");
const htmlIndexText = await (await fetch(htmlIndexPath)).text();

Deno.writeTextFileSync(
  "./build/htmlIndexText.ts",
  `export const htmlIndexText = "${encodeURI(htmlIndexText)}"`,
);

// The htmlIndex.html file was bundled using vite from something that looks like follows
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
