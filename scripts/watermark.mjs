// Burn the BestHome watermark into images:
//  - semi-transparent white "Best Home" wordmark, centered on the upper-middle
//    of the photo (like the original site's photos) — hard to crop away
//  - "@DecoBestHome.com" bottom-right corner credit
// Usage: node scripts/watermark.mjs [--corner] <file> [<file> ...]
//   --corner : add ONLY the bottom-right "@DecoBestHome.com" credit (no centre logo).
// Run on FRESH copies only (no idempotency check).
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const CORNER_ONLY = process.argv.includes("--corner");
// --centre: add ONLY the centre wordmark (no corner credit). Use on images that
// already carry the corner credit so it isn't doubled.
const CENTRE_ONLY = process.argv.includes("--centre");
const CORNER = "@DecoBestHome.com";
const LOGO = "public/logos/logo-wordmark-white.png";
const LOGO_OPACITY = 0.22;
const LOGO_WIDTH_FRAC = 0.27; // of image width
const LOGO_Y_FRAC = 0.36; // vertical centre of the logo

async function watermark(file) {
  const img = sharp(readFileSync(file));
  const { width, height, format } = await img.metadata();

  const layers = [];

  // centre logo (skipped in --corner mode)
  if (!CORNER_ONLY) {
    const logoW = Math.round(width * LOGO_WIDTH_FRAC);
    const logo = await sharp(readFileSync(LOGO))
      .resize(logoW)
      .composite([
        {
          input: Buffer.from([255, 255, 255, Math.round(LOGO_OPACITY * 255)]),
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();
    const logoMeta = await sharp(logo).metadata();
    const left = Math.round((width - logoW) / 2);
    const top = Math.round(height * LOGO_Y_FRAC - logoMeta.height / 2);
    layers.push({ input: logo, left, top });
  }

  // corner credit — white fill + dark outline so it stays legible on both
  // light (white studio backgrounds) and dark photos. paint-order="stroke"
  // draws the outline behind the fill so the letters stay crisp.
  const fs = Math.max(16, Math.round(width * 0.014));
  const pad = Math.round(fs * 0.9);
  const sw = Math.max(1.6, fs * 0.16);
  const corner = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <text x="${width - pad}" y="${height - pad}" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="600"
      letter-spacing="0.5" paint-order="stroke" stroke-linejoin="round"
      stroke="#141414" stroke-opacity="0.5" stroke-width="${sw}"
      fill="#fff" fill-opacity="0.68">${CORNER}</text>
  </svg>`;

  if (!CENTRE_ONLY) layers.push({ input: Buffer.from(corner), top: 0, left: 0 });

  const buf = await img
    .composite(layers)
    .toFormat(format === "webp" ? "webp" : "jpeg", { quality: 82 })
    .toBuffer();
  writeFileSync(file, buf);
  console.log(CENTRE_ONLY ? "centre" : CORNER_ONLY ? "corner" : "watermark", "->", file, `(${width}x${height})`);
}

for (const f of process.argv.slice(2)) if (f !== "--corner" && f !== "--centre") await watermark(f);
