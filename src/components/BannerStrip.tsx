"use client";

import { useRef } from "react";
import { Link } from "@/i18n/navigation";

export type BannerStripItem = { href: string; src: string; name: string };

/** Horizontal, swipeable strip of product banners; each tile links to its product page. */
export default function BannerStrip({
  items,
  prevLabel,
  nextLabel,
}: {
  items: BannerStripItem[];
  prevLabel: string;
  nextLabel: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // In RTL the strip runs the other way, so "next" scrolls left.
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="bstrip">
      <div className="bstrip-track" ref={track}>
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="bstrip-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src={it.src} alt={it.name} />
            <span className="bstrip-name">
              {it.name} <span className="arr">→</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="bstrip-nav">
        <button type="button" className="bstrip-btn" onClick={() => step(-1)} aria-label={prevLabel}>
          ‹
        </button>
        <button type="button" className="bstrip-btn" onClick={() => step(1)} aria-label={nextLabel}>
          ›
        </button>
      </div>
    </div>
  );
}
