import { hexToString } from "./utils.ts";

export function convertHexStringToBase64(hex: string): string {
  return btoa(hexToString(hex));
}
