import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import QuoteButton from "./QuoteButton";
import { company } from "@/lib/site";

type Props = {
  /** Message namespace that owns this page's `cta.*` copy (eyebrow, title, lead, ctaQuote). */
  ns: string;
  /** Anchor id, for pages whose nav links jump to the band (the homepage's #contact). */
  id?: string;
};

/**
 * The closing call-to-action shared by every page: request a quote, or ask for
 * the wholesale brochure. Page-specific wording stays in each page's own
 * `cta.*` messages; everything common (buttons, cover, contact line) lives in
 * the `ctaBand` namespace so it is written once, not seven times.
 */
export default async function CtaBand({ ns, id }: Props) {
  const t = await getTranslations(ns);
  const tb = await getTranslations("ctaBand");

  return (
    <section className="section--tight" id={id}>
      <div className="container">
        <Reveal className="cta-band">
          <span className="leaf-mark">
            <svg width="280" height="280" viewBox="0 0 24 24" fill="none">
              <path d="M12 3c0 8-6 10-6 15a6 6 0 0012 0c0-5-6-7-6-15z" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
          <div className="cta-grid">
            <div className="cta-copy">
              <p className="eyebrow" style={{ color: "var(--leaf)" }}>
                {t("cta.eyebrow")}
              </p>
              <h2 className="h2 cta-title">{t("cta.title")}</h2>
              <p className="lead cta-lead">{t("cta.lead")}</p>
              <p className="cta-brochure-line">{tb("brochureLine")}</p>

              <div className="cta-actions">
                <QuoteButton className="btn btn-leaf btn-lg">
                  {t("cta.ctaQuote")} <span className="arr">→</span>
                </QuoteButton>
                <QuoteButton mode="brochure" className="btn btn-on-dark btn-lg">
                  {tb("brochureBtn")} <span className="arr">→</span>
                </QuoteButton>
              </div>

              <p className="cta-note">
                {tb("noteLead")}{" "}
                <a href={`mailto:${company.email}`}>{company.email}</a>
                <span aria-hidden="true"> · </span>
                <a href={company.mobileHref}>{company.mobile}</a>
              </p>
            </div>

            <QuoteButton mode="brochure" className="cta-cover" ariaLabel={tb("brochureBtn")}>
              <span className="book">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brochure-cover.webp"
                  alt={tb("coverAlt")}
                  width={560}
                  height={725}
                  loading="lazy"
                />
              </span>
              <span className="cap">{tb("coverCaption")}</span>
              <span className="sub">{tb("coverMeta")}</span>
            </QuoteButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
