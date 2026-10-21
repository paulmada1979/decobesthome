"use client";

import { useQuoteModal, type ModalMode } from "./QuoteModalProvider";

type QuoteButtonProps = {
  children: React.ReactNode;
  className?: string;
  /** Product name to prefill in the enquiry. */
  product?: string;
  /** Which form the button opens. Defaults to the full quote form. */
  mode?: ModalMode;
  /** For buttons whose visible content is an image rather than words. */
  ariaLabel?: string;
  style?: React.CSSProperties;
};

export default function QuoteButton({
  children,
  className,
  product,
  mode = "quote",
  ariaLabel,
  style,
}: QuoteButtonProps) {
  const { open } = useQuoteModal();
  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => open(product, mode)}
    >
      {children}
    </button>
  );
}
