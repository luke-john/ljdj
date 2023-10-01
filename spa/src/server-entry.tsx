import React from "npm:react";
import ReactDOMServer from "npm:react-dom/server";
import { ErrorBoundary } from "npm:react-error-boundary";

import { App } from "./App.jsx";

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export function render(
  { source, transferProps, comm_id }: {
    source: string;
    transferProps: any;
    comm_id: string;
  },
) {
  const rendered = ReactDOMServer.renderToString(
    <React.StrictMode>
      <ErrorBoundary fallback={fallbackRender}>
        <App source={source} transferProps={transferProps} />
      </ErrorBoundary>
    </React.StrictMode>,
  );

  return rendered;
}
