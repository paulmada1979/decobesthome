// Wrap a phone number in Unicode isolate marks (LRI…PDI) so it always renders
// left-to-right, even when shown inside right-to-left (Arabic) text. Invisible in LTR.
const ltr = (s: string) => `⁦${s}⁩`;

export const company = {
  legalName: ltr("Xiamen BestHome Imp. & Exp. Co., Ltd."),
  email: "sales@decobesthome.com",
  mobile: ltr("+86 180 5926 5951"),
  mobileHref: "tel:+8618059265951",
  telFax: ltr("+86 592 5978725"),
  office: "Haijing Rd 278#, Haicang Bonded Port Zone, Xiamen, Fujian 361000, China",
  factory: "Yuting Town, Huangshan 245000, Anhui Province, China",
  loadingPort: "Xiamen, China",
} as const;

export const socials = {
  facebook: "https://www.facebook.com/profile.php?id=100066615552368",
  instagram: "https://www.instagram.com/decobesthome/",
  youtube: "https://www.youtube.com/@Mindydong168",
  linkedin: "https://www.linkedin.com/in/min-d-a3271617a/?originalSubdomain=cn",
} as const;

/** Which social icons are shown site-wide. YouTube & LinkedIn hidden until the
 *  channel/company account are properly set up — flip to true to re-enable. */
export const socialsVisible = {
  facebook: true,
  instagram: true,
  youtube: false,
  linkedin: false,
} as const;

export const logos = {
  wordmark: "/logos/logo-wordmark.png",
  wordmarkWhite: "/logos/logo-wordmark-white.png",
  favicon: "/logos/favicon.jpg",
} as const;

/** Primary nav items. `key` maps to messages `nav.{key}`. */
export const primaryNav = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products", hasMega: true },
  { key: "journal", href: "/blog" },
  { key: "inspiration", href: "/inspiration" },
  { key: "contact", href: "/contact" },
] as const;
