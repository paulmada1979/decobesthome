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
  /** Whether the product has the rich detail content block in messages.products.detail.{id}. */
  hasDetail?: boolean;
  /** Render the long-form "about" text section (messages.products.detail.items.{id}.about). */
  hasAbout?: boolean;
  /** Render the variations grid (messages.products.detail.items.{id}.variations); images under /images/tonkin etc. */
  hasVariations?: boolean;
  /** Folder under /images that holds this product's variation thumbnails. */
  variationDir?: string;
  /** Optional size chart rows (length + diameter range). Labels live in messages. */
  sizeChart?: { len: string; dia: string }[];
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
    image: "/images/tonkin-hero.webp",
    icon: "🎋",
    tag: "bestseller",
    hasAbout: true,
    hasVariations: true,
    hasGrades: true,
    variationDir: "tonkin",
    gallery: ["/images/tonkin-hero.webp", "/images/tonkin-support.webp"],
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
    image: "/images/moso-hero.webp",
    icon: "🟫",
    tag: "bestseller",
    hasAbout: true,
    hasVariations: true,
    variationDir: "moso",
    gallery: [
      "/images/moso-hero.webp",
      "/images/moso/scene-2.webp",
      "/images/moso/scene-16.webp",
      "/images/moso/scene-17.webp",
      "/images/moso/scene-5.webp",
    ],
    showcasePhotos: [
      "/images/moso/scene-14.webp",
      "/images/moso/scene-18.webp",
      "/images/moso/scene-19.webp",
      "/images/moso/scene-20.webp",
      "/images/moso/scene-12.webp",
      "/images/moso/scene-4.webp",
    ],
  },
  {
    id: "bamboo-fencing-edging",
    slug: "bamboo-fencing-edging",
    image: "/images/sy_natural-bamboo-fencing-for-home-privacy-300x300.jpg",
    icon: "🌿",
    tag: "bestseller",
    hasDetail: true,
    gallery: [
      "/images/natural-bamboo-fence-1.webp",
      "/images/sy_natural-bamboo-fencing-for-home-privacy-300x300.jpg",
      "/images/sy_fixed-natural-black-bamboo-fence-screening-300x300.jpg",
      "/images/6.jpg",
    ],
  },
  {
    id: "bamboo-fence-panels",
    slug: "bamboo-fence-panels",
    image: "/images/sy_fixed-natural-black-bamboo-fence-screening-300x300.jpg",
    icon: "▦",
  },
  {
    id: "bamboo-household-articles",
    slug: "bamboo-household-articles",
    image: "/images/Bamboo-room-divider-1024x576.webp",
    icon: "🧺",
  },
  {
    id: "bamboo-flower-sticks",
    slug: "bamboo-flower-sticks",
    image: "/images/sy_bamboo-canes-300x300.jpg",
    icon: "🪴",
  },
  {
    id: "bamboo-plywood",
    slug: "bamboo-plywood",
    image: "/images/moso-bamboo-for-wall-cladding-1024x574.webp",
    icon: "🟤",
  },
  {
    id: "reed-fencing",
    slug: "reed-fencing",
    image: "/images/sy_reed-fence-garden-screening-1-300x300.jpg",
    icon: "▤",
    tag: "popular",
  },
  {
    id: "other-natural-fencing",
    slug: "other-natural-fencing",
    image: "/images/sy_willow-fence-for-outside-screen-300x300.jpg",
    icon: "🍃",
  },
  {
    id: "natural-thatch-roof",
    slug: "natural-thatch-roof",
    image: "/images/natural-thatch-roof-300x300.webp",
    icon: "🌾",
  },
  {
    id: "artificial-fence-rolls",
    slug: "artificial-fence-rolls",
    image: "/images/sy_artificial-ivy-leaf-leaf-hedge-panel-300x300.jpg",
    icon: "🟩",
  },
  {
    id: "artificial-green-wall-panels",
    slug: "artificial-green-wall-panels",
    image: "/images/sy_Artificial-simulation-boxwood-hedge-mat-panel-300x300.jpg",
    icon: "🟩",
  },
];

/** First 10 ranges are shown in the header mega menu. */
export const megaProducts = products.slice(0, 10);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
