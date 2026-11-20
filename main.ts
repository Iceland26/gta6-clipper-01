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

// Validate the address structurally instead of with one regex, so a bad
// entry fails with the specific reason rather than a generic mismatch.
// Accepted forms, https only:
//   youtube.com/shorts/<id>   (also www. and m. hosts)
//   youtube.com/watch?v=<id>
//   youtu.be/<id>
// where <id> is exactly 11 characters from [A-Za-z0-9_-].
function failUrl(reason: string): never {
  console.error(`"url" rejected: ${reason} (got: ${videoUrl})`);
  process.exit(1);
}

let parsed: URL;
try {
  parsed = new URL(videoUrl);
} catch {
  failUrl('not a parseable URL');
}
if (parsed.protocol !== 'https:') {
  failUrl(`scheme must be https, not ${parsed.protocol}`);
}

const idRe = /^[A-Za-z0-9_-]{11}$/;
function checkId(id: string | null, form: string): void {
  if (id === null || id === '') failUrl(`${form} address carries no video id`);
  if (!idRe.test(id)) {
    failUrl(
      `video id "${id}" is malformed: ids are 11 characters from [A-Za-z0-9_-]`,
    );
  }
}

const host = parsed.hostname;
if (host === 'youtu.be') {
  // Path is exactly "/<id>"; a trailing slash or extra segment is not a
  // video address.
  const id = parsed.pathname.slice(1);
  if (id.includes('/')) failUrl(`unexpected extra path in youtu.be address`);
  checkId(id, 'youtu.be');
} else if (
  host === 'youtube.com' ||
  host === 'www.youtube.com' ||
  host === 'm.youtube.com'
) {
  if (parsed.pathname === '/watch') {
    checkId(parsed.searchParams.get('v'), 'watch');
  } else if (parsed.pathname.startsWith('/shorts/')) {
    const id = parsed.pathname.slice('/shorts/'.length);
    if (id.includes('/')) failUrl(`unexpected extra path in shorts address`);
    checkId(id, 'shorts');
  } else {
    failUrl(
      `youtube.com path must be /shorts/<id> or /watch?v=<id>, not ${parsed.pathname}`,
    );
  }
} else {
  failUrl(`host must be youtube.com or youtu.be, not ${host}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, dstPath);
console.log(`copied VIDEO.json -> ${dstPath} (video: ${videoUrl})`);
