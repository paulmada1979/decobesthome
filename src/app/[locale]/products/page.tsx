import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products } from "@/lib/products";
import Reveal from "@/components/Reveal";
import CategoryCard from "@/components/CategoryCard";
import QuoteButton from "@/components/QuoteButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products.index.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products.index");
  const tn = await getTranslations("products.names");
  const tt = await getTranslations("products.tags");

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/products-hero.webp" alt={t("hero.imageAlt")} />
        </div>
        <div className="container inner">
          <p className="crumbs">
            <Link href="/">{t("hero.crumbHome")}</Link> &nbsp;/&nbsp; {t("hero.crumb")}
          </p>
          <p className="eyebrow" style={{ color: "var(--leaf)" }}>
            {t("hero.eyebrow")}
          </p>
          <h1
            className="display"
            style={{ color: "#fff", fontSize: "clamp(2.6rem,5vw,4.6rem)", maxWidth: "18ch" }}
          >
            {t("hero.title")}
          </h1>
          <p className="lead" style={{ color: "rgba(246,243,236,.9)", maxWidth: "54ch", marginTop: "18px" }}>
            {t("hero.lead")}
          </p>
        </div>
      </section>

      {/* CATALOG */}
      <section className="section">
        <div className="container">
          <div className="cards">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i % 3}>
                <CategoryCard
                  product={p}
                  index={i}
                  name={tn(p.id)}
                  tagLabel={p.tag ? tt(p.tag) : undefined}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section--tight">
        <div className="container">
          <Reveal className="cta-band">
            <span className="leaf-mark">
              <svg width="280" height="280" viewBox="0 0 24 24" fill="none">
                <path d="M12 3c0 8-6 10-6 15a6 6 0 0012 0c0-5-6-7-6-15z" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div>
                <p className="eyebrow" style={{ color: "var(--leaf)" }}>
                  {t("cta.eyebrow")}
                </p>
                <h2 className="h2" style={{ color: "#fff", marginTop: "16px", maxWidth: "18ch" }}>
                  {t("cta.title")}
                </h2>
                <p className="lead" style={{ color: "rgba(246,243,236,.8)", marginTop: "16px", maxWidth: "48ch" }}>
                  {t("cta.lead")}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <QuoteButton className="btn btn-leaf btn-lg">
                  {t("cta.ctaQuote")} <span className="arr">→</span>
                </QuoteButton>
                <Link className="btn btn-on-dark btn-lg" href="/contact">
                  {t("cta.ctaContact")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
