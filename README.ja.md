# NBT.js

JavaScript用のNamed Binary Tagフォーマット。

## 使い方

```JavaScript
import { NBT } from "https://code4fukui.github.io/NBT/NBT.js";

const bin = await Deno.readFile("level.dat");
const data = NBT.parse(bin);
console.log(data);
```

## 参考

- [NBT Format - Minecraft Wiki](https://minecraft.fandom.com/wiki/NBT_format)

## ライセンス

MIT License — 詳細は[LICENSE](LICENSE)を参照してください。
