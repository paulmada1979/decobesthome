"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Reveal({
  children,
  as: Tag = "div",
  delay,
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A 12% threshold can never be met by an element taller than ~8x the
    // viewport: the visible slice tops out at one screenful. That left long
    // blog articles (one Reveal wraps the whole body) stuck at opacity 0 —
    // permanently on mobile. For anything taller than the viewport, reveal as
    // soon as it enters instead of waiting for a ratio it cannot reach.
    const tall = el.getBoundingClientRect().height > window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: tall ? 0 : 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-delay={delay}
      className={`${shown ? "in" : ""}${className ? ` ${className}` : ""}`.trim() || undefined}
      style={style}
    >
      {children}
    </Tag>
  );
}
