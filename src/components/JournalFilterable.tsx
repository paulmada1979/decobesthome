"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

export type JournalCard = {
  id: string;
  slug: string;
  image: string;
  category: string;
  catLabel: string;
  date: string;
  readTime?: string;
  title: string;
  excerpt: string;
};

type Filter = { key: string; label: string };

export default function JournalFilterable({
  filters,
  featured,
  featuredBadge,
  readArticle,
  posts,
  readMore,
  newsletter,
}: {
  filters: Filter[];
  featured: JournalCard;
  featuredBadge: string;
  readArticle: string;
  posts: JournalCard[];
  readMore: string;
  newsletter: { pill: string; title: string; lead: string; cta: string };
}) {
  const [active, setActive] = useState("all");
  const showFeatured = active === "all" || featured.category === active;
  const shown = posts.filter((p) => active === "all" || p.category === active);

  return (
    <>
      {/* FILTERS */}
      <div className="container">
        <div className="chips" style={{ marginTop: "26px" }}>
          {filters.map((f) => (
            <span
              key={f.key}
              className={`chip${active === f.key ? " active" : ""}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      {showFeatured && (
        <section className="section--tight">
          <div className="container">
            <Link className="feature-post" href={`/blog/${featured.slug}`}>
              <div className="fp-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image} alt={featured.title} />
              </div>
              <div className="fp-body">
                <div className="post-meta">
                  <span className="post-cat">
                    {featuredBadge} · {featured.catLabel}
                  </span>
                  <span>{featured.date}</span>
                  {featured.readTime && <span>· {featured.readTime}</span>}
                </div>
                <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.7rem)" }}>
                  {featured.title}
                </h2>
                <p className="lead" style={{ marginTop: "14px", maxWidth: "46ch" }}>
                  {featured.excerpt}
                </p>
                <span className="more" style={{ marginTop: "22px", display: "inline-block" }}>
                  <span className="textlink">
                    {readArticle} <span className="arr">→</span>
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* POST GRID */}
      <section className="section" style={{ paddingTop: showFeatured ? "clamp(28px,3vw,48px)" : "clamp(8px,2vw,24px)" }}>
        <div className="container">
          <div className="posts">
            {shown.map((post) => (
              <Link className="post-card" href={`/blog/${post.slug}`} key={post.id}>
                <div className="ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={post.image} alt={post.title} />
                </div>
                <div className="body">
                  <div className="post-meta">
                    <span className="post-cat">{post.catLabel}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="ex">{post.excerpt}</p>
                  <div className="more">
                    <span className="textlink">
                      {readMore} <span className="arr">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <div
              className="post-card"
              style={{
                background: "var(--forest)",
                color: "var(--bone)",
                borderColor: "var(--forest)",
                justifyContent: "center",
              }}
            >
              <div className="body" style={{ textAlign: "center", alignItems: "center" }}>
                <span className="pill" style={{ background: "rgba(132,190,69,.2)", color: "var(--leaf)" }}>
                  {newsletter.pill}
                </span>
                <h3 style={{ color: "#fff", marginTop: "14px" }}>{newsletter.title}</h3>
                <p className="ex" style={{ color: "rgba(246,243,236,.75)" }}>
                  {newsletter.lead}
                </p>
                <div className="more" style={{ width: "100%" }}>
                  <Link className="btn btn-leaf" style={{ width: "100%" }} href="/contact">
                    {newsletter.cta} <span className="arr">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
