import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { repeatingKeyXorHex } from "./05.ts";
import { stringToHex } from "./utils.ts";

Deno.test("repeating key xor #1", () => {
  const input = `Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal`;

  const x = repeatingKeyXorHex(stringToHex(input), stringToHex("ICE"));
  assertEquals(
    x,
    "0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f",
  );
});
