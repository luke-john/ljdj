import * as React from "react";

const commonProps = {
  // react
  React,
};

function App() {
  // @ts-ignore
  const source = decodeURIComponent(globalThis.src);
  const transferProps = JSON.parse(
    // @ts-ignore
    decodeURIComponent(globalThis.transferProps),
  );

  const props = Object.keys({ ...commonProps, ...transferProps });
  const TransferredComponent = new Function(
    ...props,
    `return ${source}; `,
  )(...Object.values({ ...commonProps }));

  return <TransferredComponent {...transferProps} />;
}

export default App;
