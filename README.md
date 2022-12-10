# NBT.js

The Named Binary Tag format in JavaScript

## Usage

```JavaScript
import { NBT } from "https://code4fukui.github.io/NBT/NBT.js";

const bin = await Deno.readFile("level.dat");
const data = NBT.parse(bin);
console.log(data);
```
