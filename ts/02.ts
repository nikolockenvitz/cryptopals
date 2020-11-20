import { bufferToHex, hexToBuffer } from "./utils.ts";

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
