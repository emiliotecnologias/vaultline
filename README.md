# VAULTLINE — Night at the Meridian

An original top-down bank-heist game that runs in a desktop browser from static files.
Built for make.fun's **"Make the best heist game"** bounty
(`best-heist-game-20261122-0559`, $50 USDC, 10 places, 22 Nov 2026 05:59–17:59 UTC).

One screen, one bank, one night. You are a lone thief casing the Meridian Bank at
2:47 AM: three guards on patrol, four sweeping cameras, a laser corridor, and a
vault full of gold, cash, and gems. Plan the job, pick your way in, crack the
dial, fill the duffel, and vanish before the sirens.

## How to run

Open `game/index.html` in a desktop browser and press **Enter** — that's it.
The game is a single self-contained HTML file (vanilla JS + Canvas 2D, all art
drawn in code, all sound synthesized with WebAudio, zero network requests), so
it works straight from `file://`. If you prefer a server:

```sh
python3 -m http.server
# then open http://localhost:8000/game/
```

## The job, in five steps

1. **Plan** — study the blueprint: guard patrols, camera cones, lasers, the vault.
   Choose one of 3 entry points (front doors, back alley, roof vent) and 2 of 5
   tools (lockpick set, camera jammer, smoke bomb, stun baton, extra duffel).
2. **Infiltrate** — sneak the one-screen bank. Crouch behind tall furniture,
   throw coins to pull guards off their routes, take them down silently from
   behind (or from any side with the baton).
3. **Disable** — steal the keycard from the manager's office, loop the cameras
   at the security console, kill the alarm at its panel, cut the laser power
   in the janitor closet.
4. **Crack the vault** — stop the spinning needle in the green zone, three
   tumblers, each tighter than the last. Miss and the clang feeds the alarm.
   The door then swings open — loudly — for six long seconds.
5. **Grab & escape** — gold bars, cash bricks, gem cases, each with a weight.
   Your duffel holds 40 kg (60 with the extra duffel) and every kilo slows you
   down. Reach either getaway van to score: loot value + ghost bonus (never
   seen) + silent bonus (alarm never triggered) + speed bonus, ranked S/A/B/C.
   If the alarm meter fills, the police are 60 seconds out — be gone first.

## Controls

| Key | Action |
|---|---|
| WASD / arrows | Move |
| Shift | Sprint (fast, noisy — guards investigate) |
| C / Ctrl | Crouch (slow, harder to see, hidden behind tall furniture) |
| E (hold) | Interact: pick locks, steal keycard, loop cameras, disable alarm, cut laser power, grab loot, start the vault dial |
| Q | Throw a coin toward the mouse (distraction, 3 coins) |
| F | Silent takedown (from behind; anywhere with the stun baton) |
| X | Smoke bomb — break line of sight (1 use, if in loadout) |
| J | Camera jammer — blind all cameras 60 s (1 use, if in loadout) |
| Space / click | Stop the vault needle in the green zone |
| P / Esc | Pause |
| R | Restart (back to the plan) |
| M | Mute |

## Hand-in (make.fun)

`main.ts` is the entry runner (Node 22, standard library only). It copies
`game/` and `screenshots/` from beside the file into `$MAKEFUN_OUTPUT_DIR`
(default `/output`) and writes `dossier.json` there using the vendored
`buildDossier` from `vendor/makefun-game.ts`, so the dossier is byte-for-byte
what the bounty scorer computes from the same files:

```sh
node main.ts                      # writes to /output
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

## Tech notes

- Single file: `game/index.html` (~57 KB). No libraries, no images, no audio
  files, no network requests; runs offline from `file://`.
- Vision cones are raycast against wall/furniture AABBs every frame; guards run
  a patrol → investigate → search → chase state machine; cameras sweep and feed
  the same alarm meter.
- Best score persists in `localStorage` (`vaultline_best`).

## License

MIT — see `LICENSE`.
