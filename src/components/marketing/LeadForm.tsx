"use client";

import { FormEvent, useState } from "react";

type LeadFormProps = {
  variant?: "contact" | "quote";
};

const modes = ["FTL", "LTL", "Expedited", "Dedicated / recurring", "Not sure"];
const equipment = ["Dry Van", "Reefer", "Flatbed", "Step Deck", "Hot Shot", "Power Only", "Other"];

export function LeadForm({ variant = "contact" }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const subject =
        variant === "quote"
          ? `Truck quote: ${payload.origin || "N/A"} → ${payload.destination || "N/A"}`
          : `Website contact from ${payload.name || "prospect"}`;

      const body = Object.entries(payload)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");

      console.info("[AOL lead]", payload);
      window.open(
        `mailto:ops@airoceanlogistics.us?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
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
      <div className="card-glow border-brand-red/20 bg-gradient-to-br from-white to-steel-50">
        <p className="eyebrow">Request received</p>
        <h3 className="mt-2 text-xl font-semibold text-navy-900">We&apos;re on it</h3>
        <p className="mt-2 text-sm leading-relaxed text-steel-500">
          Your details were prepared for our team. If your email client opened, hit send. For
          time-critical loads, call us directly.
        </p>
        <button type="button" className="btn-dark mt-6" onClick={() => setStatus("idle")}>
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-glow space-y-5">
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
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="mode">
              Service type
            </label>
            <select id="mode" name="mode" className="input" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {modes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="equipment">
              Equipment
            </label>
            <select id="equipment" name="equipment" className="input" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {equipment.map((eq) => (
                <option key={eq} value={eq}>
                  {eq}
                </option>
              ))}
            </select>
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
              placeholder="City, ST (U.S.)"
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
              placeholder="City, ST (U.S.)"
            />
          </div>
          <div>
            <label className="label" htmlFor="readyDate">
              Pickup date
            </label>
            <input id="readyDate" name="readyDate" type="date" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="weight">
              Weight / pallets
            </label>
            <input
              id="weight"
              name="weight"
              className="input"
              placeholder="e.g. 42,000 lbs · 26 pallets"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="cargo">
              Commodity
            </label>
            <input
              id="cargo"
              name="cargo"
              className="input"
              placeholder="Commodity, dimensions, hazmat?"
            />
          </div>
        </div>
      )}

      <div>
        <label className="label" htmlFor="message">
          {variant === "quote" ? "Accessorials & notes" : "How can we help?"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required={variant === "contact"}
          className="input resize-y"
          placeholder={
            variant === "quote"
              ? "Liftgate, appointment, team drivers, drop trailer, residential..."
              : "Tell us about your U.S. trucking needs."
          }
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-brand-red">Something went wrong. Please call or email us directly.</p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting"
          ? "Sending…"
          : variant === "quote"
            ? "Submit truck quote"
            : "Send message"}
      </button>
    </form>
  );
}
