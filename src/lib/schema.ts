// schema.org JSON-LD helpers (structured data for search engines and AI crawlers).
import { company, socials, socialsVisible, logos } from "@/lib/site";

export const BASE = "https://www.decobesthome.com";
export const ORG_ID = `${BASE}/#organization`;

/** Strip the LTR isolate marks used for display in site.ts. */
const plain = (s: string) => s.replace(/[⁦-⁩]/g, "");

export const abs = (path: string) => (path.startsWith("http") ? path : `${BASE}${path}`);

/** Locale-aware absolute URL ("en" has no prefix). */
export const localeUrl = (locale: string, path: string) =>
  `${BASE}${locale === "en" ? "" : `/${locale}`}${path === "/" && locale !== "en" ? "" : path}`;

export function organizationSchema(description?: string) {
  const sameAs = (Object.keys(socials) as (keyof typeof socials)[])
    .filter((k) => socialsVisible[k])
    .map((k) => socials[k]);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "BestHome",
    legalName: plain(company.legalName),
    url: BASE,
    logo: abs(logos.wordmark),
    image: abs("/og.jpg"),
    ...(description ? { description } : {}),
    email: company.email,
    telephone: plain(company.mobile),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Haijing Rd 278#, Haicang Bonded Port Zone",
      addressLocality: "Xiamen",
      addressRegion: "Fujian",
      postalCode: "361000",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: company.email,
        telephone: plain(company.mobile),
        availableLanguage: ["English", "Chinese"],
      },
    ],
    sameAs,
  };
}

export function websiteSchema(locale: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name,
    url: BASE,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  url: string;
  images: string[];
  category?: string;
  properties?: { k: string; v: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: [...new Set(opts.images)].map(abs),
    brand: { "@type": "Brand", name: "BestHome" },
    manufacturer: { "@id": ORG_ID },
    ...(opts.category ? { category: opts.category } : {}),
    ...(opts.properties?.length
      ? {
          additionalProperty: opts.properties.map((p) => ({
            "@type": "PropertyValue",
            name: p.k,
            value: p.v,
          })),
        }
      : {}),
  };
}

export function itemListSchema(name: string, items: { name: string; url?: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { url: it.url } : {}),
      ...(it.image ? { image: abs(it.image) } : {}),
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
