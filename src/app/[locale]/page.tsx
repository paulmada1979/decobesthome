import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/site";
import { listedProducts as products } from "@/lib/products";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CategoryCard from "@/components/CategoryCard";
import QuoteButton from "@/components/QuoteButton";

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 7L9 18l-5-5" stroke="#84BE45" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WHY_ICONS = [
  <path key="0" d="M12 21c5-2 8-6 8-12V5l-8-2-8 2v4c0 6 3 10 8 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  <path key="1" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  <path key="2" d="M6 3v18M18 3v18M6 8h12M6 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  <path key="3" d="M12 3c0 6-4 8-4 12a4 4 0 008 0c0-4-4-6-4-12z" stroke="currentColor" strokeWidth="1.5" />,
  <path key="4" d="M12 2v20M5 7l7-5 7 5M5 17l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
];

const TEASER = [
  { image: "/images/natural-bamboo-fence-1.webp", key: "bambooFence" },
  { image: "/images/sy_reed-fence-garden-screening-1-300x300.jpg", key: "reedScreening" },
  { image: "/images/6.jpg", key: "mosoPoles" },
  { image: "/images/sy_willow-fence-for-outside-screen-300x300.jpg", key: "willowScreen" },
  { image: "/images/natural-thatch-roof-300x300.webp", key: "thatchRoofing" },
  { image: "/images/sy_fixed-natural-black-bamboo-fence-screening-300x300.jpg", key: "blackBamboo" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tn = await getTranslations("products.names");
  const tt = await getTranslations("products.tags");

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home-hero.webp" alt={t("hero.imageAlt")} />
        </div>
        <div className="container inner">
          <Reveal as="p" className="eyebrow">
            {t("hero.eyebrow")}
          </Reveal>
          <Reveal as="h1" className="display balance" delay={1}>
            {t("hero.title")}
          </Reveal>
          <Reveal as="p" className="lead pretty" delay={2} style={{ marginTop: "22px" }}>
            {t("hero.lead")}
          </Reveal>
          <Reveal delay={3} style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "30px" }}>
            <QuoteButton className="btn btn-leaf btn-lg">
              {t("hero.ctaQuote")} <span className="arr">→</span>
            </QuoteButton>
            <a className="btn btn-on-dark btn-lg" href="#catalog">
              {t("hero.ctaExplore")}
            </a>
          </Reveal>
          <Reveal className="trust" delay={4} style={{ marginTop: "42px" }}>
            <span className="item">
              <Check /> {t("hero.trust1")}
            </span>
            <span className="item">
              <Check /> {t("hero.trust2")}
            </span>
            <span className="item">
              <Check /> {t("hero.trust3")}
            </span>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={t.raw("marquee") as string[]} />

      {/* BRAND INTRO */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">{t("intro.eyebrow")}</p>
            <h2 className="h2 balance" style={{ marginTop: "18px" }}>
              {t("intro.title")}
            </h2>
            <p className="lead pretty" style={{ marginTop: "22px" }}>
              {t("intro.p1")}
            </p>
            <p className="muted pretty" style={{ marginTop: "16px" }}>
              {t("intro.p2")}
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "28px" }}>
              <Link className="btn btn-dark" href="/about">
                {t("intro.ctaStory")} <span className="arr">→</span>
              </Link>
              <a className="textlink" href="#catalog" style={{ alignSelf: "center" }}>
                {t("intro.ctaBrowse")} <span className="arr">→</span>
              </a>
            </div>
          </Reveal>
          <Reveal className="media square" delay={2}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home-support.webp" alt={t("intro.imageAlt")} />
          </Reveal>
        </div>

        <div className="container" style={{ marginTop: "clamp(48px,6vw,84px)" }}>
          <Reveal className="stats">
            <div className="stat">
              <div className="n">12</div>
              <div className="l">{t("stats.ranges")}</div>
            </div>
            <div className="stat">
              <div className="n">
                100<span className="u">%</span>
              </div>
              <div className="l">{t("stats.materials")}</div>
            </div>
            <div className="stat">
              <div className="n">2</div>
              <div className="l">{t("stats.bases")}</div>
            </div>
            <div className="stat">
              <div className="n">OEM</div>
              <div className="l">{t("stats.oem")}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CATALOG */}
      <section className="section" id="catalog" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="sec-head">
            <Reveal>
              <p className="eyebrow">{t("catalog.eyebrow")}</p>
              <h2 className="h2 balance" style={{ marginTop: "16px" }}>
                {t("catalog.title")}
              </h2>
            </Reveal>
            <Reveal as="span" delay={1}>
              <Link className="btn btn-ghost" href="/products">
                {t("catalog.viewAll")} <span className="arr">→</span>
              </Link>
            </Reveal>
          </div>

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

      {/* WHY BAMBOO (DARK) */}
      <section className="section dark">
        <div className="container split rev">
          <Reveal className="media tall">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home-why.webp" alt={t("why.imageAlt")} />
          </Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">{t("why.eyebrow")}</p>
            <h2 className="h2 balance" style={{ marginTop: "18px" }}>
              {t("why.title")}
            </h2>
            <ul className="flist">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i}>
                  <span className="ic">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      {WHY_ICONS[i]}
                    </svg>
                  </span>
                  <div>
                    <div className="t">{t(`why.items.${i}.t`)}</div>
                    <div className="d">{t(`why.items.${i}.d`)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* TRADE CAPABILITIES */}
      <section className="section">
        <div className="container">
          <Reveal className="center" style={{ maxWidth: "62ch", marginInline: "auto" }}>
            <p className="eyebrow eyebrow--center" style={{ justifyContent: "center" }}>
              {t("trade.eyebrow")}
            </p>
            <h2 className="h2 balance" style={{ marginTop: "16px" }}>
              {t("trade.title")}
            </h2>
            <p className="lead pretty" style={{ marginTop: "18px" }}>
              {t("trade.lead")}
            </p>
          </Reveal>

          <Reveal className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginTop: "clamp(40px,5vw,68px)" }}>
            {["01", "02", "03", "04"].map((num, i) => (
              <div key={num}>
                <div className="pill">{num}</div>
                <h3 className="h3" style={{ marginTop: "16px" }}>
                  {t(`trade.items.${i}.t`)}
                </h3>
                <p className="muted" style={{ marginTop: "10px", fontSize: ".98rem" }}>
                  {t(`trade.items.${i}.d`)}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INSPIRATION TEASER */}
      <section className="section" id="inspiration" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="sec-head">
            <Reveal>
              <p className="eyebrow">{t("teaser.eyebrow")}</p>
              <h2 className="h2 balance" style={{ marginTop: "16px" }}>
                {t("teaser.title")}
              </h2>
            </Reveal>
            <Reveal as="p" className="muted measure-sm" delay={1}>
              {t("teaser.lead")}{" "}
              <Link className="textlink" href="/inspiration" style={{ marginTop: "14px" }}>
                {t("teaser.cta")} <span className="arr">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal className="masonry">
            {TEASER.map((item) => (
              <Link key={item.key} className="m-card" href="/products">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={item.image} alt={t(`teaser.items.${item.key}`)} />
                <span className="cap">{t(`teaser.items.${item.key}`)}</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section--tight" id="contact">
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
                <a className="btn btn-on-dark btn-lg" href={`mailto:${company.email}`}>
                  {t("cta.ctaEmail", { email: company.email })}
                </a>
                <p
                  className="muted"
                  style={{ color: "rgba(246,243,236,.6)", fontSize: ".85rem", textAlign: "center" }}
                >
                  {t("cta.callNote", { phone: company.mobile })}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
