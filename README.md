> [!NOTE] This is provided as an example

# Demo Jupyter JSX

![Gif showing jupyter with jsx being rendered and interacted with](<Screen Recording 2023-09-27 at 5.30.36 pm.gif>)

## Basic usage

```ts
import React from "npm:react";
import { djSSR } from "https://raw.githubusercontent.com/luke-john/ljdj/master/main.ts";
const fruits = ["apple", "banana", "carrot"];

djSSR(
  <ul>
    {fruits.map((fruit, i) => (
      <li key={i} style={fruit === "apple" ? { color: "red" } : {}}>{fruit}</li>
    ))}
  </ul>,
);
```

## SPA mode

SPA mode allows slightly richer experiences, where it transfers the source and
some data into the html.

### Basic usage

```ts
import React from "npm:react";
import { djSPA } from "https://raw.githubusercontent.com/luke-john/ljdj/master/main.tsx";
const fruits = ["apple", "banana", "carrot"];

djSPA(
  // These are serialized and deserialized using JSON.stringify
  { fruits },
  // This function is transferred via calling .toString on it.
  (transferProps) => (
    <ul>
      {fruits.map((fruit, i) => (
        <li key={i} style={fruit === "apple" ? { color: "red" } : {}}>
          {fruit}
        </li>
      ))}
    </ul>
  ),
);
```

### Using react hooks

The SPA which receives the transferred source and props, puts React in scope
when calling the transferred source. This means you can use useState and other
hooks.

```ts
import React from "npm:react";
import { djSPA } from "https://raw.githubusercontent.com/luke-john/ljdj/master/main.tsx";
const fruits = ["apple", "banana", "carrot"];

djSPA(
  { fruits },
  (transferProps) => {
    // React is available inside the transferred source allowing use of react hooks.
    const [counter, setCounter] = React.useState(1);

    return (
      <div>
        <p>counters: {counter}</p>
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          increase fruits to show
        </button>

        <ul>
          {transferProps.fruits.slice(0, counter).map((fruit, i) => (
            <li key={i} style={fruit === "apple" ? { color: "red" } : {}}>
              {fruit}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
```
