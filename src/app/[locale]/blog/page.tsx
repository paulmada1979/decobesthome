import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { featuredPost, gridPosts, journalFilters } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import JournalFilterable, { type JournalCard } from "@/components/JournalFilterable";
import CtaBand from "@/components/CtaBand";

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
      <CtaBand ns="journal" />
    </>
  );
}
