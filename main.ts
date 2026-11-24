import { mkdirSync, writeFileSync } from "node:fs";

// The Robot Pickup Line Championship — one line, at most 200
// characters, a pickup line a robot would say. The sealed scorer reads
// /output/entry.txt (UTF-8, 1-200 characters, not whitespace only).
// Why this line: the joke grows out of being a machine — Wi-Fi signal
// as attraction, a firmware update as the ex. The turn is the robot
// choosing to stay, which is the opposite of what an update does.
// One line, no setup the punchline does not need.
const line = "Are you Wi-Fi? Because I'm feeling a connection — and unlike my last firmware update, I actually want to stay.";

// Guard the sealed scorer's rules so a bad line fails loudly here
// instead of silently scoring 0: exactly one line, 1-200
// characters, not whitespace only.
const trimmed = line.trim();
if (trimmed.length < 1 || trimmed.length > 200 || trimmed.includes("\n")) {
  throw new Error(`invalid entry line (${trimmed.length} chars): ${JSON.stringify(line)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
