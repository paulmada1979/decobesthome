"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { products } from "@/lib/products";
import { company } from "@/lib/site";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tn = useTranslations("products.names");
  const [sent, setSent] = useState(false);

  if (sent) {
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

  return (
    <form
      data-contact
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
          <input className="input" required placeholder={t("namePh")} />
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
          <label>{t("phone")}</label>
          <input className="input" placeholder={t("phonePh")} />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label>{t("country")}</label>
          <input className="input" placeholder={t("countryPh")} />
        </div>
        <div className="field">
          <label>{t("productOfInterest")}</label>
          <select className="select" defaultValue={tn("bamboo-fencing-edging")}>
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
        <textarea className="textarea" required placeholder={t("messagePh")} />
      </div>
      <button className="btn btn-leaf btn-lg" type="submit" style={{ width: "100%" }}>
        {t("submit")} <span className="arr">→</span>
      </button>
      <p className="form-note" style={{ marginTop: "12px" }}>
        {t("privacy")}
      </p>
    </form>
  );
}
