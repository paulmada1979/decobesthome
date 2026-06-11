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
  { id: "extra-thick-peeled-8-10mm", privacyPct: 100, ...v("extra-thick-peeled-8-10mm", 4) },
  { id: "thick-peeled-5-8mm", privacyPct: 90, ...v("thick-peeled-5-8mm", 4, 1) },
  { id: "high-density-fine-3-6mm", privacyPct: 80, ...v("high-density-fine-3-6mm", 2) },
  { id: "cheap-peeled-3-6mm", privacyPct: 50, ...v("cheap-peeled-3-6mm", 4) },
  { id: "extra-thick-unpeeled-8-10mm", privacyPct: 100, ...v("extra-thick-unpeeled-8-10mm", 2) },
  { id: "thick-unpeeled-5-8mm", privacyPct: 90, ...v("thick-unpeeled-5-8mm", 4, 2) },
  { id: "cheap-unpeeled-3-6mm", privacyPct: 50, ...v("cheap-unpeeled-3-6mm", 2) },
  { id: "japanese-with-bamboo", privacyPct: 90, ...v("japanese-with-bamboo", 4) },
];

export function getReedVariant(id: string): ReedVariant | undefined {
  return reedVariants.find((x) => x.id === id);
}
