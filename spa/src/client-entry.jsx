import React from 'npm:react'
import ReactDOM from 'npm:react-dom/client'
import { ErrorBoundary } from "npm:react-error-boundary";

import {App} from './App.jsx'

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

// @ts-ignore
const source = decodeURIComponent(globalThis.src);
const transferProps = JSON.parse(
  // @ts-ignore
  decodeURIComponent(globalThis.transferProps),
);
const comm_id = decodeURIComponent(globalThis.comm_id);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={fallbackRender}>
      <App source={source} transferProps={transferProps} comm_id={comm_id} />
    </ErrorBoundary>
  </React.StrictMode>
)
