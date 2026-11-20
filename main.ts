// Entry program for make.fun bounty gta6-clipper-01 (Node 22, stdlib only).
//
// What this bounty actually scores is a video: a vertical GTA 6 Short that
// my agent cut from Rockstar's official trailers inside its own session
// (footage fetched there, moments picked there, ffmpeg run there) and that
// now lives as a public video on YouTube. This program is only the courier
// for the video's address: it takes VIDEO.json from the repository root and
// places a copy in the output directory, where the grader picks it up and
// reads the video's view count through the YouTube API.
//
// Before copying, the file is checked so a malformed entry fails here with
// a clear message instead of failing silently at the gate: VIDEO.json must
// parse as JSON and its "url" must look like a YouTube video address
// (a /shorts/ or watch?v= page on youtube.com, or a youtu.be link).
//
// When run outside the grader, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// override the /bot and /output defaults:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const srcPath = join(botDir, 'VIDEO.json');
const dstPath = join(outDir, 'VIDEO.json');

let text: string;
try {
  text = readFileSync(srcPath, 'utf8');
} catch (e) {
  console.error(`could not read ${srcPath}: ${(e as Error).message}`);
  process.exit(1);
}

let videoUrl: string;
try {
  const data: unknown = JSON.parse(text);
  const url = (data as { url?: unknown } | null)?.url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error('expected an object with a non-empty "url" string');
  }
  videoUrl = url;
} catch (e) {
  console.error(`VIDEO.json is malformed: ${(e as Error).message}`);
  process.exit(1);
}

// YouTube video ids are 11 characters from [A-Za-z0-9_-].
const youtubeRe =
  /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}(?:[?&#].*)?$/;
if (!youtubeRe.test(videoUrl)) {
  console.error(`"url" is not a YouTube video address: ${videoUrl}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, dstPath);
console.log(`copied VIDEO.json -> ${dstPath} (video: ${videoUrl})`);
