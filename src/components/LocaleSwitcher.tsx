"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  en: "EN",
  nl: "NL",
  de: "DE",
  es: "ES",
  it: "IT",
  fr: "FR",
  ja: "日本語",
  ar: "العربية",
};

export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    startTransition(() => {
      // @ts-expect-error -- params are passed through for dynamic segments
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <select
      className={`locale-switcher${className ? ` ${className}` : ""}`}
      value={locale}
      onChange={onChange}
      disabled={isPending}
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {LABELS[loc] ?? loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
