import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { featuredPost, gridPosts, journalFilters } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import JournalFilterable, { type JournalCard } from "@/components/JournalFilterable";
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

  const toCard = (p: typeof featuredPost): JournalCard => ({
    id: p.id,
    slug: p.slug,
    image: p.image,
    category: p.category,
    catLabel: t(`posts.${p.id}.cat`),
    date: t(`posts.${p.id}.date`),
    readTime: p.readMins ? t("readTime", { mins: p.readMins }) : undefined,
    title: t(`posts.${p.id}.title`),
    excerpt: t(`posts.${p.id}.excerpt`),
  });

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
        </div>
      </section>

      <JournalFilterable
        filters={journalFilters.map((f) => ({ key: f, label: t(`filters.${f}`) }))}
        featured={toCard(featuredPost)}
        featuredBadge={t("featuredBadge")}
        readArticle={t("readArticle")}
        posts={gridPosts.map(toCard)}
        readMore={t("readMore")}
        newsletter={{
          pill: t("newsletter.pill"),
          title: t("newsletter.title"),
          lead: t("newsletter.lead"),
          cta: t("newsletter.cta"),
        }}
      />

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
