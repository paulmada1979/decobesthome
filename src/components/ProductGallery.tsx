"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
  fit = "cover",
}: {
  images: string[];
  alt: string;
  /** "contain" shows the whole photo (white letterbox) instead of cropping to the frame. */
  fit?: "cover" | "contain";
}) {
  const [main, setMain] = useState(images[0]);

  return (
    <div>
      <div className={fit === "contain" ? "media media--contain" : "media"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="pdpMain" src={main} alt={alt} />
      </div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((src, i) => (
            <button
              key={src + i}
              className={src === main ? "active" : ""}
              onClick={() => setMain(src)}
              aria-label={`${alt} ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} — view ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
