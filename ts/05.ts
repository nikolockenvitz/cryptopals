import { bufferToHex, hexToBuffer, stringToHex } from "./utils.ts";

const input =
  `Burning 'em, if you ain't quick and nimble I go crazy when I hear a cymbal`;

export function repeatingKeyXor(
  message: ArrayBuffer,
  key: ArrayBuffer,
): ArrayBuffer {
  const messageUint8Array = new Uint8Array(message);
  const keyUint8Array = new Uint8Array(key);
  const c = new Uint8Array(message.byteLength).map((_, i) =>
    messageUint8Array[i] ^ keyUint8Array[i % key.byteLength]
  );
  return c.buffer;
}

export function repeatingKeyXorHex(message: string, key: string): string {
  return bufferToHex(repeatingKeyXor(hexToBuffer(message), hexToBuffer(key)));
}

console.log(repeatingKeyXorHex(stringToHex(input), stringToHex("ICE")));
