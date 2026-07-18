"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  getInstantQuickloadQuote,
  type InstantQuoteResult,
} from "@/app/actions/quickload-quote";
import { site } from "@/content/site";

type Mode = "FTL" | "Partial";

const truckTypes = ["Dry Van", "Reefer", "Flatbed", "Step Deck", "Power Only"];

function money(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function QuickQuote() {
  const [mode, setMode] = useState<Mode>("FTL");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Extract<InstantQuoteResult, { ok: true }> | null>(null);

  const defaultDate = useMemo(() => tomorrowISO(), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    formData.set("mode", mode);

    try {
      const res = await getInstantQuickloadQuote(formData);
      if (!res.ok) {
        setError(res.error);
        setStatus("error");
        return;
      }
      setResult(res);
      setStatus("done");
    } catch {
      setError("Unexpected error getting a quote. Please try again or call ops.");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Form — QuickLoad-style Quick Quote */}
      <div className="lg:col-span-7">
        <div className="card-glow overflow-hidden p-0">
          <div className="border-b border-steel-200 bg-white px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-navy-900">
                  Quick <span className="text-brand-orange">Quote</span>
                </h2>
                <p className="mt-1 text-sm text-steel-500">
                  Live U.S. truck rates in seconds · FTL &amp; partial
                </p>
              </div>
            </div>

            {/* Mode tabs like QuickLoad */}
            <div className="mt-5 flex overflow-hidden rounded-md border border-steel-200">
              {(
                [
                  { id: "FTL" as const, label: "Full Truck" },
                  { id: "Partial" as const, label: "Partial" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setMode(tab.id);
                    setStatus("idle");
                    setResult(null);
                    setError(null);
                  }}
                  className={`flex-1 px-3 py-3 text-sm font-semibold transition ${
                    mode === tab.id
                      ? "bg-brand-orange text-white"
                      : "bg-steel-50 text-navy-900 hover:bg-steel-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label" htmlFor="originCity">
                  Origin city
                </label>
                <input id="originCity" name="originCity" className="input" placeholder="Chicago" />
              </div>
              <div>
                <label className="label" htmlFor="originState">
                  State
                </label>
                <input
                  id="originState"
                  name="originState"
                  required
                  maxLength={2}
                  className="input uppercase"
                  placeholder="IL"
                />
              </div>
              <div>
                <label className="label" htmlFor="originZip">
                  ZIP
                </label>
                <input
                  id="originZip"
                  name="originZip"
                  required
                  className="input"
                  placeholder="60601"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label" htmlFor="destCity">
                  Destination city
                </label>
                <input id="destCity" name="destCity" className="input" placeholder="Dallas" />
              </div>
              <div>
                <label className="label" htmlFor="destState">
                  State
                </label>
                <input
                  id="destState"
                  name="destState"
                  required
                  maxLength={2}
                  className="input uppercase"
                  placeholder="TX"
                />
              </div>
              <div>
                <label className="label" htmlFor="destZip">
                  ZIP
                </label>
                <input
                  id="destZip"
                  name="destZip"
                  required
                  className="input"
                  placeholder="75201"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="pickupDate">
                  Pickup date
                </label>
                <input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  required
                  className="input"
                  defaultValue={defaultDate}
                />
              </div>
              {mode === "FTL" ? (
                <div>
                  <label className="label" htmlFor="equipment">
                    Truck type
                  </label>
                  <select id="equipment" name="equipment" className="input" defaultValue="Dry Van">
                    {truckTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="label" htmlFor="freightClass">
                    Freight class
                  </label>
                  <input
                    id="freightClass"
                    name="freightClass"
                    type="number"
                    step="0.1"
                    className="input"
                    defaultValue={70}
                    placeholder="70"
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="weight">
                  Weight (lbs) {mode === "Partial" && <span className="text-brand-red">*</span>}
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  min={1}
                  required={mode === "Partial"}
                  className="input"
                  placeholder={mode === "FTL" ? "e.g. 42000" : "e.g. 2500"}
                />
              </div>
              <div>
                <label className="label" htmlFor="qty">
                  {mode === "Partial" ? "Handling units / pallets" : "Units (optional)"}
                </label>
                <input id="qty" name="qty" type="number" min={1} className="input" defaultValue={1} />
              </div>
            </div>

            {mode === "Partial" && (
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="label" htmlFor="length">
                    Length (in)
                  </label>
                  <input id="length" name="length" type="number" className="input" defaultValue={48} />
                </div>
                <div>
                  <label className="label" htmlFor="width">
                    Width (in)
                  </label>
                  <input id="width" name="width" type="number" className="input" defaultValue={40} />
                </div>
                <div>
                  <label className="label" htmlFor="height">
                    Height (in)
                  </label>
                  <input id="height" name="height" type="number" className="input" defaultValue={48} />
                </div>
              </div>
            )}

            <div>
              <label className="label" htmlFor="commodity">
                Commodity
              </label>
              <input
                id="commodity"
                name="commodity"
                className="input"
                placeholder="General freight"
                defaultValue="General freight"
              />
            </div>

            <div className="border-t border-navy-900/8 pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-steel-500">
                Your contact (for follow-up)
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" className="input" placeholder="Jane Rivera" />
                </div>
                <div>
                  <label className="label" htmlFor="company">
                    Company
                  </label>
                  <input id="company" name="company" className="input" placeholder="Acme Mfg" />
                </div>
                <div>
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input id="email" name="email" type="email" className="input" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="label" htmlFor="phone">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" className="input" placeholder="(312) 555-0100" />
                </div>
              </div>
            </div>

            {(status === "error" || error) && (
              <div className="rounded-xl border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-green w-full !py-3.5 text-base"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Getting price…" : "Get a Quote"}
            </button>

            <p className="text-center text-xs text-steel-500">
              Rates via QuickLoad network · U.S. trucking only · Need help?{" "}
              <a href={site.contact.phoneHref} className="font-semibold text-navy-900">
                {site.contact.phone}
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Results panel */}
      <div className="lg:col-span-5">
        <div className="card sticky top-28 min-h-[320px] p-6 sm:p-8">
          <p className="eyebrow">Your price</p>
          <h3 className="mt-2 text-xl font-semibold text-navy-900">Live quote results</h3>

          {status === "idle" && (
            <p className="mt-4 text-sm leading-relaxed text-steel-500">
              Enter lane details and click <strong>Get a Quote</strong>. We query QuickLoad and show
              priced options here — just like their platform.
            </p>
          )}

          {status === "loading" && (
            <div className="mt-8 flex flex-col items-center gap-3 py-10 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-navy-900/15 border-t-brand-red" />
              <p className="text-sm font-medium text-navy-900">Talking to QuickLoad…</p>
              <p className="text-xs text-steel-500">Fetching FTL / LTL rates for your lane</p>
            </div>
          )}

          {status === "done" && result && (
            <div className="mt-5 space-y-5">
              <div className="rounded-2xl bg-gradient-to-br from-ink to-navy-900 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-300">
                  Best available
                </p>
                <p className="mt-2 text-4xl font-semibold tracking-tight">
                  {money(result.bestPrice)}
                </p>
                <p className="mt-1 text-sm text-steel-300">
                  {result.mode === "FTL" ? "Full truckload" : "Partial / LTL"} · from QuickLoad
                </p>
              </div>

              {result.qlQuote && result.qlQuote.totalAmount != null && result.qlQuote.totalAmount > 0 && (
                <div className="rounded-xl border border-navy-900/8 bg-steel-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-navy-900">QuickLoad rate</p>
                      <p className="text-xs text-steel-500">
                        Transit ~{result.qlQuote.transitDays ?? "—"} days
                        {result.qlQuote.quoteId ? ` · Quote #${result.qlQuote.quoteId}` : ""}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-navy-900">
                      {money(result.qlQuote.totalAmount)}
                    </p>
                  </div>
                </div>
              )}

              {result.rates.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-steel-500">
                    Marketplace options
                  </p>
                  <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
                    {result.rates.map((r, idx) => (
                      <li
                        key={`${r.rateId ?? idx}-${r.totalAmount}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-navy-900/8 bg-white px-3 py-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-navy-900">
                            {r.carrierName || r.serviceLevel || "Carrier option"}
                          </p>
                          <p className="text-xs text-steel-500">
                            {r.serviceLevel ? `${r.serviceLevel} · ` : ""}
                            Transit {r.transitDays ?? "—"}d
                            {r.quoteNumber ? ` · ${r.quoteNumber}` : ""}
                          </p>
                        </div>
                        <p className="shrink-0 font-semibold text-navy-900">
                          {money(r.totalAmount)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.message && (
                <p className="text-sm text-steel-500">{result.message}</p>
              )}

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs leading-relaxed text-navy-800">
                Prices are live estimates from QuickLoad and can change with capacity, accessorials,
                and appointment needs. Book with ops to lock a rate:{" "}
                <a href={site.contact.phoneHref} className="font-semibold">
                  {site.contact.phone}
                </a>{" "}
                ·{" "}
                <a href={site.contact.emailHref} className="font-semibold">
                  {site.contact.email}
                </a>
              </div>

              <button
                type="button"
                className="btn-ghost w-full"
                onClick={() => {
                  setStatus("idle");
                  setResult(null);
                }}
              >
                New quote
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
