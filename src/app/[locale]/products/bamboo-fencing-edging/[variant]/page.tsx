import type { Metadata } from "next";
import { bambooFenceSeries } from "@/lib/bambooVariants";
import BambooVariantPage, { bambooVariantMetadata } from "@/components/BambooVariantPage";

export function generateStaticParams() {
  return bambooFenceSeries.variants.map((x) => ({ variant: x.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; variant: string }>;
}): Promise<Metadata> {
  const { locale, variant } = await params;
  return bambooVariantMetadata(bambooFenceSeries, locale, variant);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; variant: string }>;
}) {
  const { locale, variant } = await params;
  return <BambooVariantPage series={bambooFenceSeries} locale={locale} variant={variant} />;
}
