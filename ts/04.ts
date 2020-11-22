import { crackSingleByteXor } from "./03.ts";
import { getFrequencyScoreForString } from "./frequency_analysis.ts";

import { input } from "./04_input.ts";

const possiblePlaintexts = [];
for (const string of input.split("\n")) {
  if (string.length !== 60) continue;
  const message = crackSingleByteXor(string, { numberOfResults: 1 })[0].message;
  const score = getFrequencyScoreForString(message, { penalty: -0.05 });
  possiblePlaintexts.push({ message, score, c: string });
}

const sorted = possiblePlaintexts.sort((a, b) => b.score - a.score);
console.log(sorted.slice(0, 5));
