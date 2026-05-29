"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gallery, galleryFilters, type GalleryCategory } from "@/lib/gallery";

const ZoomIcon = () => (
  <span className="ic-zoom">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14zM11 8v6M8 11h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default function InspirationGallery() {
  const t = useTranslations("inspiration");
  const [cat, setCat] = useState<"all" | GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => gallery.filter((g) => cat === "all" || g.cat === cat),
    [cat],
  );

  const open = lightboxIndex !== null;
  const close = () => setLightboxIndex(null);
  const step = (d: number) =>
    setLightboxIndex((i) =>
      i === null ? i : (i + d + visible.length) % visible.length,
    );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, visible.length]);

  const active = open ? visible[lightboxIndex] : null;

  return (
    <>
      <div className="chips" data-insp-filter style={{ marginTop: "26px" }}>
        {galleryFilters.map((f) => (
          <span
            key={f}
            className={`chip${cat === f ? " active" : ""}`}
            data-cat={f}
            onClick={() => setCat(f as "all" | GalleryCategory)}
          >
            {t(`cats.${f}`)}
          </span>
        ))}
      </div>

      <div className="insp-grid" style={{ marginTop: "clamp(28px,3vw,48px)" }}>
        {visible.map((item, idx) => (
          <button
            key={item.id}
            className="insp-card"
            data-cat={item.cat}
            onClick={() => setLightboxIndex(idx)}
            aria-label={t(`items.${item.id}`)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src={item.image} alt={t(`items.${item.id}`)} />
            <ZoomIcon />
            <span className="ic-cap">
              <span className="ic-cat">{t(`cats.${item.cat}`)}</span>
              <span className="ic-t">{t(`items.${item.id}`)}</span>
            </span>
          </button>
        ))}
      </div>

      <div className={`lightbox${open ? " open" : ""}`} role="dialog" aria-modal="true">
        <span className="lb-count">
          {open ? `${lightboxIndex + 1} / ${visible.length}` : ""}
        </span>
        <button className="lb-close" aria-label="Close" onClick={close}>
          &times;
        </button>
        <button className="lb-btn lb-prev" aria-label="Previous" onClick={() => step(-1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="lb-btn lb-next" aria-label="Next" onClick={() => step(1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <figure>
          {active && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.image} alt={t(`items.${active.id}`)} />
          )}
          <figcaption>
            <div>
              <div className="lb-cat">{active ? t(`cats.${active.cat}`) : ""}</div>
              <div className="lb-t">{active ? t(`items.${active.id}`) : ""}</div>
            </div>
            <Link className="btn btn-leaf lb-link" href="/products">
              {t("viewProduct")} <span className="arr">→</span>
            </Link>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
