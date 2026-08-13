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
  /** Draft: content stays in the repo but is hidden from the blog, sitemap and
   *  detail route until flipped off. Use while images/copy are being finalised. */
  draft?: boolean;
};

/** Journal entries. Titles/excerpts/category labels live in messages journal.posts.{id}. */
export const posts: Post[] = [
  {
    // Aug 2026 SEO series #6 — bamboo screening colour (natural/black/carbonised).
    id: "bamboo-screening-colour",
    slug: "bamboo-screening-colours",
    image: "/images/blog/bamboo-screening-colour-hero.webp",
    href: "https://www.decobesthome.com/blog/bamboo-screening-colours",
    date: "2026-08-20",
    readMins: 5,
    category: "fencing",
    images: [
      "/images/blog/bamboo-screening-colour-1.webp",
      "/images/blog/bamboo-screening-colour-2.webp",
    ],
  },
  {
    // Aug 2026 SEO series #5 — bamboo screening ideas (inspiration listicle).
    id: "bamboo-screening-ideas",
    slug: "bamboo-screening-ideas",
    image: "/images/blog/bamboo-screening-ideas-hero.webp",
    href: "https://www.decobesthome.com/blog/bamboo-screening-ideas",
    date: "2026-08-18",
    readMins: 6,
    category: "fencing",
    images: [
      "/images/blog/bamboo-screening-ideas-1.webp",
      "/images/blog/bamboo-screening-ideas-2.webp",
    ],
  },
  {
    // Aug 2026 SEO series #1. Placeholder images (swap with the generated
    // ChatGPT banner/support shots when ready).
    id: "attach-bamboo-screening-fence",
    slug: "how-to-attach-bamboo-screening-to-a-fence",
    image: "/images/bamboo-fence-hero.webp",
    href: "https://www.decobesthome.com/blog/how-to-attach-bamboo-screening-to-a-fence",
    date: "2026-08-04",
    readMins: 5,
    category: "fencing",
    draft: true,
    images: ["/images/fence/scene-garden.webp", "/images/fence/scene-natural.webp"],
  },
  {
    // Aug 2026 SEO series #2 — reed vs bamboo. Real generated images.
    id: "reed-vs-bamboo-screening",
    slug: "reed-vs-bamboo-screening",
    image: "/images/blog/reed-vs-bamboo-hero.webp",
    href: "https://www.decobesthome.com/blog/reed-vs-bamboo-screening",
    date: "2026-08-06",
    readMins: 5,
    category: "reed",
    images: ["/images/blog/reed-vs-bamboo-1.webp", "/images/blog/reed-vs-bamboo-2.webp"],
  },
  {
    id: "china-reed-screen-exports",
    slug: "china-reed-screen-exports",
    image: "/images/blog/china-reed-screen-exports-hero.webp",
    href: "https://decobesthome.com/how-china-became-the-global-leader-in-reed-screen-exports/",
    date: "2025-11-01",
    readMins: 6,
    featured: true,
    category: "reed",
    images: [
      "/images/blog/china-reed-screen-exports-1.webp",
      "/images/blog/china-reed-screen-exports-2.webp",
      "/images/blog/china-reed-screen-exports-3.webp",
    ],
  },
  {
    id: "bamboo-european-home-2025",
    slug: "bamboo-european-home-2025",
    image: "/images/blog/bamboo-european-home-2025-hero.webp",
    href: "https://decobesthome.com/why-bamboo-belongs-in-every-european-home-in-2025/",
    date: "2025-07-01",
    category: "fencing",
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
    category: "moso",
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
    category: "fencing",
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
    category: "fencing",
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
    category: "moso",
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
    category: "moso",
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
    category: "reed",
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
    category: "thatch",
    images: [
      "/images/blog/palm-thatch-roof-panels-1.webp",
      "/images/blog/palm-thatch-roof-panels-2.webp",
      "/images/blog/palm-thatch-roof-panels-3.webp",
      "/images/blog/palm-thatch-roof-panels-4.webp",
    ],
  },
];

/** Live posts only (drafts hidden), newest first by date. */
export const publishedPosts = [...posts.filter((p) => !p.draft)].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);

/** Newest post takes the big featured slot; the rest fill the grid (newest first).
 *  A new post automatically rotates onto the top and pushes the previous one down. */
export const featuredPost = publishedPosts[0];
export const gridPosts = publishedPosts.slice(1);

/** Detail lookup: finds drafts too, so a draft URL is previewable (the detail
 *  page marks drafts noindex; they stay out of the blog list and sitemap). */
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Filter chip keys, map to messages journal.filters.{key}. */
export const journalFilters = [
  "all",
  "fencing",
  "moso",
  "reed",
  "thatch",
] as const;
