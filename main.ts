// VAULTLINE — Night at the Meridian. Entry runner for make.fun's
// "Make the best heist game" bounty (Node 22, standard library only).
// Copies game/ and screenshots/ from beside this file into
// $MAKEFUN_OUTPUT_DIR (default /output) and writes dossier.json there
// with the vendored buildDossier, so the dossier matches the scorer's.

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const base = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail early with a clear message if the game entry file is missing,
// instead of copying an empty or partial game/ directory.
const entryHtml = join(base, 'game', 'index.html');
if (!existsSync(entryHtml)) {
  console.error(`VAULTLINE entry runner: game/index.html not found at ${entryHtml}; nothing to package.`);
  process.exit(1);
}

// Count regular files under a directory (recursively) for the final log line.
const countFiles = (dir: string): number =>
  readdirSync(dir, { recursive: true, withFileTypes: true }).filter((d) => d.isFile()).length;

mkdirSync(out, { recursive: true });
cpSync(join(base, 'game'), join(out, 'game'), { recursive: true });
cpSync(join(base, 'screenshots'), join(out, 'screenshots'), { recursive: true });

const filesCopied = countFiles(join(out, 'game')) + countFiles(join(out, 'screenshots'));

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(out, 'dossier.json'), dossier);

console.log(
  `VAULTLINE dossier written to ${join(out, 'dossier.json')} (${dossier.length} bytes); ` +
    `copied ${filesCopied} file(s) from game/ and screenshots/`,
);
