import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { bufferToHex, hexToBuffer, hexToString, stringToHex } from "./utils.ts";

Deno.test("buffer to hex #1", () => {
  const x = bufferToHex(new ArrayBuffer(0));
  assertEquals(x, "");
});

Deno.test("buffer to hex #2", () => {
  const x = bufferToHex(new Uint8Array([4, 32, 105, 19, 55]).buffer);
  assertEquals(x, "0420691337");
});

Deno.test("hex to buffer #1", () => {
  const x = hexToBuffer("");
  assertEquals(x, new ArrayBuffer(0));
});

Deno.test("hex to buffer #2", () => {
  const x = hexToBuffer("00ff42");
  assertEquals(x, new Uint8Array([0, 0, 255, 50]).buffer);
});

Deno.test("hex to buffer #3", () => {
  const x = hexToBuffer("affe");
  assertEquals(x, new Uint8Array([175, 254]).buffer);
});

Deno.test("hex to string #1", () => {
  const x = hexToString("");
  assertEquals(x, "");
});

Deno.test("hex to string #2", () => {
  const x = hexToString("48656c6c6f2c20576f726c6421");
  assertEquals(x, "Hello, World!");
});

Deno.test("string to hex #1", () => {
  const x = stringToHex("");
  assertEquals(x, "");
});

Deno.test("string to hex #2", () => {
  const x = stringToHex("Hello, World!");
  assertEquals(x, "48656c6c6f2c20576f726c6421");
});
