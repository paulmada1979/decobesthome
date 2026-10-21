"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { megaProducts as products } from "@/lib/products";
import { company } from "@/lib/site";
import { useQuoteModal } from "./QuoteModalProvider";

export default function QuoteModal() {
  const t = useTranslations("quote");
  const tn = useTranslations("products.names");
  const tf = useTranslations("contact.form"); // phone wording, shared with the contact page form
  const { isOpen, product, mode, close } = useQuoteModal();
  const brochure = mode === "brochure";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: brochure ? "brochure" : "quote",
          page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setStatus("idle");
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
          <p className="eyebrow">{brochure ? t("brochureEyebrow") : t("eyebrow")}</p>
          <h3
            className="h2"
            id="qmTitle"
            style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", marginTop: "12px" }}
          >
            {brochure ? t("brochureTitle") : t("title")}
          </h3>
          <p className="muted" style={{ marginTop: "8px", fontSize: ".95rem" }}>
            {brochure ? t("brochureSubtitle") : t("subtitle")}
          </p>
        </div>
        <div className="dbody">
          {status === "sent" ? (
            <div className="dform-success">
              <div className="success">{brochure ? t("brochureSuccess") : t("success")}</div>
              <p className="muted" style={{ marginTop: "14px", fontSize: ".92rem" }}>
                {t("preferEmail")}{" "}
                <a className="textlink" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
            </div>
          ) : (
            <form className="dform" onSubmit={onSubmit}>
              {status === "error" && (
                <div className="form-error" role="alert" style={{ marginBottom: "16px" }}>
                  {t("error")}{" "}
                  <a className="textlink" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </div>
              )}
              <div className="row2">
                <div className="field">
                  <label>
                    {t("name")} <span className="req">*</span>
                  </label>
                  <input
                    ref={firstFieldRef}
                    className="input"
                    name="name"
                    required
                    placeholder={t("namePh")}
                  />
                </div>
                <div className="field">
                  <label>{t("company")}</label>
                  <input className="input" name="company" placeholder={t("companyPh")} />
                </div>
              </div>
              <div className="row2">
                <div className="field">
                  <label>
                    {t("email")} <span className="req">*</span>
                  </label>
                  <input className="input" name="email" type="email" required placeholder={t("emailPh")} />
                </div>
                <div className="field">
                  <label>{tf("phone")}</label>
                  <input className="input" name="phone" type="tel" autoComplete="tel" placeholder={tf("phonePh")} />
                </div>
              </div>
              {brochure ? (
                <div className="field">
                  <label>{t("country")}</label>
                  <input className="input" name="country" placeholder={t("countryPh")} />
                </div>
              ) : (
                <>
                  <div className="row2">
                    <div className="field">
                      <label>{t("country")}</label>
                      <input className="input" name="country" placeholder={t("countryPh")} />
                    </div>
                    <div className="field">
                      <label>{t("productOfInterest")}</label>
                      <select className="select" name="product" defaultValue={product ?? undefined}>
                        {products.map((p) => (
                          <option key={p.id}>{tn(p.id)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>{t("details")}</label>
                    <textarea className="textarea" name="message" placeholder={t("detailsPh")} />
                  </div>
                </>
              )}
              <button
                className="btn btn-leaf btn-lg"
                type="submit"
                disabled={status === "sending"}
                style={{ width: "100%", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? t("sending") : brochure ? t("brochureSubmit") : t("submit")}{" "}
                <span className="arr">→</span>
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
