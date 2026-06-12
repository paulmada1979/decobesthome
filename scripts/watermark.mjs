// Burn a subtle "© DecoBestHome.com" watermark into images (bottom-right).
// Usage: node scripts/watermark.mjs <file> [<file> ...]
// Idempotency is the caller's job — run on fresh copies only.
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const TEXT = "© DecoBestHome.com";

async function watermark(file) {
  const img = sharp(readFileSync(file));
  const { width, height, format } = await img.metadata();
  const fs = Math.max(16, Math.round(width * 0.014)); // ~23px on a 1659px banner
  const pad = Math.round(fs * 0.9);
  // Large, very faint diagonal repeats across the image — hard to crop or clone out,
  // low enough opacity not to spoil the photo.
  const bigFs = Math.round(width * 0.034);
  const spots = [
    [0.24, 0.34],
    [0.62, 0.58],
    [0.36, 0.84],
  ];
  const diag = spots
    .map(([fx, fy]) => {
      const x = Math.round(width * fx);
      const y = Math.round(height * fy);
      return `<g transform="rotate(-18 ${x} ${y})">
        <text x="${x}" y="${y}" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif" font-size="${bigFs}" font-weight="700"
          letter-spacing="2" fill="#000" fill-opacity="0.05" dx="1.5" dy="1.5">${TEXT}</text>
        <text x="${x}" y="${y}" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif" font-size="${bigFs}" font-weight="700"
          letter-spacing="2" fill="#fff" fill-opacity="0.11">${TEXT}</text>
      </g>`;
    })
    .join("\n");
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${diag}
    <text x="${width - pad}" y="${height - pad}" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="600"
      letter-spacing="0.5"
      fill="#000" fill-opacity="0.28" dx="1" dy="1">${TEXT}</text>
    <text x="${width - pad}" y="${height - pad}" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="600"
      letter-spacing="0.5"
      fill="#fff" fill-opacity="0.52">${TEXT}</text>
  </svg>`;
  const buf = await img
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .toFormat(format === "webp" ? "webp" : "jpeg", { quality: 82 })
    .toBuffer();
  writeFileSync(file, buf);
  console.log("watermarked", file, `(${width}x${height}, fs ${fs})`);
}

for (const f of process.argv.slice(2)) await watermark(f);
