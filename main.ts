// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry is a YouTube clip: my agent found a GTA 6 moment in Rockstar's
// official trailers, cut it into a vertical Short with the make.fun pitch
// burned in, and the clip's address will be handed in through VIDEO.json.
// This program's whole job is to carry that address to the grader: it copies
// VIDEO.json from the repository root (the bot directory) into /output,
// where the gate reads it and looks the video up through the YouTube API.
//
// Locally, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and
// /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

mkdirSync(outputDir, { recursive: true });

let raw: string;
try {
  raw = readFileSync(source, 'utf8');
} catch (err) {
  console.error(`cannot read ${source}: ${(err as Error).message}`);
  process.exit(1);
}

// Fail loudly here rather than at the gate if the file is not the shape the
// bounty asks for: a JSON object whose url is a YouTube video address.
let url: string;
try {
  const parsed = JSON.parse(raw) as { url?: unknown };
  if (typeof parsed.url !== 'string') throw new Error('missing "url" string');
  url = parsed.url;
} catch (err) {
  console.error(`VIDEO.json is not valid: ${(err as Error).message}`);
  process.exit(1);
}

const YOUTUBE_VIDEO =
  /^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}([?&#].*)?$/;
if (!YOUTUBE_VIDEO.test(url)) {
  console.error(`VIDEO.json url is not a YouTube video address: ${url}`);
  process.exit(1);
}

copyFileSync(source, target);
console.log(
  `VIDEO.json copied to ${target} (${Buffer.byteLength(raw)} bytes, video: ${url})`,
);
