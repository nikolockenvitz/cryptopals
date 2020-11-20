import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { fixedXor, fixedXorHex } from "./02.ts";

Deno.test("xor hex #1", () => {
  const x = fixedXorHex(
    "1c0111001f010100061a024b53535009181c",
    "686974207468652062756c6c277320657965",
  );
  assertEquals(x, "746865206b696420646f6e277420706c6179");
});

Deno.test("xor #1", () => {
  const x = fixedXor(
    new Uint8Array([0, 255, 0, 255]).buffer,
    new Uint8Array([255, 0, 0, 255]).buffer,
  );
  assertEquals(x, new Uint8Array([255, 255, 0, 0]).buffer);
});
