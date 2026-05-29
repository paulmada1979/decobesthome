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
    image: "/images/Bamboo-room-divider-1024x576.webp",
    href: "https://decobesthome.com/why-bamboo-belongs-in-every-european-home-in-2025/",
    date: "2025-07-01",
    category: "materials",
    images: [
      "/images/moso-bamboo-for-home-decor-1024x574.jpg",
      "/images/bamboo-poles-for-home-1024x574.webp",
      "/images/Moso-bamboo-for-interior-decoration.webp",
    ],
  },
  {
    id: "jiangxi-gui-bamboo",
    slug: "jiangxi-gui-bamboo",
    image: "/images/7.12-1024x576.webp",
    href: "https://decobesthome.com/jiangxi-gui-bamboo-the-southern-powerhouse-of-sustainable-construction/",
    date: "2025-07-01",
    category: "sustainability",
    images: [
      "/images/giant-moso-bamboo-poles.webp",
      "/images/Moso-bamboo-chinese-factory.webp",
      "/images/moso-for-outdoor-construction-1024x574.webp",
    ],
  },
  {
    id: "choose-right-bamboo-fence",
    slug: "choose-right-bamboo-fence",
    image: "/images/garden-bamboo-fence-768x407-1.webp",
    href: "https://decobesthome.com/how-to-choose-the-right-bamboo-fence-for-your-outdoor-space/",
    date: "2025-04-01",
    category: "buying-guides",
    images: [
      "/images/natural-bamboo-fence-1.webp",
      "/images/garden-bamboo-fence.webp",
      "/images/natural-bamboo-fence-2.webp",
    ],
  },
  {
    id: "clean-bamboo-fence",
    slug: "clean-bamboo-fence",
    image: "/images/2.jpg",
    href: "https://decobesthome.com/how-to-clean-a-dirty-bamboo-fence-and-maintain-it/",
    date: "2025-04-01",
    category: "care",
    images: [
      "/images/natural-bamboo-fence-2.webp",
      "/images/garden-bamboo-fence.webp",
    ],
  },
  {
    id: "moso-poles-uses",
    slug: "moso-poles-uses",
    image: "/images/moso-bamboo-projects-768x497-1.webp",
    href: "https://decobesthome.com/versatile-uses-of-moso-bamboo-poles-for-home-and-garden-enhancements/",
    date: "2025-04-01",
    category: "materials",
    images: [
      "/images/moso-for-outdoor-pergola.webp",
      "/images/giant-moso-bamboo-poles.webp",
      "/images/moso-bamboo-for-wall-cladding-1024x574.webp",
    ],
  },
  {
    id: "moso-characteristics-architecture",
    slug: "moso-characteristics-architecture",
    image: "/images/5-768x512-detail1.jpg",
    href: "https://decobesthome.com/the-characteristics-of-moso-bamboo-and-its-wide-application-in-architecture-decoration/",
    date: "2025-04-01",
    category: "materials",
    images: [
      "/images/moso-bamboo-projects.webp",
      "/images/moso-outdoor-constructions-2-1024x574.webp",
      "/images/moso-bamboo-for-home-decor-1024x574.jpg",
    ],
  },
  {
    id: "reed-fence-privacy",
    slug: "reed-fence-privacy",
    image: "/images/reed-fence-garden-2.webp",
    href: "https://decobesthome.com/the-benefits-of-using-reed-fences-for-privacy-in-your-garden/",
    date: "2025-07-01",
    category: "buying-guides",
    images: [
      "/images/reed-fence-garden-3-1024x574-3.webp",
      "/images/reed-fence-garden-4.webp",
      "/images/reed-fence-balcony-2.webp",
    ],
  },
  {
    id: "palm-thatch-roof-panels",
    slug: "palm-thatch-roof-panels",
    image: "/images/1.2.jpg",
    href: "https://decobesthome.com/the-timeless-charm-of-natural-palm-thatch-roof-panels/",
    date: "2025-05-01",
    category: "materials",
    images: [
      "/images/thatch-roof-palapa-1.webp",
      "/images/thatch-roof-umbrella.webp",
      "/images/thatch-roofing.webp",
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
