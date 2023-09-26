> [!NOTE]
> This is provided as an example

# Demo Jupyter JSX

![Image showing jupyter with jsx being rendered](image.png)

> [!WARNING]
> This requires a server to be running.

The server can be run via
`deno run -A https://raw.githubusercontent.com/luke-john/ljdj/master/server.ts`

> [!WARNING]
> This renders the JSX in an iframe. Copy/Paste does not appear to
> work with the iframe contents.

## Basic usage

```ts
import { djJSX } from "https://raw.githubusercontent.com/luke-john/ljdj/master/main.ts";

djJSX()`
<p>
    This is some demo jsx
</p>
`;
```

## Passing data into the jsx

```ts
import { djJSX } from "https://raw.githubusercontent.com/luke-john/ljdj/master/main.ts";
const fruits = ["apple", "banana", "carrot"];

djJSX({ fruits })`
<ul>
    {fruits.map(fruit => <li>{fruit}</li>)}
</ul>
`;
```
