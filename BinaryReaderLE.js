export class BinaryReaderLE {
  constructor(bin) {
    this.dataView = new DataView(bin.buffer);
    this.byteOffset = 0;
  }
  readUint8() {
    const intValue = this.dataView.getUint8(this.byteOffset);
    this.byteOffset += 1;
    return intValue;
  }
  readUint16() {
    const intValue = this.dataView.getUint16(this.byteOffset, true);
    this.byteOffset += 2;
    return intValue;
  }
  readUint32() {
    const intValue = this.dataView.getUint32(this.byteOffset, true);
    this.byteOffset += 4;
    return intValue;
  }
  readFloat32() {
    const floatValue = this.dataView.getFloat32(this.byteOffset, true);
    this.byteOffset += 4;
    return floatValue;
  }
  skip(n) {
    this.byteOffset += n;
  }
  readString(len) {
    const b = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      b[i] = this.dataView.getUint8(this.byteOffset);
      this.byteOffset++;
    }
    return new TextDecoder().decode(b);
  }
}
