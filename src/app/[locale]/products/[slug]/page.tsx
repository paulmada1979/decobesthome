import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products, getProduct } from "@/lib/products";
import { company } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ProductGallery from "@/components/ProductGallery";
import Chips from "@/components/Chips";
import QuoteButton from "@/components/QuoteButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const tn = await getTranslations({ locale, namespace: "products.names" });
  const td = await getTranslations({ locale, namespace: "products.detail" });
  return {
    title: `${tn(product.id)} — BestHome`,
    description: td(`items.${product.id}.lead`),
  };
}

const ArrowOut = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 17L17 7M17 7H8M17 7v9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("products.detail");
  const tn = await getTranslations("products.names");

  const name = tn(product.id);
  const heroImage = product.gallery?.[0] || product.image || "/images/natural-bamboo-fence-1.webp";
  const galleryImages = product.gallery ?? (product.image ? [product.image] : []);
  const spec = t.raw(`items.${product.id}.spec`) as { k: string; v: string }[];

  const related = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3)
    .map((p) => ({ ...p, order: products.findIndex((x) => x.id === p.id) + 1 }));

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt={name} />
        </div>
        <div className="container inner">
          <p className="crumbs">
            <Link href="/">{t("crumbHome")}</Link> &nbsp;/&nbsp;{" "}
            <Link href="/products">{t("crumbProducts")}</Link> &nbsp;/&nbsp; {name}
          </p>
          <p className="eyebrow" style={{ color: "var(--leaf)" }}>
            {t(`items.${product.id}.eyebrow`)}
          </p>
          <h1
            className="display"
            style={{ color: "#fff", fontSize: "clamp(2.6rem,5vw,4.6rem)", maxWidth: "16ch" }}
          >
            {name}
          </h1>
          <p className="lead" style={{ color: "rgba(246,243,236,.9)", maxWidth: "54ch", marginTop: "18px" }}>
            {t(`items.${product.id}.lead`)}
          </p>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      <section className="section">
        <div className="container split" style={{ alignItems: "flex-start" }}>
          <Reveal>
            {galleryImages.length > 0 ? (
              <ProductGallery images={galleryImages} alt={name} />
            ) : (
              <div className="media" style={{ display: "grid", placeItems: "center", aspectRatio: "4 / 3.2", background: "var(--bone-2)" }}>
                <span style={{ fontSize: "5rem", opacity: 0.5 }}>{product.icon}</span>
              </div>
            )}
          </Reveal>

          <Reveal delay={1}>
            <div className="pill">{t(`items.${product.id}.pill`)}</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.9rem,3vw,2.6rem)", marginTop: "16px" }}>
              {t(`items.${product.id}.name`)}
            </h2>
            <p className="muted pretty" style={{ marginTop: "14px" }}>
              {t(`items.${product.id}.desc`)}
            </p>

            {product.hasDetail && (
              <>
                <h4 className="h4" style={{ marginTop: "28px" }}>
                  {t(`items.${product.id}.finishLabel`)}
                </h4>
                <Chips options={t.raw(`items.${product.id}.finishes`) as string[]} defaultActive={0} />
                <h4 className="h4" style={{ marginTop: "22px" }}>
                  {t(`items.${product.id}.heightLabel`)}
                </h4>
                <Chips options={t.raw(`items.${product.id}.heights`) as string[]} defaultActive={1} />
              </>
            )}

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "30px" }}>
              <QuoteButton className="btn btn-leaf btn-lg" product={name}>
                {t("ctaQuote")} <span className="arr">→</span>
              </QuoteButton>
              <a className="btn btn-ghost btn-lg" href={`mailto:${company.email}`}>
                {t("ctaEmail")}
              </a>
            </div>

            <table className="spec" style={{ marginTop: "34px" }}>
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

      {/* RELATED */}
      <section className="section" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="sec-head">
            <Reveal>
              <p className="eyebrow">{t("related.eyebrow")}</p>
              <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>
                {t("related.title")}
              </h2>
            </Reveal>
            <Reveal as="span" delay={1}>
              <Link className="btn btn-ghost" href="/products">
                {t("related.all")} <span className="arr">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal className="cards">
            {related.map((p) => (
              <Link key={p.id} className="card" href={`/products/${p.slug}`}>
                <div className={`ph${p.image ? "" : " is-ph"}`}>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={tn(p.id)} />
                  ) : (
                    <span className="ph-mark" style={{ fontSize: "3rem" }}>
                      {p.icon}
                    </span>
                  )}
                </div>
                <div className="body">
                  <div>
                    <div className="num">{String(p.order).padStart(2, "0")}</div>
                    <div className="h4">{tn(p.id)}</div>
                  </div>
                  <span className="go">
                    <ArrowOut />
                  </span>
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
                <QuoteButton className="btn btn-leaf btn-lg" product={name}>
                  {t("cta.ctaQuote")} <span className="arr">→</span>
                </QuoteButton>
                <a className="btn btn-on-dark btn-lg" href={`mailto:${company.email}`}>
                  {t("cta.ctaEmail", { email: company.email })}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
