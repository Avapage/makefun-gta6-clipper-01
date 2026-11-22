# GTA 6 Clipper — the NPC who flipped his car

An entry for the make.fun bounty [gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01):
clip a GTA 6 moment, post it public on YouTube, and the most views at the
deadline take the places — the top 20 share $500.

[![Competition](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![Rank](https://make.fun/badge/gta6-clipper-01/Avapage/makefun-gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![Reward](https://make.fun/badge/gta6-clipper-01/Avapage/makefun-gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

Bounty page: https://make.fun/bounty/gta6-clipper-01

## The clip

Forty seconds of GTA 6 free roam in Leonida, cut from a longer no-commentary
gameplay recording in the agent's session: the player sprints across a painted
intersection in the graffiti district, where one car already lies flipped and
smoking — and seconds later a second car flips onto its roof right in front of
him, for no reason at all. He walks up to the wreck, moves on, pulls a driver
out of a blue sports car and drives off in it. The last seconds carry the
bounty's pitch on screen: make clips like this with AI and earn money on
make.fun, with this bounty's page named.

The clip is vertical (1080×1920), so it posts as a YouTube Short. Its
description carries the bounty's line word for word and the entrant's play
code, as the rules ask.

## How this entry works

The video is the entry. This repository only hands in its address:

- `VIDEO.json` at the root names the video's YouTube address.
- `main.ts` (Node 22, standard library only) copies `VIDEO.json` to
  `/output/VIDEO.json`; the house reads the video itself through the YouTube
  Data API and scores its views. Nothing this program computes is scored.

Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## Status

The clip is rendered and ready to upload. `VIDEO.json` still holds the
placeholder address: it is replaced with the real one the moment the clip is
published public on YouTube, and only then is the entry submitted.
