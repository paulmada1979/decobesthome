import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company, socials } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontSize: ".72rem",
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "var(--leaf-deep)",
  fontWeight: 600,
  marginBottom: "4px",
};

const socialStyle: React.CSSProperties = {
  borderColor: "var(--line)",
  color: "var(--ink-soft)",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tn = await getTranslations("nav");

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/contact-hero-w.webp" alt={t("hero.imageAlt")} />
        </div>
        <div className="container inner" style={{ paddingBlock: "clamp(64px,9vw,110px)" }}>
          <p className="crumbs">
            <Link href="/">{tn("home")}</Link> &nbsp;/&nbsp; {t("hero.crumb")}
          </p>
          <p className="eyebrow" style={{ color: "var(--leaf)" }}>
            {t("hero.eyebrow")}
          </p>
          <h1
            className="display"
            style={{ color: "#fff", fontSize: "clamp(2.6rem,5vw,4.6rem)", maxWidth: "16ch" }}
          >
            {t("hero.title")}
          </h1>
          <p className="lead" style={{ color: "rgba(246,243,236,.9)", maxWidth: "50ch", marginTop: "16px" }}>
            {t("hero.lead")}
          </p>
        </div>
      </section>

      {/* CONTACT BODY */}
      <section className="section">
        <div className="container contact-grid">
          {/* form */}
          <Reveal>
            <p className="eyebrow">{t("form.eyebrow")}</p>
            <h2 className="h2" style={{ marginTop: "14px", fontSize: "clamp(1.9rem,3vw,2.8rem)" }}>
              {t("form.title")}
            </h2>
            <p className="muted" style={{ marginTop: "12px", maxWidth: "46ch" }}>
              {t("form.lead")}
            </p>
            <div style={{ marginTop: "26px" }}>
              <ContactForm />
            </div>
          </Reveal>

          {/* info */}
          <Reveal delay={1}>
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderRadius: "20px",
                padding: "30px 30px 26px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3 className="h3">{company.legalName}</h3>
              <div className="divider" style={{ margin: "20px 0" }} />
              <div className="foot-contact" style={{ color: "var(--ink-soft)" }}>
                <p style={{ margin: "0 0 16px" }}>
                  <span style={fieldLabel}>{t("info.email")}</span>
                  <a className="textlink" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  <span style={fieldLabel}>{t("info.mobile")}</span>
                  <a href={company.mobileHref} style={{ fontWeight: 600, color: "var(--ink)" }}>
                    {company.mobile}
                  </a>
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  <span style={fieldLabel}>{t("info.telFax")}</span>
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>{company.telFax}</span>
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  <span style={fieldLabel}>{t("info.office")}</span>
                  {company.office}
                </p>
                <p style={{ margin: 0 }}>
                  <span style={fieldLabel}>{t("info.factory")}</span>
                  {company.factory}
                </p>
              </div>
              <div className="socials" style={{ marginTop: "22px" }}>
                <a href={socials.facebook} aria-label="Facebook" style={socialStyle}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
                  </svg>
                </a>
                <a href={socials.instagram} aria-label="Instagram" style={socialStyle}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                </a>
                <a href={socials.youtube} aria-label="YouTube" style={socialStyle}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12s0-3-.4-4.4a2.5 2.5 0 00-1.7-1.7C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.9.4A2.5 2.5 0 002.4 7.6C2 9 2 12 2 12s0 3 .4 4.4a2.5 2.5 0 001.7 1.7c1.4.4 7.9.4 7.9.4s6.5 0 7.9-.4a2.5 2.5 0 001.7-1.7C22 15 22 12 22 12zm-12 2.5v-5l4.5 2.5-4.5 2.5z" />
                  </svg>
                </a>
                <a href={socials.linkedin} aria-label="LinkedIn" style={socialStyle}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.5 8.5a2 2 0 100-4 2 2 0 000 4zM4.8 10h3.4v9.5H4.8V10zm6 0h3.2v1.3c.5-.8 1.6-1.6 3.2-1.6 3 0 3.8 1.9 3.8 4.6v5.2h-3.4v-4.6c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v4.7h-3.2V10z" />
                  </svg>
                </a>
              </div>
            </div>
            <div
              style={{
                marginTop: "18px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid var(--line)",
                height: "220px",
                background: "linear-gradient(135deg, var(--leaf-soft), var(--bone-2))",
                display: "grid",
                placeItems: "center",
                color: "var(--leaf-deep)",
                textAlign: "center",
              }}
            >
              <div>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto" }}>
                  <path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                <p style={{ fontWeight: 600, marginTop: "8px" }}>{t("map.location")}</p>
                <p className="muted" style={{ fontSize: ".82rem" }}>
                  {t("map.note")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
