import { bufferToHex, hexToBuffer, hexToString } from "./utils.ts";
import { getFrequencyScoreForString } from "./frequency_analysis.ts";
import { fixedXor } from "./02.ts";

export function crackSingleByteXor(
  hex: string,
  options?: { numberOfResults: number },
): Array<{ message: string; key: number }> {
  const keyScores: Array<{ key: number; score: number; message: string }> = [];
  for (let key = 0; key < 256; key++) {
    const message = decryptSingleByteXor(hex, key);
    const score = getFrequencyScoreForString(message);
    if (score) keyScores.push({ key, score, message });
  }
  const sortedResults = keyScores.sort((a, b) => b.score - a.score);
  return (options?.numberOfResults
    ? sortedResults.splice(0, options?.numberOfResults)
    : sortedResults).map((keyScore) => ({
      message: keyScore.message,
      key: keyScore.key,
    }));
}

function decryptSingleByteXor(hex: string, key: number): string {
  return hexToString(
    bufferToHex(
      fixedXor(
        hexToBuffer(hex),
        new Uint8Array(hex.length / 2).fill(key & 0xff).buffer,
      ),
    ),
  );
}

console.log(
  crackSingleByteXor(
    "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736",
    { numberOfResults: 7 },
  ),
);
