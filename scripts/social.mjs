// One image -> every platform size, watermarked, in one go.
// Usage: node scripts/social.mjs <input-image> [output-basename]
//   e.g. node scripts/social.mjs post1-banner.png public/images/blog/attach-hero
// Generates <base>-<platform>.webp for each size below.
// Tip: generate the source image square-ish and large (>=1600px) so every
// crop has room. Crops are centre "cover".
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";

const CORNER = "@DecoBestHome.com";
// Platform-first labels so the files are self-explanatory:
//   "Facebook - <name>.webp", "Instagram feed - <name>.webp", etc.
const SIZES = [
  ["Website", 1600, 900], // blog banner / OG / link preview (16:9)
  ["LinkedIn", 1200, 627], // LinkedIn shared image (1.91:1)
  ["Facebook", 1200, 630], // Facebook post / link (1.91:1)
  ["Instagram square", 1080, 1080], // Instagram square (1:1)
  ["Instagram feed", 1080, 1350], // Instagram portrait 4:5 (best reach)
  ["Instagram story", 1080, 1920], // Instagram / FB story & reel cover (9:16)
];

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/social.mjs <input-image> [output-basename]");
  process.exit(1);
}
const outBase =
  process.argv[3] ||
  join(dirname(input), basename(input, extname(input)));

function cornerSvg(w, h) {
  const fs = Math.max(16, Math.round(w * 0.014));
  const pad = Math.round(fs * 0.9);
  const sw = Math.max(1.6, fs * 0.16);
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <text x="${w - pad}" y="${h - pad}" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="600"
      letter-spacing="0.5" paint-order="stroke" stroke-linejoin="round"
      stroke="#141414" stroke-opacity="0.5" stroke-width="${sw}"
      fill="#fff" fill-opacity="0.68">${CORNER}</text>
  </svg>`);
}

const src = readFileSync(input);
for (const [name, w, h] of SIZES) {
  const base = await sharp(src).resize(w, h, { fit: "cover", position: "attention" }).toBuffer();
  const out = await sharp(base)
    .composite([{ input: cornerSvg(w, h), top: 0, left: 0 }])
    .toFormat("webp", { quality: 84 })
    .toBuffer();
  // Platform-first filename, e.g. "Facebook - reed-vs-bamboo.webp"
  const file = join(dirname(outBase), `${name} - ${basename(outBase)}.webp`);
  writeFileSync(file, out);
  console.log(`${name.padEnd(17)} ${w}x${h}  ->  ${file}`);
}
