export function convertHexStringToBase64(hex: string): string {
  let rawString = "";
  for (let i = 0; i < hex.length; i += 2) {
    const integer = parseInt(hex.substr(i, 2), 16);
    if (isNaN(integer)) throw new Error();
    rawString += String.fromCharCode(integer);
  }
  return btoa(rawString);
}
