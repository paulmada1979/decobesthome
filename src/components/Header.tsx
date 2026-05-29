"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { company, logos } from "@/lib/site";
import { megaProducts } from "@/lib/products";
import { useQuoteModal } from "./QuoteModalProvider";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const tn = useTranslations("products.names");
  const tm = useTranslations("products.mega");
  const { open } = useQuoteModal();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* UTILITY */}
      <div className="utility">
        <div className="container">
          <div className="u-left">
            <span>
              <span className="u-dot" /> {th("utilityLeft")}
            </span>
            <span className="hide-sm">{th("utilityLeft2")}</span>
          </div>
          <div className="u-right">
            <a className="hide-sm" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <a href={company.mobileHref}>{company.mobile}</a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container nav">
          <Link className="brand" href="/" aria-label={th("brandAria")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logos.wordmark} alt="BestHome" />
          </Link>
          <nav aria-label="Primary">
            <ul className="nav-links">
              <li>
                <Link href="/">{t("home")}</Link>
              </li>
              <li>
                <Link href="/about">{t("about")}</Link>
              </li>
              <li className="has-mega">
                <button className="nav-trigger" type="button">
                  {t("products")}{" "}
                  <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="mega">
                  <div className="mega-grid">
                    {megaProducts.map((p) => (
                      <Link key={p.id} className="mega-item" href={`/products/${p.slug}`}>
                        <span className="ico">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.image} alt="" loading="lazy" />
                          ) : (
                            p.icon
                          )}
                        </span>
                        <span>
                          <span className="t">{tn(p.id)}</span>
                          <span className="d">{tm(p.id)}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mega-foot">
                    <span className="muted" style={{ fontSize: ".86rem" }}>
                      {th("megaFoot")}
                    </span>
                    <Link className="textlink" href="/products">
                      {th("viewAll")} <span className="arr">→</span>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/blog">{t("journal")}</Link>
              </li>
              <li>
                <Link href="/inspiration">{t("inspiration")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("contact")}</Link>
              </li>
            </ul>
          </nav>
          <div className="nav-actions">
            <LocaleSwitcher className="desk" />
            <button className="btn btn-leaf desk" type="button" onClick={() => open()}>
              {th("requestQuote")}
            </button>
            <button
              className="burger"
              aria-label={th("openMenu")}
              onClick={() => setDrawerOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER */}
      <div className={`drawer${drawerOpen ? " open" : ""}`} id="drawer">
        <div className="scrim" onClick={closeDrawer} />
        <div className="panel">
          <button className="drawer-close" aria-label={th("close")} onClick={closeDrawer}>
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logos.wordmark}
            alt="BestHome"
            style={{ height: "30px", marginBottom: "24px" }}
          />
          <Link href="/" onClick={closeDrawer}>
            {t("home")}
          </Link>
          <Link href="/about" onClick={closeDrawer}>
            {t("about")}
          </Link>
          <Link href="/products" onClick={closeDrawer}>
            {t("products")}
          </Link>
          <Link href="/blog" onClick={closeDrawer}>
            {t("journal")}
          </Link>
          <Link href="/inspiration" onClick={closeDrawer}>
            {t("inspiration")}
          </Link>
          <Link href="/contact" onClick={closeDrawer}>
            {t("contact")}
          </Link>
          <LocaleSwitcher className="drawer-locale" />
          <button
            className="btn btn-leaf"
            type="button"
            style={{ marginTop: "20px", width: "100%" }}
            onClick={() => {
              closeDrawer();
              open();
            }}
          >
            {th("requestQuote")}
          </button>
        </div>
      </div>
    </>
  );
}
