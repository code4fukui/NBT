# NBT.js

The Named Binary Tag format in JavaScript

## Usage

```JavaScript
import { NBT } from "https://code4fukui.github.io/NBT/NBT.js";

const bin = await Deno.readFile("level.dat");
const data = NBT.parse(bin);
console.log(data);
```

## Reference

- [https://minecraft.fandom.com/ja/wiki/NBT%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%83%E3%83%88](NBTフォーマット - Minecraft Wiki)
