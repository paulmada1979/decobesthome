import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { posts, publishedPosts, getPost } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import QuoteButton from "@/components/QuoteButton";

type Block =
  | { p: string }
  | { h2: string }
  | { h3: string }
  | { ul: string[] }
  | { cta: { label: string; href: string } };

export function generateStaticParams() {
  // Build draft URLs too so they're previewable (they're noindexed + unlinked).
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: "journal" });
  const path = `/blog/${slug}`;
  const canonical = locale === "en" ? path : `/${locale}${path}`;
  return {
    title: t(`posts.${post.id}.title`),
    description: t(`posts.${post.id}.excerpt`),
    alternates: { canonical },
    openGraph: { url: canonical, type: "article" },
    // Drafts are reachable for preview but must never be indexed.
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("journal");
  const td = await getTranslations("journal.detail");

  const title = t(`posts.${post.id}.title`);
  const body = t.raw(`posts.${post.id}.body`) as Block[];
  const support = post.images ?? [];

  // Distribute support images across the article: insert each one just before an
  // evenly-spaced <h2> section boundary so photos break up the prose naturally.
  const h2Indices = body.map((b, i) => ("h2" in b ? i : -1)).filter((i) => i > 0);
  const imageAt = new Map<number, string>();
  support.forEach((src, k) => {
    if (h2Indices.length === 0) return;
    const pos = h2Indices[Math.floor(((k + 1) * h2Indices.length) / (support.length + 1))];
    if (pos !== undefined && !imageAt.has(pos)) imageAt.set(pos, src);
  });

  const related = publishedPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      {/* ARTICLE HEAD */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container article">
          <Reveal as="p" className="crumbs">
            <Link href="/">{td("crumbHome")}</Link> &nbsp;/&nbsp;{" "}
            <Link href="/blog">{td("crumbJournal")}</Link> &nbsp;/&nbsp; {t(`posts.${post.id}.cat`)}
          </Reveal>
          <Reveal as="p" className="eyebrow" delay={1} style={{ marginTop: "18px" }}>
            {t(`posts.${post.id}.cat`)}
          </Reveal>
          <Reveal
            as="h1"
            className="display balance"
            delay={1}
            style={{ marginTop: "14px", fontSize: "clamp(2rem,4vw,3.4rem)" }}
          >
            {title}
          </Reveal>
          <Reveal as="div" className="post-meta" delay={2} style={{ marginTop: "18px" }}>
            <span>{t(`posts.${post.id}.date`)}</span>
            {post.readMins && <span>· {t("readTime", { mins: post.readMins })}</span>}
          </Reveal>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="section" style={{ paddingTop: "clamp(24px,3vw,40px)" }}>
        <div className="container">
          <Reveal as="div" className="article">
            <figure className="article-lead">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={title} />
            </figure>
            <p className="lead pretty" style={{ marginBottom: "6px" }}>
              {t(`posts.${post.id}.excerpt`)}
            </p>
            {body.map((block, i) => {
              const img = imageAt.get(i);
              const figure = img ? (
                <figure key={`fig-${i}`} className="article-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={img} alt={title} />
                </figure>
              ) : null;
              let el: ReactNode;
              if ("h2" in block) el = <h2 key={i} className="h3">{block.h2}</h2>;
              else if ("h3" in block) el = <h3 key={i} className="h4">{block.h3}</h3>;
              else if ("ul" in block)
                el = (
                  <ul key={i}>
                    {block.ul.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                );
              else if ("cta" in block)
                el = (
                  <p key={i} style={{ margin: "28px 0" }}>
                    <Link className="btn btn-leaf" href={block.cta.href}>
                      {block.cta.label} <span className="arr">→</span>
                    </Link>
                  </p>
                );
              else el = <p key={i}>{block.p}</p>;
              return [figure, el];
            })}

            <p style={{ marginTop: "40px" }}>
              <Link className="textlink" href="/blog">
                <span className="arr" style={{ transform: "rotate(180deg)", display: "inline-block" }}>
                  →
                </span>{" "}
                {td("backToJournal")}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* RELATED */}
      <section className="section" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="sec-head">
            <Reveal>
              <p className="eyebrow">{td("relatedEyebrow")}</p>
              <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>
                {td("relatedTitle")}
              </h2>
            </Reveal>
            <Reveal as="span" delay={1}>
              <Link className="btn btn-ghost" href="/blog">
                {td("relatedAll")} <span className="arr">→</span>
              </Link>
            </Reveal>
          </div>
          <div className="posts">
            {related.map((p, i) => (
              <Reveal key={p.id} as="span" delay={i % 3}>
                <Link className="post-card" href={`/blog/${p.slug}`}>
                  <div className="ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src={p.image} alt={t(`posts.${p.id}.title`)} />
                  </div>
                  <div className="body">
                    <div className="post-meta">
                      <span className="post-cat">{t(`posts.${p.id}.cat`)}</span>
                      <span>{t(`posts.${p.id}.date`)}</span>
                    </div>
                    <h3>{t(`posts.${p.id}.title`)}</h3>
                    <p className="ex">{t(`posts.${p.id}.excerpt`)}</p>
                    <div className="more">
                      <span className="textlink">
                        {t("readMore")} <span className="arr">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
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
                <QuoteButton className="btn btn-leaf btn-lg">
                  {td("cta.ctaQuote")} <span className="arr">→</span>
                </QuoteButton>
                <Link className="btn btn-on-dark btn-lg" href="/products">
                  {td("cta.ctaBrowse")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
