import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl", "de", "es", "it", "fr", "ja", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
