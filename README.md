# NBT.js

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

The Named Binary Tag format in JavaScript.

## Usage

```JavaScript
import { NBT } from "https://code4fukui.github.io/NBT/NBT.js";

const bin = await Deno.readFile("level.dat");
const data = NBT.parse(bin);
console.log(data);
```

## Reference

- [NBT Format - Minecraft Wiki](https://minecraft.fandom.com/wiki/NBT_format)

## License

MIT License — see [LICENSE](LICENSE).