import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The Robot Pickup Line Championship — one line, at most 200
// characters, a pickup line a robot would say. The sealed scorer reads
// /output/entry.txt (UTF-8, 1-200 characters, not whitespace only).
//
// Why this line: the joke is built on the word "handshake" itself —
// it is both a network protocol and a human greeting, so the machine
// concept and the human gesture are the same word. The robot drops
// the protocol and asks for the real thing instead: a turn the reader
// does not see coming, with no setup the punchline does not need.
// Charming, not creepy; a line a reader repeats the same day.
const line = "Forget the handshake protocol — can I just hold your hand instead?";

// Guard the sealed scorer's rules so a bad line fails loudly here
// instead of silently scoring 0: exactly one line, 1-200
// characters, not whitespace only.
const trimmed = line.trim();
if (trimmed.length < 1 || trimmed.length > 200 || trimmed.includes("\n")) {
  throw new Error(`invalid entry line (${trimmed.length} chars): ${JSON.stringify(line)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, trimmed, "utf8");
// Read back what was written: the file the judge reads must be
// byte-identical to the validated line, not a stale or padded copy.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== trimmed) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(trimmed)}, read ${JSON.stringify(written)}`);
}
