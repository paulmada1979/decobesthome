import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { featuredPost, gridPosts, journalFilters } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import Chips from "@/components/Chips";
import QuoteButton from "@/components/QuoteButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journal.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journal");

  return (
    <>
      {/* PAGE HERO */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            {t("eyebrow")}
          </Reveal>
          <Reveal as="h1" className="display balance" delay={1} style={{ marginTop: "16px", maxWidth: "18ch" }}>
            {t("title")}
          </Reveal>
          <Reveal as="p" className="lead pretty measure" delay={2} style={{ marginTop: "18px" }}>
            {t("lead")}
          </Reveal>
          <Reveal delay={3} style={{ marginTop: "26px" }}>
            <Chips options={journalFilters.map((f) => t(`filters.${f}`))} defaultActive={0} />
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section--tight">
        <div className="container">
          <Reveal as="span">
            <Link className="feature-post" href={`/blog/${featuredPost.slug}`}>
              <div className="fp-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featuredPost.image} alt={t(`posts.${featuredPost.id}.title`)} />
              </div>
              <div className="fp-body">
                <div className="post-meta">
                  <span className="post-cat">
                    {t("featuredBadge")} · {t(`posts.${featuredPost.id}.cat`)}
                  </span>
                  <span>{t(`posts.${featuredPost.id}.date`)}</span>
                  {featuredPost.readMins && (
                    <span>· {t("readTime", { mins: featuredPost.readMins })}</span>
                  )}
                </div>
                <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.7rem)" }}>
                  {t(`posts.${featuredPost.id}.title`)}
                </h2>
                <p className="lead" style={{ marginTop: "14px", maxWidth: "46ch" }}>
                  {t(`posts.${featuredPost.id}.excerpt`)}
                </p>
                <span className="more" style={{ marginTop: "22px", display: "inline-block" }}>
                  <span className="textlink">
                    {t("readArticle")} <span className="arr">→</span>
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* POST GRID */}
      <section className="section" style={{ paddingTop: "clamp(28px,3vw,48px)" }}>
        <div className="container">
          <div className="posts">
            {gridPosts.map((post, i) => (
              <Reveal key={post.id} as="span" delay={i % 3}>
                <Link className="post-card" href={`/blog/${post.slug}`}>
                  <div className="ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src={post.image} alt={t(`posts.${post.id}.title`)} />
                  </div>
                  <div className="body">
                    <div className="post-meta">
                      <span className="post-cat">{t(`posts.${post.id}.cat`)}</span>
                      <span>{t(`posts.${post.id}.date`)}</span>
                    </div>
                    <h3>{t(`posts.${post.id}.title`)}</h3>
                    <p className="ex">{t(`posts.${post.id}.excerpt`)}</p>
                    <div className="more">
                      <span className="textlink">
                        {t("readMore")} <span className="arr">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal
              as="div"
              className="post-card"
              delay={2}
              style={{
                background: "var(--forest)",
                color: "var(--bone)",
                borderColor: "var(--forest)",
                justifyContent: "center",
              }}
            >
              <div className="body" style={{ textAlign: "center", alignItems: "center" }}>
                <span className="pill" style={{ background: "rgba(132,190,69,.2)", color: "var(--leaf)" }}>
                  {t("newsletter.pill")}
                </span>
                <h3 style={{ color: "#fff", marginTop: "14px" }}>{t("newsletter.title")}</h3>
                <p className="ex" style={{ color: "rgba(246,243,236,.75)" }}>
                  {t("newsletter.lead")}
                </p>
                <div className="more" style={{ width: "100%" }}>
                  <Link className="btn btn-leaf" style={{ width: "100%" }} href="/contact">
                    {t("newsletter.cta")} <span className="arr">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
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
                <Link className="btn btn-on-dark btn-lg" href="/products">
                  {t("cta.ctaBrowse")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
