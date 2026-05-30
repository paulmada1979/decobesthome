import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import QuoteButton from "@/components/QuoteButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tn = await getTranslations("nav");

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-hero.webp" alt={t("hero.imageAlt")} />
        </div>
        <div className="container inner">
          <p className="crumbs">
            <Link href="/">{tn("home")}</Link> &nbsp;/&nbsp; {t("hero.crumb")}
          </p>
          <p className="eyebrow" style={{ color: "var(--leaf)" }}>
            {t("hero.eyebrow")}
          </p>
          <h1
            className="display"
            style={{ color: "#fff", fontSize: "clamp(2.6rem,5.5vw,5rem)", maxWidth: "18ch" }}
          >
            {t("hero.title")}
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">{t("story.eyebrow")}</p>
            <h2 className="h2 balance" style={{ marginTop: "18px" }}>
              {t("story.title")}
            </h2>
            <p className="lead pretty" style={{ marginTop: "20px" }}>
              {t("story.p1")}
            </p>
            <p className="muted pretty" style={{ marginTop: "16px" }}>
              {t("story.p2")}
            </p>
            <p className="muted pretty" style={{ marginTop: "16px" }}>
              {t("story.p3")}
            </p>
          </Reveal>
          <Reveal className="media square" delay={2}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about-support.webp" alt={t("story.imageAlt")} />
          </Reveal>
        </div>
      </section>

      {/* VALUES (DARK) */}
      <section className="section dark">
        <div className="container">
          <Reveal className="center" style={{ maxWidth: "60ch", marginInline: "auto" }}>
            <p className="eyebrow eyebrow--center" style={{ justifyContent: "center" }}>
              {t("values.eyebrow")}
            </p>
            <h2 className="h2 balance" style={{ marginTop: "16px" }}>
              {t("values.title")}
            </h2>
          </Reveal>
          <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "clamp(40px,5vw,64px)" }}>
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i}>
                <div className="pill">{t(`values.items.${i}.pill`)}</div>
                <h3 className="h3" style={{ marginTop: "16px" }}>
                  {t(`values.items.${i}.t`)}
                </h3>
                <p className="muted" style={{ marginTop: "10px" }}>
                  {t(`values.items.${i}.d`)}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="stats" style={{ marginTop: "clamp(40px,5vw,64px)" }}>
            <div className="stat">
              <div className="n">12</div>
              <div className="l">{t("values.stats.ranges")}</div>
            </div>
            <div className="stat">
              <div className="n">
                100<span className="u">%</span>
              </div>
              <div className="l">{t("values.stats.materials")}</div>
            </div>
            <div className="stat">
              <div className="n">2</div>
              <div className="l">{t("values.stats.bases")}</div>
            </div>
            <div className="stat">
              <div className="n">OEM</div>
              <div className="l">{t("values.stats.oem")}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <Reveal>
              <p className="eyebrow">{t("process.eyebrow")}</p>
              <h2 className="h2 balance" style={{ marginTop: "14px" }}>
                {t("process.title")}
              </h2>
            </Reveal>
            <Reveal as="p" className="muted measure-sm" delay={1}>
              {t("process.lead")}
            </Reveal>
          </div>
          <Reveal as="ul" className="flist" style={{ maxWidth: "none" }}>
            {["01", "02", "03", "04", "05"].map((num, i) => (
              <li key={num}>
                <span className="ic" style={{ fontFamily: "var(--serif)", fontSize: "1.4rem" }}>
                  {num}
                </span>
                <div>
                  <div className="t">{t(`process.items.${i}.t`)}</div>
                  <div className="d">{t(`process.items.${i}.d`)}</div>
                </div>
              </li>
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
