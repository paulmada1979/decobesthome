import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listedProducts, megaProducts } from "@/lib/products";
import { reedVariants } from "@/lib/reedVariants";
import { posts } from "@/lib/posts";

const BASE = "https://decobesthome.com";
const { locales, defaultLocale } = routing;

// localePrefix is "as-needed": the default locale (en) has no /en prefix.
function urlFor(locale: string, path: string) {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE}${prefix}${path}` || BASE;
}

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];
type Entry = { path: string; priority: number; changeFrequency: ChangeFreq };

export default function sitemap(): MetadataRoute.Sitemap {
  // Only publicly reachable product pages (catalog + mega menu).
  const productSlugs = Array.from(
    new Set([...listedProducts, ...megaProducts].map((p) => p.slug)),
  );

  const entries: Entry[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/inspiration", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    ...productSlugs.map((s) => ({
      path: `/products/${s}`,
      priority: 0.8,
      changeFrequency: "monthly" as ChangeFreq,
    })),
    ...reedVariants.map((v) => ({
      path: `/products/reed-fencing/${v.id}`,
      priority: 0.7,
      changeFrequency: "monthly" as ChangeFreq,
    })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      priority: 0.5,
      changeFrequency: "monthly" as ChangeFreq,
    })),
  ];

  const lastModified = new Date();

  return entries.flatMap(({ path, priority, changeFrequency }) => {
    // hreflang alternates: every locale + x-default (→ en).
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = urlFor(l, path);
    languages["x-default"] = urlFor(defaultLocale, path);

    return locales.map((locale) => ({
      url: urlFor(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
