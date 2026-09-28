export type ReedVariant = {
  /** Slug under /products/reed-fencing/. Content lives in messages products.reed.variants.{id}. */
  id: string;
  /** Approximate privacy coverage, for ordering/ladder display. */
  privacyPct: number;
  /** Hero banner (1659×948). */
  hero: string;
  /** Gallery images — first is the main product shot. */
  gallery: string[];
};

const v = (slug: string, n: number, wides = 0) => {
  const base = `/images/reed/v/${slug}`;
  const g = [`${base}-main.webp`];
  for (let i = 1; i <= n; i++) g.push(`${base}-g${i}.webp`);
  for (let i = 1; i <= wides; i++) g.push(`${base}-w${i}.webp`);
  return { hero: `${base}-hero.webp`, gallery: g };
};

/** Display order: peeled family (top → budget), unpeeled family, Japanese specialty. */
export const reedVariants: ReedVariant[] = [
  {
    id: "extra-thick-peeled-8-10mm",
    privacyPct: 100,
    // Explicit gallery: the main shot was re-cropped to 640x400 to drop the
    // supplier logo at the top and the white wedge at the bottom. Renamed on
    // each recrop (-v3) because replacing it in place left caches serving the
    // old image.
    hero: "/images/reed/v/extra-thick-peeled-8-10mm-hero.webp",
    gallery: [
      "/images/reed/v/extra-thick-peeled-8-10mm-main-v3.webp",
      "/images/reed/v/extra-thick-peeled-8-10mm-g1.webp",
      "/images/reed/v/extra-thick-peeled-8-10mm-g2.webp",
      "/images/reed/v/extra-thick-peeled-8-10mm-g3.webp",
      "/images/reed/v/extra-thick-peeled-8-10mm-g4.webp",
    ],
  },
  { id: "thick-peeled-5-8mm", privacyPct: 90, ...v("thick-peeled-5-8mm", 4, 1) },
  { id: "high-density-fine-3-6mm", privacyPct: 80, ...v("high-density-fine-3-6mm", 2) },
  { id: "cheap-peeled-3-6mm", privacyPct: 50, ...v("cheap-peeled-3-6mm", 4) },
  { id: "extra-thick-unpeeled-8-10mm", privacyPct: 100, ...v("extra-thick-unpeeled-8-10mm", 2) },
  {
    id: "thick-unpeeled-5-8mm",
    privacyPct: 90,
    // Explicit gallery: drop the washed-out -w1 shot (kept on disk, just unlisted).
    hero: "/images/reed/v/thick-unpeeled-5-8mm-hero.webp",
    gallery: [
      "/images/reed/v/thick-unpeeled-5-8mm-main.webp",
      "/images/reed/v/thick-unpeeled-5-8mm-g1.webp",
      "/images/reed/v/thick-unpeeled-5-8mm-g2.webp",
      "/images/reed/v/thick-unpeeled-5-8mm-g3.webp",
      "/images/reed/v/thick-unpeeled-5-8mm-g4.webp",
      "/images/reed/v/thick-unpeeled-5-8mm-w2.webp",
    ],
  },
  { id: "cheap-unpeeled-3-6mm", privacyPct: 50, ...v("cheap-unpeeled-3-6mm", 2) },
  { id: "japanese-with-bamboo", privacyPct: 90, ...v("japanese-with-bamboo", 4) },
  { id: "split-reed", privacyPct: 70, ...v("split-reed", 2) },
  { id: "italian-style-peeled", privacyPct: 70, ...v("italian-style-peeled", 2) },
];

export function getReedVariant(id: string): ReedVariant | undefined {
  return reedVariants.find((x) => x.id === id);
}
