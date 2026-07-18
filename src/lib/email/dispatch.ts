/**
 * Notify dispatch@ of high-intent site leads (target rates, contact, RFQ).
 *
 * Priority:
 *  1. Resend  — set RESEND_API_KEY (+ optional RESEND_FROM)
 *  2. FormSubmit — zero-config fallback to DISPATCH_EMAIL (activate once via their inbox)
 */

export const DISPATCH_EMAIL =
  process.env.DISPATCH_EMAIL?.trim() || "dispatch@airoceanlogistics.us";

export type DispatchMail = {
  subject: string;
  /** Plain-text body (always included) */
  text: string;
  /** Optional HTML body */
  html?: string;
  /** Shipper email for Reply-To */
  replyTo?: string;
  /** Extra key/value rows for table-style providers */
  fields?: Record<string, string | number | boolean | null | undefined>;
};

export type DispatchMailResult = {
  ok: boolean;
  via?: "resend" | "formsubmit";
  error?: string;
};

function money(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldsToText(fields?: DispatchMail["fields"]): string {
  if (!fields) return "";
  return Object.entries(fields)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
}

function fieldsToHtmlTable(fields?: DispatchMail["fields"]): string {
  if (!fields) return "";
  const rows = Object.entries(fields)
    .filter(([, v]) => v != null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;color:#0f172a;font-weight:600">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("");
  return rows
    ? `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">${rows}</table>`
    : "";
}

async function sendViaResend(mail: DispatchMail): Promise<DispatchMailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not set" };

  const from =
    process.env.RESEND_FROM?.trim() ||
    "Air & Ocean Logistics <onboarding@resend.dev>";

  const html =
    mail.html ||
    `<div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">
      <p style="margin:0 0 12px;font-size:16px;font-weight:700">${escapeHtml(mail.subject)}</p>
      ${fieldsToHtmlTable(mail.fields)}
      <pre style="margin-top:16px;white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;background:#f8fafc;padding:12px;border-radius:8px">${escapeHtml(mail.text)}</pre>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [DISPATCH_EMAIL],
      subject: mail.subject,
      text: mail.text,
      html,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return {
      ok: false,
      error: `Resend ${res.status}: ${body.slice(0, 300)}`,
    };
  }

  return { ok: true, via: "resend" };
}

/**
 * FormSubmit — works with only the destination inbox.
 * First send triggers an activation email to DISPATCH_EMAIL; click Activate once.
 */
async function sendViaFormSubmit(mail: DispatchMail): Promise<DispatchMailResult> {
  const payload: Record<string, string> = {
    _subject: mail.subject,
    _template: "table",
    _captcha: "false",
    _honey: "",
    message: mail.text,
    ...(mail.replyTo ? { email: mail.replyTo, _replyto: mail.replyTo } : {}),
  };

  if (mail.fields) {
    for (const [k, v] of Object.entries(mail.fields)) {
      if (v != null && v !== "") payload[k] = String(v);
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://airoceanlogistics.us";

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DISPATCH_EMAIL)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: siteUrl,
      Referer: `${siteUrl}/`,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.text().catch(() => "");
  if (!res.ok) {
    return { ok: false, error: `FormSubmit ${res.status}: ${body.slice(0, 300)}` };
  }

  // FormSubmit returns 200 even when activation is pending
  try {
    const json = JSON.parse(body) as { success?: string | boolean };
    if (json.success === false) {
      return { ok: false, error: body.slice(0, 300) };
    }
  } catch {
    /* plain OK */
  }

  return { ok: true, via: "formsubmit" };
}

/** Fire-and-forget friendly: never throws. Prefer Resend, else FormSubmit. */
export async function notifyDispatch(mail: DispatchMail): Promise<DispatchMailResult> {
  const textExtra = fieldsToText(mail.fields);
  const full: DispatchMail = {
    ...mail,
    text: textExtra ? `${mail.text}\n\n${textExtra}` : mail.text,
  };

  if (process.env.RESEND_API_KEY?.trim()) {
    const r = await sendViaResend(full);
    if (r.ok) return r;
    console.error("[notifyDispatch] resend failed, trying formsubmit:", r.error);
  }

  try {
    const r = await sendViaFormSubmit(full);
    if (!r.ok) console.error("[notifyDispatch] formsubmit failed:", r.error);
    return r;
  } catch (err) {
    const error = err instanceof Error ? err.message : "email failed";
    console.error("[notifyDispatch]", error);
    return { ok: false, error };
  }
}

export function formatTargetRateEmail(input: {
  status: "hot_target" | "target_submitted";
  aggressive: boolean;
  gapPct: number | null;
  marketBest: number | null;
  targetRate: number;
  origin: string;
  destination: string;
  mode?: string;
  equipment?: string;
  readyDate?: string;
  weight?: string;
  cargo?: string;
  name?: string;
  email: string;
  phone: string;
  company?: string;
  flexiblePickup?: boolean;
  canWait?: boolean;
  notes?: string;
}): DispatchMail {
  const flag =
    input.status === "hot_target"
      ? "HOT TARGET"
      : input.aggressive
        ? "AGGRESSIVE TARGET"
        : "TARGET RATE";

  const gap =
    input.gapPct != null
      ? `${input.gapPct > 0 ? "+" : ""}${input.gapPct}% vs market`
      : "n/a";

  const subject = `[${flag}] ${input.origin} → ${input.destination} · ${money(input.targetRate)}`;

  const fields: Record<string, string | number | boolean | null | undefined> = {
    Priority: flag,
    "Market best": money(input.marketBest),
    "Shipper target": money(input.targetRate),
    Gap: gap,
    Lane: `${input.origin} → ${input.destination}`,
    Mode: input.mode ?? "",
    Equipment: input.equipment ?? "",
    "Pickup date": input.readyDate ?? "",
    Weight: input.weight ?? "",
    Commodity: input.cargo ?? "",
    Name: input.name ?? "",
    Email: input.email,
    Phone: input.phone,
    Company: input.company ?? "",
    "Flexible pickup": input.flexiblePickup ? "Yes" : "No",
    "Can wait +1 day": input.canWait ? "Yes" : "No",
    Notes: input.notes ?? "",
  };

  const text = [
    `New target rate from the website — action needed.`,
    ``,
    `Target: ${money(input.targetRate)}  |  Market: ${money(input.marketBest)}  |  ${gap}`,
    `Lane: ${input.origin} → ${input.destination}`,
    `Contact: ${input.name || "—"} · ${input.email} · ${input.phone}`,
    input.notes ? `Notes: ${input.notes}` : "",
    ``,
    `Reply to the shipper email to confirm cover.`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject,
    text,
    fields,
    replyTo: input.email,
  };
}

export function formatLeadEmail(input: {
  kind: "contact" | "quote";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  origin?: string;
  destination?: string;
  mode?: string;
  equipment?: string;
  readyDate?: string;
  weight?: string;
  cargo?: string;
}): DispatchMail {
  const subject =
    input.kind === "quote"
      ? `[QUOTE REQUEST] ${input.origin || "—"} → ${input.destination || "—"} · ${input.name}`
      : `[CONTACT] ${input.name}${input.company ? ` · ${input.company}` : ""}`;

  const fields: Record<string, string | number | boolean | null | undefined> = {
    Type: input.kind === "quote" ? "Quote request" : "Contact form",
    Name: input.name,
    Email: input.email,
    Phone: input.phone ?? "",
    Company: input.company ?? "",
    Origin: input.origin ?? "",
    Destination: input.destination ?? "",
    Mode: input.mode ?? "",
    Equipment: input.equipment ?? "",
    "Ready date": input.readyDate ?? "",
    Weight: input.weight ?? "",
    Cargo: input.cargo ?? "",
    Message: input.message ?? "",
  };

  const text = [
    `New ${input.kind === "quote" ? "quote request" : "contact message"} from airoceanlogistics.us`,
    ``,
    `From: ${input.name} <${input.email}>`,
    input.phone ? `Phone: ${input.phone}` : "",
    input.company ? `Company: ${input.company}` : "",
    input.origin ? `Lane: ${input.origin} → ${input.destination}` : "",
    input.message ? `\n${input.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject,
    text,
    fields,
    replyTo: input.email,
  };
}
