export type Post = {
  id: string;
  image: string;
  /** External article URL (old WordPress site). */
  href: string;
  /** ISO date for sorting / <time>. */
  date: string;
  readMins?: number;
  featured?: boolean;
  /** Filter category key, maps to messages journal.filters.{category}. */
  category: string;
};

/** Journal entries. Titles/excerpts/category labels live in messages journal.posts.{id}. */
export const posts: Post[] = [
  {
    id: "china-reed-screen-exports",
    image: "/images/5.webp",
    href: "https://decobesthome.com/how-china-became-the-global-leader-in-reed-screen-exports/",
    date: "2025-11-01",
    readMins: 6,
    featured: true,
    category: "industry",
  },
  {
    id: "bamboo-european-home-2025",
    image: "/images/Bamboo-room-divider-1024x576.webp",
    href: "https://decobesthome.com/why-bamboo-belongs-in-every-european-home-in-2025/",
    date: "2025-07-01",
    category: "materials",
  },
  {
    id: "jiangxi-gui-bamboo",
    image: "/images/7.12-1024x576.webp",
    href: "https://decobesthome.com/jiangxi-gui-bamboo-the-southern-powerhouse-of-sustainable-construction/",
    date: "2025-07-01",
    category: "sustainability",
  },
  {
    id: "choose-right-bamboo-fence",
    image: "/images/garden-bamboo-fence-768x407-1.webp",
    href: "https://decobesthome.com/how-to-choose-the-right-bamboo-fence-for-your-outdoor-space/",
    date: "2025-04-01",
    category: "buying-guides",
  },
  {
    id: "clean-bamboo-fence",
    image: "/images/2.jpg",
    href: "https://decobesthome.com/how-to-clean-a-dirty-bamboo-fence-and-maintain-it/",
    date: "2025-04-01",
    category: "care",
  },
  {
    id: "moso-poles-uses",
    image: "/images/moso-bamboo-projects-768x497-1.webp",
    href: "https://decobesthome.com/versatile-uses-of-moso-bamboo-poles-for-home-and-garden-enhancements/",
    date: "2025-04-01",
    category: "materials",
  },
  {
    id: "moso-characteristics-architecture",
    image: "/images/5-768x512-detail1.jpg",
    href: "https://decobesthome.com/the-characteristics-of-moso-bamboo-and-its-wide-application-in-architecture-decoration/",
    date: "2025-04-01",
    category: "materials",
  },
  {
    id: "reed-fence-privacy",
    image: "/images/reed-fence-garden-2.webp",
    href: "https://decobesthome.com/the-benefits-of-using-reed-fences-for-privacy-in-your-garden/",
    date: "2025-07-01",
    category: "buying-guides",
  },
  {
    id: "palm-thatch-roof-panels",
    image: "/images/1.2.jpg",
    href: "https://decobesthome.com/the-timeless-charm-of-natural-palm-thatch-roof-panels/",
    date: "2025-05-01",
    category: "materials",
  },
];

export const featuredPost = posts.find((p) => p.featured)!;
export const gridPosts = posts.filter((p) => !p.featured);

/** Filter chip keys, map to messages journal.filters.{key}. */
export const journalFilters = [
  "all",
  "buying-guides",
  "care",
  "materials",
  "sustainability",
  "industry",
] as const;
