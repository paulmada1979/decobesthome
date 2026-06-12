"use client";

import { useEffect, useState } from "react";

export type ShowcaseImage = { src: string; label: string };

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

export default function ShowcaseLightbox({ images }: { images: ShowcaseImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const open = index !== null;
  const close = () => setIndex(null);
  const step = (d: number) =>
    setIndex((i) => (i === null ? i : (i + d + images.length) % images.length));

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
  }, [open, images.length]);

  const active = open ? images[index] : null;

  return (
    <>
      <div className="insp-grid insp-grid--sm" style={{ marginTop: "clamp(24px,3vw,40px)" }}>
        {images.map((img, i) => (
          <button
            key={img.src}
            className="insp-card"
            onClick={() => setIndex(i)}
            aria-label={img.label}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src={img.src} alt={img.label} />
            <ZoomIcon />
            <span className="ic-cap">
              <span className="ic-t">{img.label}</span>
            </span>
          </button>
        ))}
      </div>

      <div className={`lightbox${open ? " open" : ""}`} role="dialog" aria-modal="true">
        <span className="lb-count">{open ? `${index + 1} / ${images.length}` : ""}</span>
        <button className="lb-close" aria-label="Close" onClick={close}>
          &times;
        </button>
        <button className="lb-btn lb-prev" aria-label="Previous" onClick={() => step(-1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="lb-btn lb-next" aria-label="Next" onClick={() => step(1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <figure>
          {active && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.src} alt={active.label} />
          )}
          <figcaption>
            <div>
              <div className="lb-t">{active ? active.label : ""}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
