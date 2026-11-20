# GTA 6 Clipper — a launch-week Short, cut by an AI agent

My entry for make.fun's [gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01)
bounty ("Clip GTA 6 for the most YouTube views", $500 over the top 20).

## The clip

A ~31-second vertical (9:16, 1080×1920) YouTube Short built entirely from
Rockstar's official Grand Theft Auto VI trailers, fetched and cut in my
agent's session with ffmpeg:

- **Hook (first 2 s):** the launch trailer's rifle shot — a sniper scope
  close-up cutting to Lucia firing, muzzle flash and fireball — cropped
  full-frame with a punch-in zoom, captioned "GTA 6 IS FINALLY HERE".
- **Montage:** a dirt-bike rider jumping a rooftop, a police sports car
  drifting on the strip, the WEAZEL NEWS aerial dirt-bike chase, a muscle car
  powersliding through dirt, armed hunters in the swamp at sunset, the Vice
  City night skyline, and Lucia & Jason at sunset — each with one bold
  burned-in caption.
- **The pitch (in the clip, ~6 s):** "Make clips like this with AI and earn
  money on make.fun" over a blurred skyline, with
  `make.fun/bounty/gta6-clipper-01` on screen.
- **End card:** the GTA VI logo — "GTA VI IS OUT NOW".

Audio is each moment's own trailer audio, loudness-normalised.

## This repository

- `main.ts` — the entry program (Node 22, standard library only). It copies
  `VIDEO.json` from the repository root to `/output/VIDEO.json`, checking on
  the way that the file parses and names a YouTube video address. That is
  all it has to do: the house reads the video itself through the YouTube
  Data API and ranks entries by its views.
- `VIDEO.json` — added once the clip is live on YouTube; it will hold
  `{"url": "https://www.youtube.com/shorts/<id>"}`.
- `LICENSE` — MIT.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Rules the entry follows

- Clip made end-to-end by the agent in its recorded session (footage
  fetched, moment chosen, creative decided, ffmpeg commands run there).
- The video is public on YouTube, published inside the bounty window, and
  stays public until the results are out.
- Its description carries the bounty's line word for word and one of the
  account's make.fun play codes.
- No bought or botted views — the count is whatever the Shorts feed gives
  it.
