// Burn the BestHome watermark into images:
//  - semi-transparent white "Best Home" wordmark, centered on the upper-middle
//    of the photo (like the original site's photos) — hard to crop away
//  - "@DecoBestHome.com" bottom-right corner credit
// Usage: node scripts/watermark.mjs <file> [<file> ...]
// Run on FRESH copies only (no idempotency check).
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const CORNER = "@DecoBestHome.com";
const LOGO = "public/logos/logo-wordmark-white.png";
const LOGO_OPACITY = 0.22;
const LOGO_WIDTH_FRAC = 0.27; // of image width
const LOGO_Y_FRAC = 0.36; // vertical centre of the logo

async function watermark(file) {
  const img = sharp(readFileSync(file));
  const { width, height, format } = await img.metadata();

  // logo, resized + alpha reduced
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

  // corner credit
  const fs = Math.max(16, Math.round(width * 0.014));
  const pad = Math.round(fs * 0.9);
  const corner = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <text x="${width - pad}" y="${height - pad}" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="600"
      letter-spacing="0.5"
      fill="#000" fill-opacity="0.20" dx="1" dy="1">${CORNER}</text>
    <text x="${width - pad}" y="${height - pad}" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="600"
      letter-spacing="0.5"
      fill="#fff" fill-opacity="0.42">${CORNER}</text>
  </svg>`;

  const buf = await img
    .composite([
      { input: logo, left, top },
      { input: Buffer.from(corner), top: 0, left: 0 },
    ])
    .toFormat(format === "webp" ? "webp" : "jpeg", { quality: 82 })
    .toBuffer();
  writeFileSync(file, buf);
  console.log("watermarked", file, `(${width}x${height}, logo ${logoW}px @${LOGO_OPACITY})`);
}

for (const f of process.argv.slice(2)) await watermark(f);
