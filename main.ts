// VAULTLINE — Night at the Meridian. Entry runner for make.fun's
// "Make the best heist game" bounty (Node 22, standard library only).
// Copies game/ and screenshots/ from beside this file into
// $MAKEFUN_OUTPUT_DIR (default /output) and writes dossier.json there
// with the vendored buildDossier, so the dossier matches the scorer's.

import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const base = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(base, 'game'), join(out, 'game'), { recursive: true });
cpSync(join(base, 'screenshots'), join(out, 'screenshots'), { recursive: true });

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(out, 'dossier.json'), dossier);

console.log(`VAULTLINE dossier written to ${join(out, 'dossier.json')} (${dossier.length} bytes)`);
