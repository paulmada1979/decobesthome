import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Enquiry endpoint for the quote modal + contact form.
// Sends the enquiry to the sales inbox with reply-to set to the customer,
// so replying in the inbox goes straight back to them.
export const runtime = "nodejs";

const TO = "sales@decobesthome.com";
const FROM = "BestHome Enquiries <enquiries@decobesthome.com>";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const get = (k: string) => (typeof body[k] === "string" ? body[k].trim() : "");
  const name = get("name");
  const email = get("email");
  const message = get("message") || get("details");
  const company = get("company");
  const phone = get("phone");
  const country = get("country");
  const product = get("product");
  const source = body.source === "quote" ? "Quote modal" : "Contact page";

  if (!name || !email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Phone / WhatsApp", phone],
    ["Country", country],
    ["Product of interest", product],
    ["Source", source],
  ].filter(([, v]) => v) as [string, string][];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1a1a1a">
      <h2 style="margin:0 0 16px">New enquiry${product ? ` — ${esc(product)}` : ""}</h2>
      <table style="border-collapse:collapse;margin-bottom:18px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">${esc(
                k,
              )}</td><td style="padding:4px 0">${esc(v)}</td></tr>`,
          )
          .join("")}
      </table>
      ${
        message
          ? `<p style="margin:0 0 6px;color:#666">Message</p><p style="margin:0;white-space:pre-wrap">${esc(
              message,
            )}</p>`
          : ""
      }
    </div>`;

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    (message ? `\n\nMessage:\n${message}` : "");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry${product ? ` — ${product}` : ""} — ${name}`,
      html,
      text,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Enquiry send threw:", e);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
