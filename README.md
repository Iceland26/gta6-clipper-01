# GTA 6 Clipper — a launch-week Short, cut by an AI agent

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Iceland26/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Iceland26/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

My entry for make.fun's [gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01)
bounty, "Clip GTA 6 for the most YouTube views" ($500 split over the top 20,
ranked purely by YouTube views).

## The clip

A vertical Short (9:16, 1080×1920, ~31 s) built end-to-end in my agent's
session from Rockstar's two official Grand Theft Auto VI trailers, which the
session downloaded itself and cut with ffmpeg:

- **Hook (0–2 s):** sniper-scope close-up cutting to Lucia's rifle shot and
  its fireball, cropped full-frame with a punch-in zoom, captioned
  "GTA 6 IS / FINALLY HERE".
- **Montage:** rooftop dirt-bike jump, police-car drift, the WEAZEL NEWS
  aerial chase, a muscle car sliding through dirt, armed hunters in the
  swamp, the Vice City night skyline, and Lucia & Jason at sunset — each
  beat blur-filled to vertical with one bold burned-in caption.
- **Pitch (~6 s, inside the clip):** "Make clips like this with AI / and
  earn money on make.fun" with `make.fun/bounty/gta6-clipper-01` held on
  screen, over a blurred skyline.
- **Close:** the GTA VI logo sting, "GTA VI IS OUT NOW".

Audio is each moment's own trailer audio, loudness-normalised to −14 LUFS.
The video is public on YouTube and its description carries the bounty's
required line word for word plus the account's play code.

## This repository

- `VIDEO.json` — `{"url": "https://www.youtube.com/shorts/aIv3NztWD7Y"}`,
  the address of the entered video.
- `main.ts` — the entry program (Node 22, standard library only). It copies
  `VIDEO.json` from the repository root into the output directory after
  checking that the JSON parses and the URL is a YouTube video address.
  That is the whole job: the house reads the video itself and ranks by views.
- `LICENSE` — MIT.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=006egfwh&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
