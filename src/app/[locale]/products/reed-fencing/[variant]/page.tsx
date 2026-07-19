import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { reedVariants, getReedVariant } from "@/lib/reedVariants";
import { company } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ProductGallery from "@/components/ProductGallery";
import QuoteButton from "@/components/QuoteButton";

export function generateStaticParams() {
  return reedVariants.map((x) => ({ variant: x.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; variant: string }>;
}): Promise<Metadata> {
  const { locale, variant } = await params;
  const rv = getReedVariant(variant);
  if (!rv) return {};
  const t = await getTranslations({ locale, namespace: "products.reed" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  const lead = t(`variants.${rv.id}.lead`);
  const tail = tm("descTag");
  const description =
    lead.length < 110 && lead.length + tail.length + 1 <= 160 ? `${lead} ${tail}` : lead;
  const path = `/products/reed-fencing/${variant}`;
  const canonical = locale === "en" ? path : `/${locale}${path}`;
  return {
    title: t(`variants.${rv.id}.name`),
    description,
    alternates: { canonical },
    openGraph: { url: canonical },
  };
}

type Block = { p: string } | { h2: string } | { h3: string } | { ul: string[] };
type Faq = { q: string; a: string };

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

export default async function ReedVariantPage({
  params,
}: {
  params: Promise<{ locale: string; variant: string }>;
}) {
  const { locale, variant } = await params;
  const rv = getReedVariant(variant);
  if (!rv) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("products.reed");
  const td = await getTranslations("products.detail");
  const tn = await getTranslations("products.names");

  const name = t(`variants.${rv.id}.name`);
  const spec = t.raw(`variants.${rv.id}.spec`) as { k: string; v: string }[];
  const facts = t.raw(`variants.${rv.id}.facts`) as { k: string; v: string }[];
  const faqs = t.raw(`variants.${rv.id}.faq`) as Faq[];
  const siblings = reedVariants.filter((x) => x.id !== rv.id);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={rv.hero} alt={name} />
        </div>
        <div className="container inner">
          <p className="crumbs">
            <Link href="/">{td("crumbHome")}</Link> &nbsp;/&nbsp;{" "}
            <Link href="/products">{td("crumbProducts")}</Link> &nbsp;/&nbsp;{" "}
            <Link href="/products/reed-fencing">{tn("reed-fencing")}</Link> &nbsp;/&nbsp; {name}
          </p>
          <p className="eyebrow" style={{ color: "var(--leaf)" }}>
            {t(`variants.${rv.id}.eyebrow`)}
          </p>
          <h1
            className="display"
            style={{ color: "#fff", fontSize: "clamp(2.4rem,4.6vw,4.2rem)", maxWidth: "18ch" }}
          >
            {name}
          </h1>
          <p className="lead" style={{ color: "rgba(246,243,236,.9)", maxWidth: "54ch", marginTop: "18px" }}>
            {t(`variants.${rv.id}.lead`)}
          </p>
        </div>
      </section>

      {/* DETAIL */}
      <section className="section">
        <div className="container split" style={{ alignItems: "flex-start" }}>
          <Reveal>
            <ProductGallery images={rv.gallery} alt={name} />
          </Reveal>

          <Reveal delay={1}>
            <div className="pill">{t(`variants.${rv.id}.pill`)}</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.9rem,3vw,2.6rem)", marginTop: "16px" }}>
              {name}
            </h2>
            <p className="muted pretty" style={{ marginTop: "14px" }}>
              {t(`variants.${rv.id}.desc`)}
            </p>

            <h4 className="h4" style={{ marginTop: "26px" }}>
              {t("shared.factsTitle")}
            </h4>
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

            <p className="pretty" style={{ marginTop: "20px", padding: "16px 18px", background: "var(--bone-2)", borderRadius: "14px", fontSize: ".95rem", lineHeight: 1.6 }}>
              <strong>{t("shared.whyTitle")}: </strong>
              {t(`variants.${rv.id}.why`)}
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "26px" }}>
              <QuoteButton className="btn btn-leaf btn-lg" product={name}>
                {td("ctaQuote")} <span className="arr">→</span>
              </QuoteButton>
              <a className="btn btn-ghost btn-lg" href={`mailto:${company.email}`}>
                {td("ctaEmail")}
              </a>
            </div>

            <table className="spec" style={{ marginTop: "30px" }}>
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

      {/* ABOUT */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal as="div" className="article" style={{ marginInline: 0 }}>
            <p className="eyebrow">{t(`variants.${rv.id}.about.eyebrow`)}</p>
            <h2 className="h2" style={{ marginTop: "14px", marginBottom: "4px", fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>
              {t(`variants.${rv.id}.about.title`)}
            </h2>
            {(t.raw(`variants.${rv.id}.about.body`) as Block[]).map(renderBlock)}
          </Reveal>
        </div>
      </section>

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

      {/* SERIES — the other reed fences */}
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
              <Link className="btn btn-ghost" href="/products/reed-fencing">
                {t("shared.series.overviewCta")} <span className="arr">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal as="div" className="var-grid" delay={1}>
            {siblings.map((s) => (
              <Link className="var-card" href={`/products/reed-fencing/${s.id}`} key={s.id}>
                <div className="ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={s.gallery[0]} alt={t(`variants.${s.id}.name`)} />
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
                  {td("cta.eyebrow")}
                </p>
                <h2 className="h2" style={{ color: "#fff", marginTop: "16px", maxWidth: "18ch" }}>
                  {td("cta.title")}
                </h2>
                <p className="lead" style={{ color: "rgba(246,243,236,.8)", marginTop: "16px", maxWidth: "48ch" }}>
                  {td("cta.lead")}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <QuoteButton className="btn btn-leaf btn-lg" product={name}>
                  {td("cta.ctaQuote")} <span className="arr">→</span>
                </QuoteButton>
                <a className="btn btn-on-dark btn-lg" href={`mailto:${company.email}`}>
                  {td("cta.ctaEmail", { email: company.email })}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
