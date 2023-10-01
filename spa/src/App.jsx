import * as React from "npm:react";

const commonProps = {
  React,
};

export function App({ source, transferProps, comm_id }) {
  const props = Object.keys({ ...commonProps, ...transferProps });
  let jsx;
  try {
    const TransferredComponent = new Function(
      ...props,
      `return ${source}; `,
    )(...Object.values({ ...commonProps }));

    jsx = TransferredComponent(transferProps);
  } catch (error) {
    jsx = (
      <>
        <p>
          <strong>error:</strong> {error.message}
        </p>
        {error.message.endsWith("is not defined")
          ? (
            <p>
              djSPA cannot only use jsx and items that can be serialized and
              transfered via transferProps
            </p>
          )
          : null}
      </>
    );
  }

  return (
    <>
      {jsx}
    </>
  );
}
