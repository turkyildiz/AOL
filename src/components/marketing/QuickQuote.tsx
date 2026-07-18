"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  getInstantQuickloadQuote,
  type InstantQuoteResult,
  type QuoteLaneContext,
} from "@/app/actions/quickload-quote";
import { submitTargetRate } from "@/app/actions/target-rate";
import { site } from "@/content/site";

type Mode = "FTL" | "Partial";
type Layout = "page" | "hero";

const truckTypes = ["Dry Van", "Reefer", "Flatbed", "Step Deck", "Power Only"];

function money(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

type QuickQuoteProps = {
  /** hero = compact card for video landing; page = full two-column layout */
  layout?: Layout;
};

type TargetState = "idle" | "loading" | "done" | "error";

function TargetRatePanel({
  marketBest,
  lane,
  compact,
}: {
  marketBest: number | null;
  lane: QuoteLaneContext;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<TargetState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [targetValue, setTargetValue] = useState(() => {
    if (marketBest != null && marketBest > 0) {
      return String(Math.round(marketBest * 0.9));
    }
    return "";
  });

  const targetNum = Number(String(targetValue).replace(/[$,\s]/g, ""));
  const ratio =
    marketBest != null && marketBest > 0 && Number.isFinite(targetNum) && targetNum > 0
      ? targetNum / marketBest
      : null;
  const aggressive = ratio != null && ratio < 0.7;
  const hot = ratio != null && ratio >= 0.85;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("marketBest", marketBest != null ? String(marketBest) : "");
    formData.set("targetRate", String(targetValue).replace(/[$,\s]/g, ""));
    formData.set("mode", lane.mode === "Partial" ? "LTL / Partial" : "FTL");
    formData.set("equipment", lane.equipment);
    formData.set("origin", lane.origin);
    formData.set("destination", lane.destination);
    formData.set("readyDate", lane.readyDate);
    formData.set("weight", lane.weight);
    formData.set("cargo", lane.cargo);

    try {
      const res = await submitTargetRate(formData);
      if (!res.ok) {
        setError(res.error);
        setStatus("error");
        return;
      }
      setSuccessMsg(res.message);
      setStatus("done");
    } catch {
      setError("Could not submit. Please try again or call ops.");
      setStatus("error");
    }
  }

  if (status === "done" && successMsg) {
    return (
      <div
        className={`rounded-xl border border-brand-green/30 bg-green-50 ${
          compact ? "mt-3 px-3 py-3" : "mt-5 px-4 py-4"
        }`}
      >
        <p className="text-sm font-semibold text-navy-900">Target received</p>
        <p className="mt-1 text-sm leading-relaxed text-steel-600">{successMsg}</p>
        <p className="mt-2 text-xs text-steel-500">
          Questions?{" "}
          <a href={site.contact.phoneHref} className="font-semibold text-navy-900">
            {site.contact.phone}
          </a>
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className={compact ? "mt-3" : "mt-5"}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-lg border border-dashed border-steel-300 bg-white px-3 py-3 text-left transition hover:border-brand-orange/50 hover:bg-orange-50/40"
        >
          <p className="text-sm font-semibold text-navy-900">
            Prefer a different number?
          </p>
          <p className="mt-0.5 text-xs text-steel-500">
            Submit your target rate — we&apos;ll try to cover this load
          </p>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-xl border border-steel-200 bg-white ${
        compact ? "mt-3 space-y-2.5 p-3" : "mt-5 space-y-3 p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-navy-900">Submit your target rate</p>
          <p className="mt-0.5 text-xs text-steel-500">
            {marketBest != null
              ? `Market best ${money(marketBest)} · we work toward your number`
              : "Ops will work this load against capacity"}
          </p>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-steel-500 hover:text-navy-900"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </div>

      <div>
        <label className="label" htmlFor="targetRate">
          Your target ($)
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-steel-500">
            $
          </span>
          <input
            id="targetRate"
            name="targetRate"
            type="number"
            min={1}
            step={1}
            required
            className="input !pl-7"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            placeholder="e.g. 3200"
          />
        </div>
        {ratio != null && Number.isFinite(targetNum) && targetNum > 0 && (
          <p
            className={`mt-1.5 text-xs ${
              aggressive
                ? "text-brand-orange"
                : hot
                  ? "text-brand-green"
                  : "text-steel-500"
            }`}
          >
            {aggressive
              ? "Aggressive vs market — still send it; ops will review."
              : hot
                ? "Strong target — good chance we can work this."
                : `${Math.round((1 - ratio) * 100)}% under market — we'll try to cover.`}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-navy-900">
        <label className="inline-flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            name="flexiblePickup"
            className="rounded border-steel-300 text-brand-orange focus:ring-brand-orange"
          />
          Flexible pickup
        </label>
        <label className="inline-flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            name="canWait"
            className="rounded border-steel-300 text-brand-orange focus:ring-brand-orange"
          />
          Can wait +1 day
        </label>
      </div>

      <div className={`grid gap-2 ${compact ? "" : "sm:grid-cols-2"}`}>
        <input
          name="email"
          type="email"
          required
          className="input"
          placeholder="Email *"
          autoComplete="email"
        />
        <input
          name="phone"
          type="tel"
          required
          className="input"
          placeholder="Phone *"
          autoComplete="tel"
        />
        {!compact && (
          <>
            <input name="name" className="input" placeholder="Name" autoComplete="name" />
            <input name="company" className="input" placeholder="Company" />
          </>
        )}
      </div>

      {!compact && (
        <div>
          <label className="label" htmlFor="targetNotes">
            Notes (optional)
          </label>
          <textarea
            id="targetNotes"
            name="notes"
            rows={2}
            className="input min-h-[64px] resize-y"
            placeholder="Commodity, appointments, special equipment…"
          />
        </div>
      )}

      {(status === "error" || error) && (
        <div className="rounded-md border border-brand-orange/30 bg-orange-50 px-3 py-2 text-sm text-brand-orange">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn-primary w-full !py-3 text-sm"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Work this load at my rate"}
      </button>

      <p className="text-center text-[11px] leading-snug text-steel-500">
        Not a booking guarantee — ops matches capacity and confirms if we can cover your target.
      </p>
    </form>
  );
}

export function QuickQuote({ layout = "page" }: QuickQuoteProps) {
  const [mode, setMode] = useState<Mode>("FTL");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Extract<InstantQuoteResult, { ok: true }> | null>(null);
  const defaultDate = useMemo(() => tomorrowISO(), []);
  const isHero = layout === "hero";

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

  const formCard = (
    <div
      className={`overflow-hidden rounded-xl border border-steel-200 bg-white shadow-2xl ${
        isHero ? "shadow-black/40" : "card-glow shadow-[0_8px_30px_rgba(27,41,55,0.08)]"
      }`}
    >
      <div className={`border-b border-steel-200 bg-white ${isHero ? "px-4 py-4 sm:px-6" : "px-6 py-5 sm:px-8"}`}>
        <h2 className={`font-semibold tracking-tight text-navy-900 ${isHero ? "text-xl" : "text-2xl"}`}>
          Quick <span className="text-brand-orange">Quote</span>
        </h2>
        <p className="mt-1 text-sm text-steel-500">
          Live U.S. truck rates in seconds · FTL &amp; partial
        </p>

        <div className="mt-4 flex overflow-hidden rounded-md border border-steel-200">
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
              className={`flex-1 px-3 py-2.5 text-sm font-semibold transition ${
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

      <form
        onSubmit={onSubmit}
        className={`space-y-3 ${isHero ? "p-4 sm:p-5" : "space-y-5 p-6 sm:p-8"}`}
      >
        <div className="grid gap-3 sm:grid-cols-3">
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

        <div className="grid gap-3 sm:grid-cols-3">
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

        <div className="grid gap-3 sm:grid-cols-2">
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
              />
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="weight">
              Weight (lbs) {mode === "Partial" && <span className="text-brand-orange">*</span>}
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
              {mode === "Partial" ? "Pallets / units" : "Units (optional)"}
            </label>
            <input id="qty" name="qty" type="number" min={1} className="input" defaultValue={1} />
          </div>
        </div>

        {mode === "Partial" && (
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="label" htmlFor="length">
                L (in)
              </label>
              <input id="length" name="length" type="number" className="input" defaultValue={48} />
            </div>
            <div>
              <label className="label" htmlFor="width">
                W (in)
              </label>
              <input id="width" name="width" type="number" className="input" defaultValue={40} />
            </div>
            <div>
              <label className="label" htmlFor="height">
                H (in)
              </label>
              <input id="height" name="height" type="number" className="input" defaultValue={48} />
            </div>
          </div>
        )}

        {!isHero && (
          <>
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
            <div className="border-t border-steel-200 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-steel-500">
                Contact (optional)
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="name" className="input" placeholder="Name" />
                <input name="company" className="input" placeholder="Company" />
                <input name="email" type="email" className="input" placeholder="Email" />
                <input name="phone" type="tel" className="input" placeholder="Phone" />
              </div>
            </div>
          </>
        )}

        {isHero && (
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="email" type="email" className="input" placeholder="Email (optional)" />
            <input name="phone" type="tel" className="input" placeholder="Phone (optional)" />
            <input type="hidden" name="commodity" value="General freight" />
          </div>
        )}

        {(status === "error" || error) && (
          <div className="rounded-md border border-brand-orange/30 bg-orange-50 px-3 py-2 text-sm text-brand-orange">
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
          Rates via Air &amp; Ocean network · U.S. trucking only · Need help?{" "}
          <a href={site.contact.phoneHref} className="font-semibold text-navy-900">
            {site.contact.phone}
          </a>
        </p>
      </form>

      {/* Inline results for hero landing */}
      {isHero && status === "loading" && (
        <div className="border-t border-steel-200 px-5 py-6 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-navy-900/15 border-t-brand-orange" />
          <p className="mt-3 text-sm font-medium text-navy-900">Getting your rate…</p>
        </div>
      )}

      {isHero && status === "done" && result && (
        <div className="border-t border-steel-200 bg-steel-50 px-5 py-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-steel-500">Best price</p>
              <p className="text-3xl font-bold text-navy-900">{money(result.bestPrice)}</p>
              <p className="text-xs text-steel-500">
                {result.mode === "FTL" ? "Full truckload" : "Partial / LTL"}
                {result.lane.equipment ? ` · ${result.lane.equipment}` : ""} · live network
              </p>
            </div>
            <button
              type="button"
              className="btn-ghost !py-2 text-xs"
              onClick={() => {
                setStatus("idle");
                setResult(null);
              }}
            >
              New quote
            </button>
          </div>
          {result.rates.length > 0 && (
            <ul className="mt-3 max-h-40 space-y-1.5 overflow-y-auto">
              {result.rates.slice(0, 5).map((r, idx) => (
                <li
                  key={`${r.rateId ?? idx}`}
                  className="flex justify-between rounded-md bg-white px-3 py-2 text-sm"
                >
                  <span className="truncate text-steel-500">
                    {r.serviceLevel || "Option"} · {r.transitDays ?? "—"}d
                  </span>
                  <span className="font-semibold text-navy-900">{money(r.totalAmount)}</span>
                </li>
              ))}
            </ul>
          )}
          <TargetRatePanel marketBest={result.bestPrice} lane={result.lane} compact />
        </div>
      )}
    </div>
  );

  if (isHero) {
    return <div className="w-full max-w-3xl">{formCard}</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">{formCard}</div>

      <div className="lg:col-span-5">
        <div className="card sticky top-28 min-h-[320px] p-6 sm:p-8">
          <p className="eyebrow">Your price</p>
          <h3 className="mt-2 text-xl font-semibold text-navy-900">Live quote results</h3>

          {status === "idle" && (
            <p className="mt-4 text-sm leading-relaxed text-steel-500">
              Enter lane details and click <strong>Get a Quote</strong>. We pull live network rates
              and show priced options here. Too high? You can submit a target rate after.
            </p>
          )}

          {status === "loading" && (
            <div className="mt-8 flex flex-col items-center gap-3 py-10 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-navy-900/15 border-t-brand-orange" />
              <p className="text-sm font-medium text-navy-900">Getting your rate…</p>
            </div>
          )}

          {status === "done" && result && (
            <div className="mt-5 space-y-5">
              <div className="rounded-2xl bg-navy-900 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-300">
                  Best available
                </p>
                <p className="mt-2 text-4xl font-semibold tracking-tight">
                  {money(result.bestPrice)}
                </p>
                <p className="mt-1 text-sm text-steel-300">
                  {result.mode === "FTL" ? "Full truckload" : "Partial / LTL"}
                  {result.lane.equipment ? ` · ${result.lane.equipment}` : ""} · Air &amp; Ocean
                  network
                </p>
              </div>

              {result.rates.length > 0 && (
                <ul className="max-h-52 space-y-2 overflow-y-auto">
                  {result.rates.map((r, idx) => (
                    <li
                      key={`${r.rateId ?? idx}-${r.totalAmount}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-steel-200 bg-white px-3 py-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-navy-900">
                          {r.carrierName || r.serviceLevel || "Carrier option"}
                        </p>
                        <p className="text-xs text-steel-500">Transit {r.transitDays ?? "—"}d</p>
                      </div>
                      <p className="shrink-0 font-semibold text-navy-900">
                        {money(r.totalAmount)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <TargetRatePanel marketBest={result.bestPrice} lane={result.lane} />

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
