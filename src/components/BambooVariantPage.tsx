import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/site";
import { type BambooSeries, variantImages } from "@/lib/bambooVariants";
import Reveal from "@/components/Reveal";
import ProductGallery from "@/components/ProductGallery";
import ShowcaseLightbox from "@/components/ShowcaseLightbox";
import QuoteButton from "@/components/QuoteButton";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { productSchema, breadcrumbSchema, localeUrl } from "@/lib/schema";

type KV = { k: string; v: string };
type Block = { p: string } | { h2: string } | { h3: string } | { ul: string[] };
type Faq = { q: string; a: string };
type Sizes = { title: string; lead: string; cols: string[]; rows: string[][]; note: string };

function renderBlock(block: Block, i: number): ReactNode {
  if ("h2" in block) return <h2 key={i} className="h3">{block.h2}</h2>;
  if ("h3" in block) return <h3 key={i} className="h4">{block.h3}</h3>;
  if ("ul" in block)
    return (
      <ul key={i}>
        {block.ul.map((li, j) => (
          <li key={j}>{li}</li>
        ))}
      </ul>
    );
  return <p key={i}>{block.p}</p>;
}

export async function bambooVariantMetadata(
  series: BambooSeries,
  locale: string,
  variant: string,
): Promise<Metadata> {
  const v = series.variants.find((x) => x.id === variant);
  if (!v) return {};
  const t = await getTranslations({ locale, namespace: `products.${series.ns}` });
  const tm = await getTranslations({ locale, namespace: "meta" });
  const lead = t(`variants.${v.id}.lead`);
  const tail = tm("descTag");
  const description =
    lead.length < 110 && lead.length + tail.length + 1 <= 160 ? `${lead} ${tail}` : lead;
  const path = `/products/${series.parent}/${v.id}`;
  const canonical = locale === "en" ? path : `/${locale}${path}`;
  const img = variantImages(v.id).hero;
  return {
    title: t(`variants.${v.id}.metaTitle`),
    description,
    alternates: { canonical },
    openGraph: { url: canonical, images: [{ url: img }] },
  };
}

export default async function BambooVariantPage({
  series,
  locale,
  variant,
}: {
  series: BambooSeries;
  locale: string;
  variant: string;
}) {
  const v = series.variants.find((x) => x.id === variant);
  if (!v) notFound();
  setRequestLocale(locale);

  const t = await getTranslations(`products.${series.ns}`);
  const td = await getTranslations("products.detail");
  const tn = await getTranslations("products.names");

  const imgs = variantImages(v.id);
  const key = `variants.${v.id}`;
  const name = t(`${key}.name`);
  const parentName = tn(series.parent);
  const facts = t.raw(`${key}.facts`) as KV[];
  const spec = t.raw(`${key}.spec`) as KV[];
  const sizes = t.raw(`${key}.sizes`) as Sizes;
  const faqs = t.raw(`${key}.faq`) as Faq[];
  const siblings = series.variants.filter((x) => x.id !== v.id);

  const pageUrl = localeUrl(locale, `/products/${series.parent}/${v.id}`);
  const jsonLd = [
    productSchema({
      name,
      description: `${t(`${key}.lead`)} ${t(`${key}.desc`)}`,
      url: pageUrl,
      images: [imgs.hero, ...imgs.gallery],
      category: parentName,
      properties: [...facts, ...spec],
    }),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbSchema([
      { name: td("crumbHome"), url: localeUrl(locale, "/") },
      { name: td("crumbProducts"), url: localeUrl(locale, "/products") },
      { name: parentName, url: localeUrl(locale, `/products/${series.parent}`) },
      { name, url: pageUrl },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs.hero} alt={name} />
        </div>
        <div className="container inner">
          <p className="crumbs">
            <Link href="/">{td("crumbHome")}</Link> &nbsp;/&nbsp;{" "}
            <Link href="/products">{td("crumbProducts")}</Link> &nbsp;/&nbsp;{" "}
            <Link href={`/products/${series.parent}`}>{parentName}</Link> &nbsp;/&nbsp; {name}
          </p>
          <p className="eyebrow" style={{ color: "var(--leaf)" }}>
            {t(`${key}.eyebrow`)}
          </p>
          <h1
            className="display"
            style={{ color: "#fff", fontSize: "clamp(2.4rem,4.6vw,4.2rem)", maxWidth: "18ch" }}
          >
            {name}
          </h1>
          <p className="lead" style={{ color: "rgba(246,243,236,.9)", maxWidth: "54ch", marginTop: "18px" }}>
            {t(`${key}.lead`)}
          </p>
        </div>
      </section>

      {/* DETAIL */}
      <section className="section">
        <div className="container split" style={{ alignItems: "flex-start" }}>
          <Reveal>
            <ProductGallery images={imgs.gallery.length ? imgs.gallery : [imgs.hero]} alt={name} fit="contain" />
          </Reveal>

          <Reveal delay={1}>
            <div className="pill">{t(`${key}.pill`)}</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.9rem,3vw,2.6rem)", marginTop: "16px" }}>
              {name}
            </h2>
            <p className="muted pretty" style={{ marginTop: "14px" }}>
              {t(`${key}.desc`)}
            </p>

            <h3 className="h4" style={{ marginTop: "26px" }}>
              {t("shared.factsTitle")}
            </h3>
            <table className="spec" style={{ marginTop: "12px" }}>
              <tbody>
                {facts.map((row) => (
                  <tr key={row.k}>
                    <th>{row.k}</th>
                    <td>{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "26px" }}>
              <QuoteButton className="btn btn-leaf btn-lg" product={name}>
                {td("ctaQuote")} <span className="arr">→</span>
              </QuoteButton>
              <a className="btn btn-ghost btn-lg" href={`mailto:${company.email}`}>
                {td("ctaEmail")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY + FULL SPEC — single column under the gallery */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal style={{ maxWidth: "960px" }}>
            <p className="pretty" style={{ margin: 0, padding: "16px 18px", background: "var(--bone-2)", borderRadius: "14px", fontSize: ".95rem", lineHeight: 1.6 }}>
              <strong>{t("shared.whyTitle")}: </strong>
              {t(`${key}.why`)}
            </p>
            <table className="spec" style={{ marginTop: "24px" }}>
              <tbody>
                {spec.map((row) => (
                  <tr key={row.k}>
                    <th>{row.k}</th>
                    <td>{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>


      {/* SIZES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal style={{ maxWidth: "62ch" }}>
            <p className="eyebrow">{t("shared.sizesEyebrow")}</p>
            <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>
              {sizes.title}
            </h2>
            <p className="lead pretty" style={{ marginTop: "12px" }}>
              {sizes.lead}
            </p>
          </Reveal>
          <Reveal as="div" className="size-chart-wrap" delay={1}>
            <table className="size-chart">
              <thead>
                <tr>
                  {sizes.cols.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="muted" style={{ marginTop: "14px", fontSize: ".86rem" }}>
            {sizes.note}
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal as="div" className="article" style={{ marginInline: 0 }}>
            <p className="eyebrow">{t(`${key}.about.eyebrow`)}</p>
            <h2 className="h2" style={{ marginTop: "14px", marginBottom: "4px", fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>
              {t(`${key}.about.title`)}
            </h2>
            {(t.raw(`${key}.about.body`) as Block[]).map(renderBlock)}
          </Reveal>
        </div>
      </section>

      {/* QUALITY CONTROL (factory photos) */}
      {imgs.qc.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal style={{ maxWidth: "62ch" }}>
              <p className="eyebrow">{t("shared.qcEyebrow")}</p>
              <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>
                {t("shared.qcTitle")}
              </h2>
              <p className="lead pretty" style={{ marginTop: "12px" }}>
                {t("shared.qcLead")}
              </p>
            </Reveal>
            <Reveal delay={1}>
              <ShowcaseLightbox
                images={imgs.qc.map((src, i) => ({ src, label: `${name} · QC ${i + 1}` }))}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <Reveal style={{ maxWidth: "62ch" }}>
            <p className="eyebrow">{t("shared.faqEyebrow")}</p>
            <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
              {t("shared.faqTitle")}
            </h2>
          </Reveal>
          <Reveal as="div" className="faq-list" delay={1}>
            {faqs.map((f) => (
              <div className="faq-item" key={f.q}>
                <h3 className="h4">{f.q}</h3>
                <p className="muted pretty">{f.a}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PACKING */}
      <section className="section">
        <div className="container">
          <Reveal style={{ maxWidth: "62ch" }}>
            <p className="eyebrow">{t("shared.packing.eyebrow")}</p>
            <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>
              {t("shared.packing.title")}
            </h2>
            <p className="lead pretty" style={{ marginTop: "12px" }}>
              {t("shared.packing.lead")}
            </p>
          </Reveal>
          <Reveal as="div" className="grade-grid" delay={1}>
            {(t.raw("shared.packing.options") as { t: string; d: string }[]).map((o, i) => (
              <div className="grade-card" key={o.t}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h4">{o.t}</h3>
                <p className="muted">{o.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SERIES — the other pages in this range */}
      <section className="section" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="sec-head">
            <Reveal>
              <p className="eyebrow">{t("shared.series.eyebrow")}</p>
              <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
                {t("shared.series.title")}
              </h2>
            </Reveal>
            <Reveal as="span" delay={1}>
              <Link className="btn btn-ghost" href={`/products/${series.parent}`}>
                {t("shared.series.overviewCta")} <span className="arr">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal as="div" className="var-grid" delay={1}>
            {siblings.map((s) => (
              <Link className="var-card var-card--link" href={`/products/${series.parent}/${s.id}`} key={s.id}>
                <div className="ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    src={`/images/${series.key === "fence" ? "fence" : "panels"}/${s.card}`}
                    alt={t(`variants.${s.id}.name`)}
                  />
                </div>
                <div className="body">
                  <h3 className="h4">{t(`variants.${s.id}.name`)}</h3>
                  <p className="muted">{t(`variants.${s.id}.cardDesc`)}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand ns="products.detail" />
    </>
  );
}
