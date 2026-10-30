import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { posts, publishedPosts, getPost } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
type Block =
  | { p: string }
  | { h2: string }
  | { h3: string }
  | { ul: string[] }
  | { img: string; alt?: string; caption?: string }
  | { table: { headers: string[]; rows: string[][] } }
  | { cta: { label: string; href: string } };

// Only recognise links to this site; render everything else as ordinary text.
function articleText(text: string): ReactNode {
  return text.split(/(\[[^\]]+\]\(https:\/\/www\.decobesthome\.com\/[^\s)]*\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(https:\/\/www\.decobesthome\.com(\/[^\s)]*)\)$/);
    return match ? <Link key={i} className="textlink" href={match[2]}>{match[1]}</Link> : part;
  });
}

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
    title: t.has(`posts.${post.id}.seoTitle`) ? t(`posts.${post.id}.seoTitle`) : t(`posts.${post.id}.title`),
    description: t(`posts.${post.id}.excerpt`),
    alternates: { canonical },
    openGraph: {
      url: canonical,
      type: "article",
      title: t(`posts.${post.id}.title`),
      description: t(`posts.${post.id}.excerpt`),
      images: [{ url: post.id === "choose-right-bamboo-fence" ? "/images/blog/bamboo-fences-guide-social.jpg" : post.image }],
    },
    twitter: { card: "summary_large_image", images: [post.image] },
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
  const hasEditorial = t.has(`posts.${post.id}.author`);
  const imageAlt = t.has(`posts.${post.id}.imageAlt`) ? t(`posts.${post.id}.imageAlt`) : title;
  const canonical = `https://www.decobesthome.com${locale === "en" ? "" : `/${locale}`}/blog/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: t(`posts.${post.id}.excerpt`),
    image: [`https://www.decobesthome.com${post.image}`],
    datePublished: post.date,
    ...(t.has(`posts.${post.id}.modifiedDate`) ? { dateModified: t(`posts.${post.id}.modifiedDate`) } : {}),
    ...(hasEditorial ? { author: { "@type": "Organization", name: t(`posts.${post.id}.author`), url: "https://www.decobesthome.com/about" } } : {}),
    publisher: { "@type": "Organization", name: "BestHome", url: "https://www.decobesthome.com" },
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

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
      {!post.draft && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />}
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
            {hasEditorial && <span>· {t(`posts.${post.id}.author`)}</span>}
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
              <img src={post.image} alt={imageAlt} />
              {t.has(`posts.${post.id}.imageCaption`) && <figcaption>{t(`posts.${post.id}.imageCaption`)}</figcaption>}
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
                      <li key={j}>{articleText(li)}</li>
                    ))}
                  </ul>
                );
              else if ("img" in block)
                el = (
                  <figure key={i} className="article-fig">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src={block.img} alt={block.alt ?? title} />
                    {block.caption && <figcaption>{block.caption}</figcaption>}
                  </figure>
                );
              else if ("table" in block)
                el = (
                  <div key={i} className="article-table" role="region" aria-label={title} tabIndex={0}>
                    <table>
                      <thead><tr>{block.table.headers.map((header, j) => <th key={j} scope="col">{header}</th>)}</tr></thead>
                      <tbody>{block.table.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => k === 0 ? <th key={k} scope="row">{cell}</th> : <td key={k}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                );
              else if ("cta" in block)
                el = (
                  <p key={i} style={{ margin: "28px 0" }}>
                    <Link className="btn btn-leaf" href={block.cta.href}>
                      {block.cta.label} <span className="arr">→</span>
                    </Link>
                  </p>
                );
              else el = <p key={i}>{articleText(block.p)}</p>;
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
      <CtaBand ns="journal.detail" />
    </>
  );
}
