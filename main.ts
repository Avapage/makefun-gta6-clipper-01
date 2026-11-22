// Entry program for the gta6-clipper-01 bounty (Node 22, standard library only).
//
// The clip is the entry: a public YouTube Short cut from GTA 6 free roam,
// ending with a pitch for make.fun. All this program does is pass the clip's
// address to the grader — it copies VIDEO.json from the repository root to
// the output directory, unchanged. The house then reads the video itself
// through the YouTube Data API and ranks it by views; nothing this program
// computes affects the score.
//
// Run it exactly as the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outRoot = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function die(reason: string): never {
  console.error(`gta6-clipper-01: ${reason}`);
  process.exit(1);
}

function readVideoAddress(): string {
  const path = join(repoRoot, "VIDEO.json");
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch (error) {
    die(`cannot read VIDEO.json: ${(error as Error).message}`);
  }
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    die(`VIDEO.json is not valid JSON: ${(error as Error).message}`);
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    die("VIDEO.json must be a JSON object holding a string url");
  }
  const url = (data as { url?: unknown }).url;
  if (typeof url !== "string" || url === "") {
    die("VIDEO.json must be a JSON object holding a string url");
  }
  if (
    !/^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)/.test(
      url,
    )
  ) {
    die("VIDEO.json url must be a YouTube video address (shorts, watch, or youtu.be)");
  }
  return url;
}

readVideoAddress();
mkdirSync(outRoot, { recursive: true });
try {
  copyFileSync(join(repoRoot, "VIDEO.json"), join(outRoot, "VIDEO.json"));
} catch (error) {
  die(`cannot copy VIDEO.json to ${outRoot}: ${(error as Error).message}`);
}
