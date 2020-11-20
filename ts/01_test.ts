import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { convertHexStringToBase64 } from "./01.ts";

Deno.test("hex to base64 #1", () => {
  const x = convertHexStringToBase64(
    "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d",
  );
  assertEquals(
    x,
    "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t",
  );
});
