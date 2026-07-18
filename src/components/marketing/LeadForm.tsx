"use client";

import { FormEvent, useState } from "react";

type LeadFormProps = {
  variant?: "contact" | "quote";
};

const modes = [
  "Domestic Air",
  "Truck FTL",
  "Truck LTL",
  "Expedited",
  "Intermodal",
  "Multimodal",
  "Not sure",
];

export function LeadForm({ variant = "contact" }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      // Placeholder until Supabase is wired — still captures UX + mailto fallback path
      const subject =
        variant === "quote"
          ? `Quote request: ${payload.origin || "N/A"} → ${payload.destination || "N/A"}`
          : `Website contact from ${payload.name || "prospect"}`;

      const body = Object.entries(payload)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");

      // Store a local success path; email opens as interim handoff
      console.info("[AOL lead]", payload);
      window.open(
        `mailto:quotes@airoceanlogistics.us?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_self",
      );

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card border-amber-400/40 bg-amber-400/10">
        <h3 className="text-lg font-semibold text-navy-900">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-800/80">
          Thanks — your details were prepared for our team. If your email client opened, hit send.
          You can also call us directly for time-critical moves.
        </p>
        <button type="button" className="btn-dark mt-6" onClick={() => setStatus("idle")}>
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Full name
          </label>
          <input id="name" name="name" required className="input" placeholder="Jane Rivera" />
        </div>
        <div>
          <label className="label" htmlFor="company">
            Company
          </label>
          <input id="company" name="company" className="input" placeholder="Acme Manufacturing" />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className="input" placeholder="(312) 555-0100" />
        </div>
      </div>

      {variant === "quote" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="mode">
                Preferred mode
              </label>
              <select id="mode" name="mode" className="input" defaultValue="">
                <option value="" disabled>
                  Select mode
                </option>
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="readyDate">
                Ready date
              </label>
              <input id="readyDate" name="readyDate" type="date" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="origin">
                Origin
              </label>
              <input
                id="origin"
                name="origin"
                required
                className="input"
                placeholder="City, ST (U.S. only)"
              />
            </div>
            <div>
              <label className="label" htmlFor="destination">
                Destination
              </label>
              <input
                id="destination"
                name="destination"
                required
                className="input"
                placeholder="City, ST (U.S. only)"
              />
            </div>
            <div>
              <label className="label" htmlFor="weight">
                Weight / dimensions
              </label>
              <input
                id="weight"
                name="weight"
                className="input"
                placeholder="e.g. 12,000 lbs · 4 pallets"
              />
            </div>
            <div>
              <label className="label" htmlFor="cargo">
                Cargo description
              </label>
              <input
                id="cargo"
                name="cargo"
                className="input"
                placeholder="Commodity, packaging, hazmat?"
              />
            </div>
          </div>
        </>
      )}

      <div>
        <label className="label" htmlFor="message">
          {variant === "quote" ? "Additional details" : "How can we help?"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required={variant === "contact"}
          className="input resize-y"
          placeholder={
            variant === "quote"
              ? "Appointment windows, special handling, liftgate, residential..."
              : "Tell us about your U.S. freight needs."
          }
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">Something went wrong. Please call or email us directly.</p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting"
          ? "Sending…"
          : variant === "quote"
            ? "Submit quote request"
            : "Send message"}
      </button>
    </form>
  );
}
