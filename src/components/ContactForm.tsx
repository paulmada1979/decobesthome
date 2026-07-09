"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { megaProducts as products } from "@/lib/products";
import { company } from "@/lib/site";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tn = useTranslations("products.names");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="success">
        {t("success")}{" "}
        <a className="textlink" href={`mailto:${company.email}`}>
          {company.email}
        </a>
        .
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form data-contact onSubmit={onSubmit}>
      {status === "error" && (
        <div className="form-error" role="alert" style={{ marginBottom: "16px" }}>
          {t("error")}{" "}
          <a className="textlink" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          .
        </div>
      )}
      <div className="row2">
        <div className="field">
          <label>
            {t("name")} <span className="req">*</span>
          </label>
          <input className="input" name="name" required placeholder={t("namePh")} />
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
          <label>{t("phone")}</label>
          <input className="input" name="phone" placeholder={t("phonePh")} />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label>{t("country")}</label>
          <input className="input" name="country" placeholder={t("countryPh")} />
        </div>
        <div className="field">
          <label>{t("productOfInterest")}</label>
          <select className="select" name="product" defaultValue={tn("bamboo-fencing-edging")}>
            {products.map((p) => (
              <option key={p.id}>{tn(p.id)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label>
          {t("message")} <span className="req">*</span>
        </label>
        <textarea className="textarea" name="message" required placeholder={t("messagePh")} />
      </div>
      <button
        className="btn btn-leaf btn-lg"
        type="submit"
        disabled={sending}
        style={{ width: "100%", opacity: sending ? 0.7 : 1 }}
      >
        {sending ? t("sending") : t("submit")} <span className="arr">→</span>
      </button>
      <p className="form-note" style={{ marginTop: "12px" }}>
        {t("privacy")}
      </p>
    </form>
  );
}
