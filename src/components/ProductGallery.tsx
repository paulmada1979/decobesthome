"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [main, setMain] = useState(images[0]);

  return (
    <div>
      <div className="media">
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
