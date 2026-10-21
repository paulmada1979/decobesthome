import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listedProducts as products } from "@/lib/products";
import Reveal from "@/components/Reveal";
import CategoryCard from "@/components/CategoryCard";
import CtaBand from "@/components/CtaBand";
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
          <img src="/images/products-hero-w.webp" alt={t("hero.imageAlt")} />
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
      <CtaBand ns="products.index" />
    </>
  );
}
