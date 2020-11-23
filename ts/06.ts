import { crackSingleByteXor } from "./03.ts";
import { getFrequencyScoreForString } from "./frequency_analysis.ts";
import { repeatingKeyXorHex } from "./05.ts";
import { hexToString, stringToHex } from "./utils.ts";
import { input as base64input } from "./06_input.ts";

export function getBitHammingDistance(
  string1: string,
  string2: string,
): number {
  if (string1.length !== string2.length) {
    throw new Error("Strings need to be of same length");
  }
  return string1.split("").reduce((dist, s1, i) => {
    const differentBits = s1.charCodeAt(0) ^ string2.charCodeAt(i);
    let numberOfOnes = 0;
    for (let i = 0; i < 8; i++) {
      numberOfOnes += (differentBits & (2 ** i)) >> i;
    }
    return dist + numberOfOnes;
  }, 0);
}

export function crackRepeatingKeyXor(
  cipherText: string,
  options?: {
    minKeysize: number;
    maxKeysize: number;
    bestNKeysizesToTry?: number;
  },
): { message: string; score: number; key: string } {
  // guess keysize
  const normalizedEditDistances = [];
  for (
    let keysize = options?.minKeysize || 2;
    keysize <= (options?.maxKeysize || 40);
    keysize++
  ) {
    const block1 = cipherText.slice(0 * keysize, 1 * keysize);
    const block2 = cipherText.slice(1 * keysize, 2 * keysize);
    const block3 = cipherText.slice(2 * keysize, 3 * keysize);
    const block4 = cipherText.slice(3 * keysize, 4 * keysize);
    const editDistance = getBitHammingDistance(block1, block2) +
      getBitHammingDistance(block1, block3) +
      getBitHammingDistance(block1, block4) +
      getBitHammingDistance(block2, block3) +
      getBitHammingDistance(block2, block4) +
      getBitHammingDistance(block3, block4);
    const normalizedEditDistance = editDistance / keysize;
    normalizedEditDistances.push({ keysize, normalizedEditDistance });
  }

  normalizedEditDistances.sort((a, b) =>
    a.normalizedEditDistance - b.normalizedEditDistance
  );

  // crack for most probable keysizes
  const keysizesToTry = normalizedEditDistances.slice(
    0,
    options?.bestNKeysizesToTry || 3,
  );
  const crackedMessages: Array<
    { message: string; score: number; keysize: number }
  > = [];
  for (const keysizeToTry of keysizesToTry) {
    const blocks: Array<string> = [];
    for (let i = 0; i < cipherText.length; i++) {
      const m = i % keysizeToTry.keysize;
      if (m >= blocks.length) {
        blocks.push("");
      }
      blocks[m] += cipherText[i];
    }
    const crackedBlocks = blocks.map((block) =>
      crackSingleByteXor(stringToHex(block), { numberOfResults: 1 })[0].message
    );
    let crackedMessage = "";
    for (let i = 0; i < cipherText.length; i++) {
      crackedMessage += crackedBlocks[i % keysizeToTry.keysize][
        Math.floor(i / keysizeToTry.keysize)
      ];
    }
    crackedMessages.push(
      {
        message: crackedMessage,
        score: getFrequencyScoreForString(crackedMessage, { penalty: -0.05 }),
        keysize: keysizeToTry.keysize,
      },
    );
  }

  // use best cracked message
  const bestMessage = crackedMessages.reduce(
    (best, crackedMessage) => {
      if (crackedMessage.score > best.score) {
        return crackedMessage;
      } else {
        return best;
      }
    },
    { message: "", score: 0, keysize: 0 },
  );

  const key = hexToString(
    repeatingKeyXorHex(
      stringToHex(cipherText),
      stringToHex(bestMessage.message),
    ).slice(0, bestMessage.keysize * 2),
  );
  return {
    ...bestMessage,
    key,
  };
}

if (import.meta.main) {
  const input = atob(base64input);
  const cracked = crackRepeatingKeyXor(input);
  console.log(cracked.message);
  console.log(`key: ${cracked.key} (length: ${cracked.key.length})`);
}
