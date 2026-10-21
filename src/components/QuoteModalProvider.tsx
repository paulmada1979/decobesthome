"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/** "quote" = the full enquiry form; "brochure" = short form that asks for the
 *  wholesale brochure. Both post to /api/enquiry and land in the sales inbox. */
export type ModalMode = "quote" | "brochure";

type QuoteModalContextValue = {
  isOpen: boolean;
  /** Product name to prefill in the enquiry select, if any. */
  product: string | null;
  mode: ModalMode;
  open: (product?: string, mode?: ModalMode) => void;
  close: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<string | null>(null);
  const [mode, setMode] = useState<ModalMode>("quote");

  const open = useCallback((p?: string, m: ModalMode = "quote") => {
    setProduct(p ?? null);
    setMode(m);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, product, mode, open, close }),
    [isOpen, product, mode, open, close],
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return ctx;
}
