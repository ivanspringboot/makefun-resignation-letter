// main.ts - writes the one-line resignation letter to /output/entry.txt
//
// Gate (program/v1): UTF-8 text, 1 to 140 characters, not only white space.
// The line is a constant, so two runs produce byte-identical output.
// The letter is written in the voice of the retry loop itself; the line is
// the owner's pick, reproduced verbatim, with no second sentence.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT = "Attempt 4,096 returned the same error as attempt 1, so I have concluded the problem was never my persistence; I resign.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function countChars(value: string): number {
  return [...value].length;
}

if (ENTRY_TEXT.includes("\n") || ENTRY_TEXT.includes("\r")) {
  throw new Error("entry text must be a single line");
}

const chars = countChars(ENTRY_TEXT);

if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(`entry text must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`);
}

if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("entry text must not be only white space");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT);
console.log(`wrote ${chars} of at most ${MAX_CHARS} characters to ${join(outDir, "entry.txt")}`);
