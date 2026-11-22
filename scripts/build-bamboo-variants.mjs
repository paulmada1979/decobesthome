// Build images for the bamboo fence / panel variant pages.
// Usage: node scripts/build-bamboo-variants.mjs <pages-spec.json> <overrides.json> <curate-fence.json> <curate-panels.json>
//  overrides.json: { "exclude": [source paths to drop], "nowm": [source paths that already carry a watermark] }
//  - hero  : user's banner → public/images/bamboo/v/<slug>-hero.webp (1792w, corner credit only)
//  - gallery: main, studio, details, scenes → <slug>-g<n>.webp (1200 max, full watermark)
//  - qc    : factory QC photos → <slug>-qc<n>.webp (1200 max, full watermark)
//  Writes src/lib/bambooVariantImages.ts. Re-running regenerates everything from the sources.
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const [specPath, overridesPath, ...curatePaths] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const spec = JSON.parse(readFileSync(specPath, "utf8"));
const overrides = JSON.parse(readFileSync(overridesPath, "utf8"));
const norm = (f) => path.resolve(f).toLowerCase();
const EXCLUDE = new Set((overrides.exclude ?? []).map(norm));
const NOWM = new Set((overrides.nowm ?? []).map(norm));
const usable = (f) => f && existsSync(f) && !EXCLUDE.has(norm(f));
const curate = Object.assign({}, ...curatePaths.map((p) => JSON.parse(readFileSync(p, "utf8"))));
const OUT = "public/images/bamboo/v";
mkdirSync(OUT, { recursive: true });

const resolve = (dir, f) => (f ? path.resolve(dir, f) : null);

// Clean, logo-free studio images: <CLEAN_DIR>/<slug>.png (+ sources.json: slug → supplier photo it was made from, or null).
const CLEAN_DIR = "C:/Projects/Deco files/Clean studio";
const CLEAN_SOURCES = existsSync(`${CLEAN_DIR}/sources.json`) ? JSON.parse(readFileSync(`${CLEAN_DIR}/sources.json`, "utf8")) : {};
// Card images on the overview pages, read from src/lib/bambooVariants.ts.
const CARDS = {};
{
  const src = readFileSync("src/lib/bambooVariants.ts", "utf8");
  for (const block of src.split(/export const bamboo(?:Fence|Panel)Series/).slice(1)) {
    const dir = /key:\s*"fence"/.test(block) ? "fence" : "panels";
    for (const m of block.matchAll(/id:\s*"([^"]+)",\s*card:\s*"([^"]+)"/g)) CARDS[m[1]] = `public/images/${dir}/${m[2]}`;
  }
}

// Windows (Defender/indexer) can briefly lock a file in public/: retry the write instead of failing.
async function save(pipeline, out) {
  const buf = await pipeline.toBuffer();
  for (let i = 0; ; i++) {
    try { return writeFileSync(out, buf); }
    catch (e) { if (i >= 10) throw e; await new Promise((r) => setTimeout(r, 500 * (i + 1))); }
  }
}

async function toWebp(src, out, { width, height, fit = "inside" }) {
  const img = sharp(readFileSync(src))
    .rotate()
    .resize(width, height, { fit, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .webp({ quality: 80 });
  await save(img, out);
  return out;
}

const result = {};
const heroFiles = [];
const fullFiles = [];

for (const page of spec.pages) {
  const slug = page.slug;
  const c = curate[slug] ?? {};
  const banner = resolve(spec.banners._dir, spec.banners[slug]);
  const studio = resolve(spec.studios._dir, spec.studios[slug]);
  const entry = { hero: "", gallery: [], qc: [] };

  if (banner && existsSync(banner)) {
    const out = `${OUT}/${slug}-hero.webp`;
    // Heroes only change when the banner changes: keep an existing one (pass --heroes to rebuild).
    if (!existsSync(out) || process.argv.includes("--heroes")) {
      await toWebp(banner, out, { width: 1792, height: 1024 });
      heroFiles.push(out);
    }
    entry.hero = `/images/bamboo/v/${slug}-hero.webp`;
  }

  // Clean studio shot (logo-free, made by hand) leads the gallery and is the card image.
  const clean = path.join(CLEAN_DIR, `${slug}.png`);
  const hasClean = existsSync(clean);
  const cleanFrom = CLEAN_SOURCES[slug] ? norm(CLEAN_SOURCES[slug]) : null;
  const main = c.main && cleanFrom && norm(c.main) === cleanFrom ? null : c.main;
  const gallerySrc = [hasClean ? clean : null, main, studio, ...(c.details ?? []), ...(c.scenes ?? [])].filter(usable);
  if (hasClean && CARDS[slug]) {
    await save(
      sharp(readFileSync(clean))
        .resize(640, 640, { fit: "contain", background: "#ffffff" })
        .flatten({ background: "#ffffff" })
        .webp({ quality: 82 }),
      CARDS[slug],
    );
    fullFiles.push(CARDS[slug]);
  }
  let n = 0;
  for (const src of [...new Set(gallerySrc)]) {
    n++;
    const out = `${OUT}/${slug}-g${n}.webp`;
    await toWebp(src, out, { width: 1200, height: 1200 });
    if (!NOWM.has(norm(src))) fullFiles.push(out);
    entry.gallery.push(`/images/bamboo/v/${slug}-g${n}.webp`);
  }

  // The banner also goes into the gallery (2nd photo), with the full watermark —
  // the hero copy only carries the corner credit because the headline covers the centre.
  if (banner && existsSync(banner)) {
    const out = `${OUT}/${slug}-banner.webp`;
    await toWebp(banner, out, { width: 1600, height: 1600 });
    fullFiles.push(out);
    entry.gallery.splice(1, 0, `/images/bamboo/v/${slug}-banner.webp`);
  }

  let q = 0;
  for (const src of (c.qc ?? []).filter(usable)) {
    q++;
    const out = `${OUT}/${slug}-qc${q}.webp`;
    await toWebp(src, out, { width: 1200, height: 1200 });
    if (!NOWM.has(norm(src))) fullFiles.push(out);
    entry.qc.push(`/images/bamboo/v/${slug}-qc${q}.webp`);
  }

  if (!entry.hero) entry.hero = entry.gallery[0] ?? "/images/bamboo-fence-hero.webp";
  result[slug] = entry;
  console.log(`${slug}: hero ${entry.hero ? "✓" : "✗"}, gallery ${entry.gallery.length}, qc ${entry.qc.length}`);
}

// Watermark: heroes get only the corner credit (headline sits over the centre).
if (heroFiles.length) execFileSync("node", ["scripts/watermark.mjs", "--corner", ...heroFiles], { stdio: "inherit" });
if (fullFiles.length) execFileSync("node", ["scripts/watermark.mjs", ...fullFiles], { stdio: "inherit" });

const ts =
  "// Generated by scripts/build-bamboo-variants.mjs — do not edit by hand.\n" +
  "export const bambooVariantImages: Record<string, { hero: string; gallery: string[]; qc: string[] }> = " +
  JSON.stringify(result, null, 2) +
  ";\n";
writeFileSync("src/lib/bambooVariantImages.ts", ts);
console.log("wrote src/lib/bambooVariantImages.ts");
