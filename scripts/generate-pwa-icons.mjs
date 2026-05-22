#!/usr/bin/env node
// ============================================================================
// generate-pwa-icons.mjs
// ----------------------------------------------------------------------------
// Converts the SVG source-of-truth marks into the PNGs the PWA manifest and
// social-card meta tags reference. Runs as `prebuild` so production builds
// always ship up-to-date raster assets without any manual step.
//
// Sources:
//   static/img/logo.svg         →  static/img/icons/icon-192.png
//                                  static/img/icons/icon-512.png
//                                  static/img/icons/maskable-512.png   (padded)
//                                  static/img/icons/apple-touch-icon.png (180x180)
//   static/img/social-card.svg  →  static/img/social-card.png          (1200x630)
//
// Sharp is a transitive dep via @docusaurus/plugin-ideal-image. We import it
// dynamically so a missing-sharp environment fails with a clear message rather
// than a confusing stack trace.
// ============================================================================

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root      = path.resolve(__dirname, '..');
const staticDir = path.join(root, 'static');
const imgDir    = path.join(staticDir, 'img');
const iconsDir  = path.join(imgDir, 'icons');

const PAPER = '#FBF8F2';        // brand bg; matches manifest background_color

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch (err) {
  console.error('[icons] sharp is not installed. Run `npm install sharp --save-dev` or run `npm install` again.');
  console.error('[icons] cause:', err.message);
  process.exit(0);   // exit 0 so a missing-sharp env doesn't break the build
}

await mkdir(iconsDir, { recursive: true });

// ── helpers ─────────────────────────────────────────────────────────────────
async function renderPng({ src, out, size, padPct = 0, background = PAPER, opaque = true }) {
  if (!existsSync(src)) {
    console.warn(`[icons] skip: source not found: ${path.relative(root, src)}`);
    return;
  }
  const svg = await readFile(src);
  const inner = Math.round(size * (1 - padPct * 2));

  // Render the SVG into the inner area, then flatten over the background.
  const innerPng = await sharp(svg, { density: 600 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const pipeline = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: opaque ? background : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([{ input: innerPng, gravity: 'center' }]);

  const buf = await pipeline.png({ compressionLevel: 9 }).toBuffer();
  await writeFile(out, buf);
  console.log(`[icons] ✓ ${path.relative(root, out)}  (${size}×${size})`);
}

async function renderSocial({ src, out, width = 1200, height = 630 }) {
  if (!existsSync(src)) {
    console.warn(`[icons] skip: source not found: ${path.relative(root, src)}`);
    return;
  }
  const svg = await readFile(src);
  await sharp(svg, { density: 200 })
    .resize(width, height, { fit: 'contain', background: { r: 251, g: 248, b: 242, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`[icons] ✓ ${path.relative(root, out)}  (${width}×${height})`);
}

// ── outputs ─────────────────────────────────────────────────────────────────
const logoSvg   = path.join(imgDir, 'logo.svg');
const socialSvg = path.join(imgDir, 'social-card.svg');

await renderPng({ src: logoSvg, out: path.join(iconsDir, 'icon-192.png'), size: 192, padPct: 0.10 });
await renderPng({ src: logoSvg, out: path.join(iconsDir, 'icon-512.png'), size: 512, padPct: 0.10 });
// Maskable icons need a safe-zone — the OS may crop up to 20% on each side.
await renderPng({ src: logoSvg, out: path.join(iconsDir, 'maskable-512.png'), size: 512, padPct: 0.20 });
await renderPng({ src: logoSvg, out: path.join(iconsDir, 'apple-touch-icon.png'), size: 180, padPct: 0.10 });
await renderSocial({ src: socialSvg, out: path.join(imgDir, 'social-card.png') });

console.log('[icons] done.');
