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
};

/** Authoritative catalog order (12 ranges). Names live in messages products.names.{id}. */
export const products: Product[] = [
  {
    id: "tonkin-bamboo-canes",
    slug: "tonkin-bamboo-canes",
    image: "/images/sy_bamboo-canes-300x300.jpg",
    icon: "🎋",
    tag: "bestseller",
  },
  {
    id: "decor-moso-bamboo-poles",
    slug: "decor-moso-bamboo-poles",
    image: "/images/sy_MOSE-BAMBOO-POLES-FACTORY-300x300.jpg",
    icon: "🟫",
    tag: "bestseller",
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
    image: "",
    icon: "🧺",
    placeholder: true,
  },
  {
    id: "bamboo-flower-sticks",
    slug: "bamboo-flower-sticks",
    image: "",
    icon: "🪴",
    placeholder: true,
  },
  {
    id: "bamboo-plywood",
    slug: "bamboo-plywood",
    image: "",
    icon: "🟤",
    placeholder: true,
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
