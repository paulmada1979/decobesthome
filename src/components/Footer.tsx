import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { company, socials, logos } from "@/lib/site";

const FOOTER_PRODUCTS = [
  "tonkin-bamboo-canes",
  "decor-moso-bamboo-poles",
  "bamboo-fencing-edging",
  "bamboo-fence-panels",
  "reed-fencing",
  "natural-thatch-roof",
];

function Socials() {
  return (
    <div className="socials">
      <a href={socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
        </svg>
      </a>
      <a href={socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      </a>
      <a href={socials.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12s0-3-.4-4.4a2.5 2.5 0 00-1.7-1.7C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.9.4A2.5 2.5 0 002.4 7.6C2 9 2 12 2 12s0 3 .4 4.4a2.5 2.5 0 001.7 1.7c1.4.4 7.9.4 7.9.4s6.5 0 7.9-.4a2.5 2.5 0 001.7-1.7C22 15 22 12 22 12zm-12 2.5v-5l4.5 2.5-4.5 2.5z" />
        </svg>
      </a>
      <a href={socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.5 8.5a2 2 0 100-4 2 2 0 000 4zM4.8 10h3.4v9.5H4.8V10zm6 0h3.2v1.3c.5-.8 1.6-1.6 3.2-1.6 3 0 3.8 1.9 3.8 4.6v5.2h-3.4v-4.6c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v4.7h-3.2V10z" />
        </svg>
      </a>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tp = useTranslations("products.names");

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logos.wordmarkWhite} alt="BestHome" />
            </div>
            <p style={{ fontSize: ".92rem", maxWidth: "34ch" }}>{t("tagline")}</p>
            <Socials />
          </div>
          <div>
            <div className="foot-h">{t("products")}</div>
            <ul className="foot-list">
              {FOOTER_PRODUCTS.map((id) => (
                <li key={id}>
                  <Link href={`/products/${id}`}>{tp(id)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="foot-h">{t("company")}</div>
            <ul className="foot-list">
              <li>
                <Link href="/about">{t("aboutUs")}</Link>
              </li>
              <li>
                <Link href="/blog">{tn("journal")}</Link>
              </li>
              <li>
                <Link href="/inspiration">{tn("inspiration")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("contactUs")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="foot-h">{tn("contact")}</div>
            <div className="foot-contact">
              <p>
                <span className="lbl">{company.legalName}</span>
              </p>
              <p>
                {t("emailLabel")}:{" "}
                <a href={`mailto:${company.email}`}>{company.email}</a>
                <br />
                {t("mobileLabel")}: {company.mobile}
                <br />
                {t("telFaxLabel")}: {company.telFax}
              </p>
              <p style={{ marginTop: "10px" }}>
                {t("officeLabel")}: {company.office}
              </p>
              <p>
                {t("factoryLabel")}: {company.factory}
              </p>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t("copyright")}</span>
          <span>{t("tags")}</span>
        </div>
      </div>
    </footer>
  );
}
