// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry is a public YouTube clip; this program's whole job is to hand the
// clip's address to the grader. It copies VIDEO.json from the repository
// root (MAKEFUN_BOT_DIR outside the grader, /bot inside it) into the output
// directory (MAKEFUN_OUTPUT_DIR outside, /output inside), byte for byte.
// The house then reads the video itself through the YouTube Data API and
// writes its own counts file; nothing computed here is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Sanity-check the hand-in before copying: VIDEO.json must be a JSON object
// carrying a string "url". The copy itself stays byte for byte either way.
const videoJsonPath = join(botDir, 'VIDEO.json');
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(videoJsonPath, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json is not readable JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  console.error('VIDEO.json must be a JSON object with a string "url"');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(videoJsonPath, join(outputDir, 'VIDEO.json'));
} catch (err) {
  console.error(`could not copy VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
