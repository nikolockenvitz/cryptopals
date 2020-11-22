export function hexToBuffer(hex: string): ArrayBuffer {
  let array = [];
  for (let i = 0; i < hex.length; i += 2) {
    array.push(parseInt(hex.substr(i, 2), 16));
  }
  return new Uint8Array(array).buffer;
}

export function bufferToHex(buffer: ArrayBuffer): string {
  let hexStr = "";
  for (let i = 0; i < buffer.byteLength; i++) {
    const hex = (new Uint8Array(buffer.slice(i, i + 1))[0] & 0xff).toString(16);
    hexStr += (hex.length === 1 ? "0" : "") + hex;
  }
  return hexStr;
}

export function hexToString(hex: string): string {
  let s = "";
  for (let i = 0; i < hex.length; i += 2) {
    const integer = parseInt(hex.substr(i, 2), 16);
    if (isNaN(integer)) throw new Error();
    s += String.fromCharCode(integer);
  }
  return s;
}

export function stringToHex(string: string): string {
  return string
    .split("")
    .map((s) => s.charCodeAt(0).toString(16))
    .join("");
}
