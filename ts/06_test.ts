import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { getBitHammingDistance } from "./06.ts";

Deno.test("hamming distance #1", () => {
  const x = getBitHammingDistance(
    "",
    "",
  );
  assertEquals(x, 0);
});

Deno.test("hamming distance #2", () => {
  const x = getBitHammingDistance(
    "abcdef",
    "abcdef",
  );
  assertEquals(x, 0);
});

Deno.test("hamming distance #3", () => {
  const x = getBitHammingDistance(
    "abcdef",
    "uvwxyz",
  );
  assertEquals(x, 15);
});

Deno.test("hamming distance #4", () => {
  const x = getBitHammingDistance(
    "x1x2x3x",
    "x0x0x0x",
  );
  assertEquals(x, 4);
});

Deno.test("hamming distance #5", () => {
  const x = getBitHammingDistance(
    "Hello, World!",
    "hello, world!",
  );
  assertEquals(x, 2);
});

Deno.test("hamming distance #6", () => {
  const x = getBitHammingDistance(
    "this is a test",
    "wokka wokka!!!",
  );
  assertEquals(x, 37);
});
