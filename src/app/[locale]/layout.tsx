import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { cormorant, hanken } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteModalProvider } from "@/components/QuoteModalProvider";
import QuoteModal from "@/components/QuoteModal";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL("https://www.decobesthome.com"),
    title: {
      default: t("title"),
      template: `%s · ${t("brand")}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("brand"),
      locale,
      type: "website",
    },
    icons: { icon: "/logos/favicon.jpg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${cormorant.variable} ${hanken.variable}`}>
      <body>
        <NextIntlClientProvider>
          <QuoteModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <QuoteModal />
          </QuoteModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
