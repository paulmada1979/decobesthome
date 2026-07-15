export type ProductTag = "bestseller" | "popular";

export type Product = {
  id: string;
  slug: string;
  /** Catalog/card image (under /images). Empty string => placeholder tile. */
  image: string;
  /** Larger emoji/icon used in the mega menu. */
  icon: string;
  /** Short descriptor key for the mega menu, maps to messages products.mega.{id}. */
  tag?: ProductTag;
  placeholder?: boolean;
  /** Extra gallery images for the detail page (first entry is the main image). */
  gallery?: string[];
  /** Optional separate page-top hero banner (when it should differ from gallery[0]). */
  heroImage?: string;
  /** Whether the product has the rich detail content block in messages.products.detail.{id}. */
  hasDetail?: boolean;
  /** Render the long-form "about" text section (messages.products.detail.items.{id}.about). */
  hasAbout?: boolean;
  /** Render the variations grid (messages.products.detail.items.{id}.variations); images under /images/tonkin etc. */
  hasVariations?: boolean;
  /** Render the variations grid above the "about" section instead of below it. */
  variationsFirst?: boolean;
  /** Folder under /images that holds this product's variation thumbnails. */
  variationDir?: string;
  /** Variation image filenames to hide (kept in messages, just not rendered). */
  hiddenVariations?: string[];
  /** Hide from menu/catalog/related listings (page still builds at its URL). For unfinished ranges. */
  unlisted?: boolean;
  /** Optional size chart rows (length + diameter range). Labels live in messages. */
  sizeChart?: { len: string; dia: string }[];
  /** Optional colour swatches (image under variationDir + label key in messages {id}.colors.labels). */
  colors?: { img: string; key: string }[];
  /** Render the grades & packing section (messages.products.detail.items.{id}.grades). */
  hasGrades?: boolean;
  /** Photo-strip images (paths) shown in the grades section. */
  gradePhotos?: string[];
  /** "In real spaces" showcase gallery images (paths); labels in messages {id}.showcase. */
  showcasePhotos?: string[];
};

/** Authoritative catalog order (12 ranges). Names live in messages products.names.{id}. */
export const products: Product[] = [
  {
    id: "tonkin-bamboo-canes",
    slug: "tonkin-bamboo-canes",
    image: "/images/tonkin-hero-w.webp",
    icon: "🎋",
    tag: "bestseller",
    unlisted: true,
    hasAbout: true,
    hasVariations: true,
    hasGrades: true,
    variationDir: "tonkin",
    gallery: ["/images/tonkin-hero-w.webp", "/images/tonkin-support-w.webp"],
    gradePhotos: [
      "/images/tonkin/factory-1.webp",
      "/images/tonkin/factory-2.webp",
      "/images/tonkin/factory-3.webp",
      "/images/tonkin/factory-4.webp",
      "/images/tonkin/factory-5.webp",
      "/images/tonkin/factory-6.webp",
    ],
    sizeChart: [
      { len: "60 cm", dia: "6/8 – 14/16 mm" },
      { len: "70 cm", dia: "6/8 – 16/18 mm" },
      { len: "75 cm", dia: "6/8 – 14/16 mm" },
      { len: "90 cm", dia: "6/8 – 14/16 mm" },
      { len: "105 cm", dia: "6/8 – 22/24 mm" },
      { len: "120 cm", dia: "8/10 – 22/24 mm" },
      { len: "150 cm", dia: "8/10 – 22/24 mm" },
      { len: "180 cm", dia: "8/10 – 28/30 mm" },
      { len: "210 cm", dia: "10/12 – 28/30 mm" },
      { len: "240 cm", dia: "16/18 – 30/35 mm" },
      { len: "250 cm", dia: "16/18 – 28/30 mm" },
      { len: "270 cm", dia: "12/14 – 35/40 mm" },
      { len: "300 cm", dia: "22/24 – 40/45 mm" },
      { len: "395 cm", dia: "24/26 – 35/40 mm" },
      { len: "420 cm", dia: "26/28 – 35/40 mm" },
      { len: "450 cm", dia: "28/30 – 40/45 mm" },
      { len: "595 cm", dia: "30/35 – 40/45 mm" },
    ],
  },
  {
    id: "decor-moso-bamboo-poles",
    slug: "decor-moso-bamboo-poles",
    image: "/images/moso-hero-w.webp",
    icon: "🟫",
    tag: "bestseller",
    hasAbout: true,
    hasVariations: true,
    variationDir: "moso",
    hiddenVariations: ["var-large.webp", "var-slats.webp", "var-twig.webp"],
    gallery: [
      "/images/moso-hero-w.webp",
      "/images/moso/scene-2-w.webp",
      "/images/moso/scene-16-w.webp",
      "/images/moso/scene-17-w.webp",
      "/images/moso/scene-5-w.webp",
    ],
    showcasePhotos: [
      "/images/moso/scene-14-w.webp",
      "/images/moso/scene-18-w.webp",
      "/images/moso/scene-19-w.webp",
      "/images/moso/scene-20-w.webp",
      "/images/moso/scene-12-w.webp",
      "/images/moso/scene-4-w.webp",
    ],
    sizeChart: [
      { len: "Φ 30 – 40 mm", dia: "100 – 600 cm" },
      { len: "Φ 40 – 50 mm", dia: "100 – 600 cm" },
      { len: "Φ 50 – 60 mm", dia: "100 – 600 cm" },
      { len: "Φ 60 – 70 mm", dia: "100 – 600 cm" },
      { len: "Φ 70 – 75 mm", dia: "100 – 600 cm" },
      { len: "Φ 75 – 90 mm", dia: "100 – 600 cm" },
      { len: "Φ 90 – 100 mm", dia: "100 – 600 cm" },
      { len: "Φ 100 – 110 mm", dia: "100 – 600 cm" },
      { len: "Φ 110 – 120 mm", dia: "100 – 600 cm" },
      { len: "Φ 120 – 125 mm", dia: "100 – 600 cm" },
      { len: "Φ 125 – 130 mm", dia: "100 – 600 cm" },
      { len: "Φ 130 – 140 mm", dia: "100 – 600 cm" },
      { len: "Φ 140 – 150 mm", dia: "100 – 600 cm" },
      { len: "Φ 150 – 160 mm", dia: "100 – 600 cm" },
    ],
  },
  {
    id: "bamboo-room-dividers",
    slug: "bamboo-room-dividers",
    image: "/images/divider-hero-w.webp",
    icon: "▥",
    tag: "popular",
    hasAbout: true,
    hasVariations: true,
    variationDir: "divider",
    hiddenVariations: ["var-moso.webp"],
    gallery: [
      "/images/divider-hero-w.webp",
      "/images/divider/divider-main-w.webp",
      "/images/divider/scene-natural-w.webp",
      "/images/divider/scene-brown-w.webp",
      "/images/divider/scene-grey2.webp",
    ],
  },
  {
    id: "bamboo-reed-curtains",
    slug: "bamboo-reed-curtains",
    image: "/images/curtains-hero-w.webp",
    icon: "▥",
    tag: "popular",
    hasAbout: true,
    hasVariations: true,
    variationDir: "curtains",
    gallery: [
      "/images/curtains-hero-w.webp",
      "/images/curtains/scene-long2-w.webp",
      "/images/curtains/scene-long-w.webp",
    ],
  },
  {
    id: "bamboo-rugs",
    slug: "bamboo-rugs",
    image: "/images/rugs/hero.webp",
    icon: "🟫",
    tag: "popular",
    hasAbout: true,
    hasVariations: true,
    variationsFirst: true,
    variationDir: "rugs",
    heroImage: "/images/rugs/hero.webp",
    gallery: [
      "/images/rugs/hero.webp",
      "/images/rugs/scene-bath.webp",
      "/images/rugs/scene-bedroom.webp",
      "/images/rugs/scene-living.webp",
    ],
    showcasePhotos: [
      "/images/rugs/scene-kitchen.webp",
      "/images/rugs/detail-rolled.webp",
      "/images/rugs/detail-corner.webp",
      "/images/rugs/detail-backing.webp",
    ],
    colors: [
      { img: "color-natural.webp", key: "natural" },
      { img: "color-chocolate.webp", key: "chocolate" },
      { img: "color-black.webp", key: "black" },
      { img: "color-white.webp", key: "white" },
      { img: "color-blue.webp", key: "blue" },
      { img: "color-red.webp", key: "red" },
    ],
    sizeChart: [
      { len: "50 cm", dia: "80 · 110 · 140 · 180 · 240 · 280" },
      { len: "60 cm", dia: "90 · 110 · 140 · 180 · 240 · 280" },
      { len: "75 cm", dia: "200" },
      { len: "80 cm", dia: "200" },
      { len: "90 cm", dia: "120 · 160" },
      { len: "120 cm", dia: "160 · 240" },
      { len: "160 cm", dia: "160 · 240" },
      { len: "180 cm", dia: "160 · 240" },
      { len: "200 cm", dia: "300" },
    ],
  },
  {
    id: "bamboo-fencing-edging",
    slug: "bamboo-fencing-edging",
    image: "/images/bamboo-fence-hero.webp",
    icon: "🌿",
    tag: "bestseller",
    hasDetail: true,
    hasAbout: true,
    hasVariations: true,
    variationsFirst: true,
    variationDir: "fence",
    gallery: [
      "/images/bamboo-fence-hero.webp",
      "/images/fence/scene-banner2.webp",
      "/images/fence/scene-garden.webp",
      "/images/fence/scene-natural.webp",
    ],
    showcasePhotos: [
      "/images/fence/scene-fixed.webp",
      "/images/fence/scene-support.webp",
      "/images/fence/scene-black.webp",
    ],
    sizeChart: [
      { len: "10 – 20 mm", dia: "Light screening, edging and decorative panels" },
      { len: "20 – 30 mm", dia: "All-round garden privacy fencing" },
      { len: "40 – 60 mm", dia: "Half-round type fencing" },
    ],
  },
  {
    id: "bamboo-fence-panels",
    slug: "bamboo-fence-panels",
    image: "/images/panels-hero-w.webp",
    icon: "▦",
    hasAbout: true,
    hasVariations: true,
    variationsFirst: true,
    variationDir: "panels",
    gallery: [
      "/images/panels-hero-w.webp",
      "/images/panels/scene-jp-w.webp",
      "/images/panels/scene-med-w.webp",
    ],
  },
  {
    id: "bamboo-household-articles",
    slug: "bamboo-household-articles",
    image: "/images/Bamboo-room-divider-1024x576.webp",
    icon: "🧺",
    unlisted: true,
  },
  {
    id: "bamboo-flower-sticks",
    slug: "bamboo-flower-sticks",
    image: "/images/flower-hero.webp",
    icon: "🪴",
    heroImage: "/images/flower-hero.webp",
    // flower/main.webp (the 4-up stick grid) kept on disk, hidden for now — swap back anytime.
    gallery: ["/images/flower/main2.webp"],
    hasAbout: true,
    hasVariations: true,
    variationsFirst: true,
    variationDir: "flower",
    unlisted: true,
  },
  {
    id: "bamboo-plywood",
    slug: "bamboo-plywood",
    image: "/images/moso-bamboo-for-wall-cladding-1024x574.webp",
    icon: "🟤",
    unlisted: true,
  },
  {
    id: "reed-fencing",
    slug: "reed-fencing",
    image: "/images/reed-hero.webp",
    icon: "▤",
    tag: "bestseller",
    hasAbout: true,
    hasVariations: true,
    variationDir: "reed",
    gallery: [
      "/images/reed-hero.webp",
      "/images/reed-fence-garden-4.webp",
      "/images/reed/gal-extrathick.webp",
    ],
    showcasePhotos: [
      "/images/reed-fence-garden-3-1024x574-3.webp",
      "/images/reed-fence-balcony-2.webp",
      "/images/reed/scene-hd.webp",
    ],
    sizeChart: [
      { len: "3 – 6 mm", dia: "High-density fine reed — smooth, refined screening" },
      { len: "5 – 8 mm", dia: "All-round thick reed for garden privacy" },
      { len: "8 – 10 mm", dia: "Extra peeled thick reed" },
      { len: "6 – 10 mm", dia: "Thick unpeeled reed" },
    ],
  },
  {
    id: "other-natural-fencing",
    slug: "other-natural-fencing",
    image: "/images/willow-hero.webp",
    icon: "🍃",
    tag: "bestseller",
    hasAbout: true,
    hasVariations: true,
    variationsFirst: true,
    variationDir: "willow",
    gallery: [
      "/images/willow-hero.webp",
      "/images/willow/scene-brushwood.webp",
      "/images/willow/scene-bark.webp",
      "/images/willow/scene-square.webp",
    ],
  },
  {
    id: "natural-thatch-roof",
    slug: "natural-thatch-roof",
    image: "/images/thatch-hero-w.webp",
    icon: "🌾",
    hasAbout: true,
    hasVariations: true,
    variationDir: "thatch",
    gallery: [
      "/images/thatch-hero-w.webp",
      "/images/thatch/scene-5-w.webp",
      "/images/thatch/scene-7-w.webp",
      "/images/thatch/scene-8-w.webp",
      "/images/thatch/scene-6-w.webp",
    ],
    showcasePhotos: [
      "/images/thatch/scene-11-w.webp",
      "/images/thatch/scene-3-w.webp",
      "/images/thatch/scene-4-w.webp",
      "/images/thatch/scene-1-w.webp",
      "/images/thatch/scene-2-w.webp",
      "/images/thatch/scene-9-w.webp",
    ],
  },
  {
    id: "artificial-fence-rolls",
    slug: "artificial-fence-rolls",
    image: "/images/sy_artificial-ivy-leaf-leaf-hedge-panel-300x300.jpg",
    icon: "🟩",
    unlisted: true,
  },
  {
    id: "artificial-green-wall-panels",
    slug: "artificial-green-wall-panels",
    image: "/images/sy_Artificial-simulation-boxwood-hedge-mat-panel-300x300.jpg",
    icon: "🟩",
    unlisted: true,
  },
];

/** Publicly listed ranges (excludes unfinished/unlisted products). Catalog order. */
export const listedProducts = products.filter((p) => !p.unlisted);

/**
 * Header mega-menu order (requested 1–10 priority). Any listed product not named
 * here appends after, in catalog order. Capped at 12.
 */
const megaOrder: string[] = [
  "bamboo-fencing-edging",
  "reed-fencing",
  "decor-moso-bamboo-poles",
  "other-natural-fencing",
  "bamboo-fence-panels",
  "bamboo-reed-curtains",
  "bamboo-room-dividers",
  "bamboo-rugs",
  "bamboo-flower-sticks",
  "natural-thatch-roof",
];

/**
 * Ranges shown in the header mega menu, in the exact requested order.
 * Built from the full product set (not listedProducts) so a menu-only item
 * like bamboo-flower-sticks can appear here while staying out of the catalog.
 */
export const megaProducts = megaOrder
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p));

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
