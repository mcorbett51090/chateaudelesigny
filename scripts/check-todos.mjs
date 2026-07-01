#!/usr/bin/env node
/**
 * check-todos — launch guard for owner-only `TODO:` placeholders in src/config/site.ts
 * (the legally-required Mentions légales fields: entity, SIREN, RCS, host, …).
 *
 * Referenced by site.ts's header comment; wired as the npm `prebuild` hook so it runs
 * on every `npm run build` (including CI via withastro/action, which runs `npm run build`).
 *
 * Behaviour:
 *   - PRODUCTION build (go-live) → FAIL (exit 1) if any TODO: remains, so the live site
 *     can never launch with placeholder legal text.
 *   - Interim PREVIEW build (the github.io subpath) → WARN only (exit 0), so the preview
 *     deploy stays green while those owner-only fields are still outstanding.
 *
 * A build is treated as PRODUCTION when either:
 *   - env GO_LIVE=1  (explicit), or
 *   - astro.config.mjs SITE is a custom domain (i.e. not an *.github.io preview host).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const siteTs = readFileSync(join(root, 'src/config/site.ts'), 'utf8');
const todoLines = siteTs
  .split('\n')
  .map((line, i) => ({ n: i + 1, line }))
  // Only real field values (quoted 'TODO:…' / "TODO:…"); ignore the backtick-quoted
  // `TODO:` reference inside the file's own header comment.
  .filter(({ line }) => /['"]TODO:/.test(line));

// Decide whether this is a production/go-live build.
let isProduction = process.env.GO_LIVE === '1';
try {
  const cfg = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
  const m = cfg.match(/const\s+SITE\s*=\s*['"]([^'"]+)['"]/);
  if (m && !/github\.io/.test(m[1])) isProduction = true;
} catch {
  /* if the config can't be read, fall back to the env flag only */
}

if (todoLines.length === 0) {
  console.log('✓ check-todos: no TODO: placeholders in site.ts');
  process.exit(0);
}

const header = `check-todos: ${todoLines.length} unfilled TODO: placeholder(s) in src/config/site.ts`;
const detail = todoLines.map(({ n, line }) => `  site.ts:${n}  ${line.trim()}`).join('\n');

if (isProduction) {
  console.error(`\n✗ ${header}\n${detail}\n`);
  console.error('These are legally required for the Mentions légales. Fill them in src/config/site.ts');
  console.error('before a production build, or unset GO_LIVE / keep the preview host to build a preview.\n');
  process.exit(1);
}

console.warn(`\n⚠ ${header} (preview build — not blocking)\n${detail}`);
console.warn('  → these MUST be filled before go-live (a production build will fail while they remain).\n');
process.exit(0);
