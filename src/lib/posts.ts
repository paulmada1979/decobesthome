export type Post = {
  id: string;
  /** URL slug for the internal detail page (/blog/{slug}). */
  slug: string;
  image: string;
  /** Original article URL on the old WordPress site (kept for reference). */
  href: string;
  /** ISO date for sorting / <time>. */
  date: string;
  readMins?: number;
  featured?: boolean;
  /** Filter category key, maps to messages journal.filters.{category}. */
  category: string;
  /** Supporting images interleaved through the article body (in order). */
  images?: string[];
};

/** Journal entries. Titles/excerpts/category labels live in messages journal.posts.{id}. */
export const posts: Post[] = [
  {
    id: "china-reed-screen-exports",
    slug: "china-reed-screen-exports",
    image: "/images/5.webp",
    href: "https://decobesthome.com/how-china-became-the-global-leader-in-reed-screen-exports/",
    date: "2025-11-01",
    readMins: 6,
    featured: true,
    category: "industry",
    images: [
      "/images/reed-fence-garden-3-1024x574-3.webp",
      "/images/reed-fence-garden-4.webp",
      "/images/moso-bamboo-supplier-1024x574.webp",
    ],
  },
  {
    id: "bamboo-european-home-2025",
    slug: "bamboo-european-home-2025",
    image: "/images/blog/bamboo-european-home-2025-hero.webp",
    href: "https://decobesthome.com/why-bamboo-belongs-in-every-european-home-in-2025/",
    date: "2025-07-01",
    category: "materials",
    images: [
      "/images/blog/bamboo-european-home-2025-1.webp",
      "/images/blog/bamboo-european-home-2025-2.webp",
      "/images/blog/bamboo-european-home-2025-3.webp",
    ],
  },
  {
    id: "jiangxi-gui-bamboo",
    slug: "jiangxi-gui-bamboo",
    image: "/images/blog/jiangxi-gui-bamboo-hero.webp",
    href: "https://decobesthome.com/jiangxi-gui-bamboo-the-southern-powerhouse-of-sustainable-construction/",
    date: "2025-07-01",
    category: "sustainability",
    images: [
      "/images/blog/jiangxi-gui-bamboo-1.webp",
      "/images/blog/jiangxi-gui-bamboo-2.webp",
      "/images/blog/jiangxi-gui-bamboo-3.webp",
    ],
  },
  {
    id: "choose-right-bamboo-fence",
    slug: "choose-right-bamboo-fence",
    image: "/images/blog/choose-right-bamboo-fence-hero.webp",
    href: "https://decobesthome.com/how-to-choose-the-right-bamboo-fence-for-your-outdoor-space/",
    date: "2025-04-01",
    category: "buying-guides",
    images: [
      "/images/blog/choose-right-bamboo-fence-1.webp",
    ],
  },
  {
    id: "clean-bamboo-fence",
    slug: "clean-bamboo-fence",
    image: "/images/blog/clean-bamboo-fence-hero.webp",
    href: "https://decobesthome.com/how-to-clean-a-dirty-bamboo-fence-and-maintain-it/",
    date: "2025-04-01",
    category: "care",
    images: [
      "/images/blog/clean-bamboo-fence-1.webp",
      "/images/blog/clean-bamboo-fence-2.webp",
      "/images/blog/clean-bamboo-fence-3.webp",
      "/images/blog/clean-bamboo-fence-4.webp",
    ],
  },
  {
    id: "moso-poles-uses",
    slug: "moso-poles-uses",
    image: "/images/blog/moso-poles-uses-hero.webp",
    href: "https://decobesthome.com/versatile-uses-of-moso-bamboo-poles-for-home-and-garden-enhancements/",
    date: "2025-04-01",
    category: "materials",
    images: [
      "/images/blog/moso-poles-uses-1.webp",
      "/images/blog/moso-poles-uses-2.webp",
      "/images/blog/moso-poles-uses-3.webp",
      "/images/blog/moso-poles-uses-4.webp",
    ],
  },
  {
    id: "moso-characteristics-architecture",
    slug: "moso-characteristics-architecture",
    image: "/images/blog/moso-characteristics-architecture-hero.webp",
    href: "https://decobesthome.com/the-characteristics-of-moso-bamboo-and-its-wide-application-in-architecture-decoration/",
    date: "2025-04-01",
    category: "materials",
    images: [
      "/images/blog/moso-characteristics-architecture-1.webp",
      "/images/blog/moso-characteristics-architecture-2.webp",
    ],
  },
  {
    id: "reed-fence-privacy",
    slug: "reed-fence-privacy",
    image: "/images/blog/reed-fence-privacy-hero.webp",
    href: "https://decobesthome.com/the-benefits-of-using-reed-fences-for-privacy-in-your-garden/",
    date: "2025-07-01",
    category: "buying-guides",
    images: [
      "/images/blog/reed-fence-privacy-1.webp",
      "/images/blog/reed-fence-privacy-2.webp",
    ],
  },
  {
    id: "palm-thatch-roof-panels",
    slug: "palm-thatch-roof-panels",
    image: "/images/blog/palm-thatch-roof-panels-hero.webp",
    href: "https://decobesthome.com/the-timeless-charm-of-natural-palm-thatch-roof-panels/",
    date: "2025-05-01",
    category: "materials",
    images: [
      "/images/blog/palm-thatch-roof-panels-1.webp",
      "/images/blog/palm-thatch-roof-panels-2.webp",
      "/images/blog/palm-thatch-roof-panels-3.webp",
      "/images/blog/palm-thatch-roof-panels-4.webp",
    ],
  },
];

export const featuredPost = posts.find((p) => p.featured)!;
export const gridPosts = posts.filter((p) => !p.featured);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Filter chip keys, map to messages journal.filters.{key}. */
export const journalFilters = [
  "all",
  "buying-guides",
  "care",
  "materials",
  "sustainability",
  "industry",
] as const;
