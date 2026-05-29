"use client";

import { useQuoteModal } from "./QuoteModalProvider";

type QuoteButtonProps = {
  children: React.ReactNode;
  className?: string;
  /** Product name to prefill in the enquiry. */
  product?: string;
  style?: React.CSSProperties;
};

export default function QuoteButton({
  children,
  className,
  product,
  style,
}: QuoteButtonProps) {
  const { open } = useQuoteModal();
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => open(product)}
    >
      {children}
    </button>
  );
}
