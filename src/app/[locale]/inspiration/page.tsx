import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal";
import InspirationGallery from "@/components/InspirationGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inspiration.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function InspirationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("inspiration");

  return (
    <>
      {/* PAGE HERO */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            {t("eyebrow")}
          </Reveal>
          <Reveal as="h1" className="display balance" delay={1} style={{ marginTop: "16px", maxWidth: "16ch" }}>
            {t("title")}
          </Reveal>
          <Reveal as="p" className="lead pretty measure" delay={2} style={{ marginTop: "18px" }}>
            {t("lead")}
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section" style={{ paddingTop: "clamp(28px,3vw,48px)" }}>
        <div className="container">
          <InspirationGallery />
        </div>
      </section>
    </>
  );
}
