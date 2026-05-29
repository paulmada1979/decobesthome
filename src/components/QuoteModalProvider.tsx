"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type QuoteModalContextValue = {
  isOpen: boolean;
  /** Product name to prefill in the enquiry select, if any. */
  product: string | null;
  open: (product?: string) => void;
  close: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<string | null>(null);

  const open = useCallback((p?: string) => {
    setProduct(p ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, product, open, close }),
    [isOpen, product, open, close],
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
