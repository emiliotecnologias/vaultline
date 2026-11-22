# VAULTLINE — Night at the Meridian

An original top-down bank-heist game that runs in a desktop browser from static files.
Built for make.fun's **"Make the best heist game"** bounty
(`best-heist-game-20261122-0559`, $50 USDC, 10 places paid, 22 Nov 2026 05:59–17:59 UTC).

You are a lone thief casing the **Meridian Bank** at 2:47 AM. Plan the job on a
blueprint, slip past patrolling guards and sweeping cameras, loop the camera feeds,
kill the alarm, cut the lasers, crack the vault dial, stuff your duffel with gold,
cash and gems — and be in the getaway van before the police seal the block.

Everything is original: the bank, characters, names, art and sound were created for
this entry. Every sprite is drawn with Canvas code and every sound is synthesized
with WebAudio. **Zero network requests at runtime.**

## Run it

Open `game/index.html` in a desktop browser (Chrome recommended) and press **Enter**.
The whole game is that one file — it also works from `file://`.

If your browser blocks anything from `file://`, serve the folder instead:

```sh
cd game && python3 -m http.server 8080   # then open http://localhost:8080
```

## The job

**1. Plan** — blueprint screen: pick an entry point (front doors / back alley /
roof vent) and 2 tools (lockpick set, camera jammer, smoke bomb, stun baton,
extra duffel). Guard patrols and camera cones are marked on the plan.

**2. Infiltrate** — one-screen bank: lobby, offices, security room, laser corridor,
vault. Guards patrol with raycast vision cones; cameras sweep. Sprinting is loud,
crouching behind tall furniture hides you, coins distract, the baton is silent.

**3. Disable** — steal the keycard from the manager's office, loop the cameras at
the security console, disable the alarm at the panel, cut laser power in the
janitor closet. All optional — all make the vault safer.

**4. Crack the vault** — dial timing mini-game (3 tumblers, shrinking green zone;
misses clang and raise the alarm), then a loud 6-second door swing.

**5. Grab & escape** — gold bars, cash bricks and gem cases, limited by duffel
weight (heavier = slower). Tripping the vault starts the police ETA; reach either
getaway van to win. Score = loot + ghost bonus (never seen) + silent bonus
(no alarm) + speed bonus, ranked S/A/B/C. Best score saves to `localStorage`.

## Controls

| Key | Action |
|---|---|
| **W A S D** / arrows | Move |
| **Shift** | Sprint (fast, noisy) |
| **C** / Ctrl | Crouch (slow, harder to see) |
| **E** | Interact (hold for lockpick / console / alarm / power channels) |
| **Q** | Throw coin toward mouse (distraction) |
| **F** | Takedown (from behind; anywhere with the baton) |
| **X** | Smoke bomb (breaks line of sight) |
| **J** | Camera jammer (60 s blind cameras) |
| **Space** / Click | Stop the vault dial needle |
| **P / Esc** | Pause |
| **R** | Restart job |
| **M** | Mute |

## Handing it in (make.fun kit)

`main.ts` (Node 22, standard library only) copies `game/` and `screenshots/` into
`$MAKEFUN_OUTPUT_DIR` (default `/output`) and writes `dossier.json` using
`buildDossier` from `./vendor/makefun-game.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`vendor/makefun-game.ts` must be copied from the bounty kit unchanged (not included
here — it comes from the kit). Screenshots (3–4 real renders) go in `screenshots/`:
suggested shots are the planning blueprint, mid-infiltration (guard + camera cones,
loot and alarm meter in one frame), the vault-crack mini-game, and the getaway win
screen.

## Tech

- One HTML file: vanilla JavaScript + Canvas 2D. No build step, no dependencies.
- Vision cones raycast against wall/furniture AABBs (segment–slab tests).
- Guard AI: patrol → investigate → search → chase; noise system; alarm meter.
- WebAudio-synthesized sound (klaxon, siren, drill, tumblers, cash, UI).

## License

MIT — see `LICENSE`.
