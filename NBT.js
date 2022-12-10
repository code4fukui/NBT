import { BinaryReaderLE } from "./BinaryReaderLE.js";

const TAG_End = 0;
const TAG_Byte = 1;
const TAG_Short = 2;
const TAG_Int = 3;
const TAG_Long = 4;
const TAG_Float = 5;
const TAG_Double = 6;
const TAG_Byte_Array = 7;
const TAG_String = 8;
const TAG_List = 9;
const TAG_Compound = 10;
const TAG_Int_Array = 11;

const parse = (bin, skip = 8) => {
  const r = new BinaryReaderLE(bin);
  r.skip(skip);

  const readString = () => {
    const len = r.readUint16();
    if (!len) {
      return null;
    }
    const name = r.readString(len);
    return name;
  };
  const readTag = (type) => {
    switch (type) {
      case TAG_End: {
        return { type };
      }
      case TAG_Compound: {
        const name = readString();
        const data = [];
        for (;;) {
          const type = r.readUint8();
          if (type == TAG_End) {
            break;
          }
          const d = readTag(type);
          data.push(d);
        }
        return { type, name, data };
      }
      case TAG_String: {
        const name = readString();
        const s = readString();
        return { type, name, s };
      }
      case TAG_Byte: {
        const name = readString();
        const n = r.readUint8();
        return { type, name, n };
      }
      case TAG_Int: {
        const name = readString();
        const n = r.readUint32();
        return { type, name, n };
      }
      case TAG_Float: {
        const name = readString();
        const n = r.readFloat32();
        return { type, name, n };
      }
      case TAG_Long: {
        const name = readString();
        const n1 = r.readUint32();
        const n2 = r.readUint32();
        const n = BigInt(n1) + BigInt(n2) * (2n ** 32n);
        return { type, name, n };
      }
      case TAG_List: {
        const name = readString();
        const dtype = r.readUint8();
        const len = r.readUint32();
        switch (dtype) {
          case TAG_Byte: {
            const data = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              const n = r.readUint8();
              data[i] = n;
            }
            return { type, name, data };
          }
          case TAG_Int: {
            const data = new Uint32Array(len);
            for (let i = 0; i < len; i++) {
              const n = r.readUint32();
              data[i] = n;
            }
            return { type, name, data };
          }
          case TAG_Long: {
            const data = [];
            for (let i = 0; i < len; i++) {
              const n1 = r.readUint32();
              const n2 = r.readUint32();
              const n = BigInt(n1) + BigInt(n2) * (2n ** 32n);
              data.push(n1);
            }
            return { type, name, data };
          }
          case TAG_String: {
            const data = [];
            for (let i = 0; i < len; i++) {
              const s = readString();
              data.push(s);
            }
            return { type, name, data };
          }
          default:
            throw new Error("unsupported list type " + type);
        }
      }
      default: {
        throw new Error("unsupported " + type);
      }
    }
  };

  const type = r.readUint8();
  const data = readTag(type);
  const json = NBTtoJSON(data);
  return json;
};

const NBTtoJSON = (tag) => {
  const type = tag.type;
  switch (type) {
    case TAG_Compound: {
      const res = {};
      for (const t of tag.data) {
        res[t.name] = NBTtoJSON(t);
      }
      const name = type.name;
      if (name) {
        const res2 = {};
        res2[name] = res;
        return res2;
      }
      return res;
    }
    case TAG_List: {
      const name = type.name;
      if (name) {
        const res2 = {};
        res2[name] = tag.data;
        return res2;
      }
      return tag.data;
    }
    case TAG_String: {
      return tag.s;
    }
    case TAG_Byte:
    case TAG_Short:
    case TAG_Int:
    case TAG_Long:
    case TAG_Float: {
      return tag.n;
    }
    default:
      throw new Error("unsupported type " + type);
  }
};

export const NBT = {
  parse,
};
