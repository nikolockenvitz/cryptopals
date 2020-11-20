export function fixedXor(a: ArrayBuffer, b: ArrayBuffer): ArrayBuffer {
  if (a.byteLength !== b.byteLength) {
    throw new Error("Buffers need to be of same length");
  }
  const aUint8Array = new Uint8Array(a);
  const bUint8Array = new Uint8Array(b);
  const c = new Uint8Array(a.byteLength).map((_, i) =>
    aUint8Array[i] ^ bUint8Array[i]
  );
  return c.buffer;
}

export function fixedXorHex(a: string, b: string): string {
  return bufferToHex(fixedXor(hexToBuffer(a), hexToBuffer(b)));
}

function hexToBuffer(hex: string): ArrayBuffer {
  let array = [];
  for (let i = 0; i < hex.length; i += 2) {
    array.push(parseInt(hex.substr(i, 2), 16));
  }
  return new Uint8Array(array).buffer;
}

function bufferToHex(buffer: ArrayBuffer): string {
  let hexStr = "";
  for (let i = 0; i < buffer.byteLength; i++) {
    const hex = (new Uint8Array(buffer.slice(i, i + 1))[0] & 0xff).toString(16);
    hexStr += (hex.length === 1 ? "0" : "") + hex;
  }
  return hexStr;
}
