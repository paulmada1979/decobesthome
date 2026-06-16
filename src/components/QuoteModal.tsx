"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { megaProducts as products } from "@/lib/products";
import { company } from "@/lib/site";
import { useQuoteModal } from "./QuoteModalProvider";

export default function QuoteModal() {
  const t = useTranslations("quote");
  const tn = useTranslations("products.names");
  const { isOpen, product, close } = useQuoteModal();
  const [sent, setSent] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setSent(false);
    const id = setTimeout(() => firstFieldRef.current?.focus(), 300);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <div
      className={`modal${isOpen ? " open" : ""}`}
      id="quoteModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qmTitle"
    >
      <div className="scrim" onClick={close} />
      <div className="dialog">
        <button className="modal-close" aria-label={t("close")} onClick={close}>
          &times;
        </button>
        <div className="dhead">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h3
            className="h2"
            id="qmTitle"
            style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", marginTop: "12px" }}
          >
            {t("title")}
          </h3>
          <p className="muted" style={{ marginTop: "8px", fontSize: ".95rem" }}>
            {t("subtitle")}
          </p>
        </div>
        <div className="dbody">
          {sent ? (
            <div className="dform-success">
              <div className="success">{t("success")}</div>
              <p className="muted" style={{ marginTop: "14px", fontSize: ".92rem" }}>
                {t("preferEmail")}{" "}
                <a className="textlink" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
            </div>
          ) : (
            <form
              className="dform"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="row2">
                <div className="field">
                  <label>
                    {t("name")} <span className="req">*</span>
                  </label>
                  <input
                    ref={firstFieldRef}
                    className="input"
                    required
                    placeholder={t("namePh")}
                  />
                </div>
                <div className="field">
                  <label>{t("company")}</label>
                  <input className="input" placeholder={t("companyPh")} />
                </div>
              </div>
              <div className="row2">
                <div className="field">
                  <label>
                    {t("email")} <span className="req">*</span>
                  </label>
                  <input className="input" type="email" required placeholder={t("emailPh")} />
                </div>
                <div className="field">
                  <label>{t("country")}</label>
                  <input className="input" placeholder={t("countryPh")} />
                </div>
              </div>
              <div className="field">
                <label>{t("productOfInterest")}</label>
                <select className="select" name="product" defaultValue={product ?? undefined}>
                  {products.map((p) => (
                    <option key={p.id}>{tn(p.id)}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>{t("details")}</label>
                <textarea className="textarea" placeholder={t("detailsPh")} />
              </div>
              <button className="btn btn-leaf btn-lg" type="submit" style={{ width: "100%" }}>
                {t("submit")} <span className="arr">→</span>
              </button>
              <p className="form-note center" style={{ marginTop: "12px" }}>
                {t("privacy")}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
