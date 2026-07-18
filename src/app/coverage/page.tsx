import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Nationwide United States freight coverage from Air & Ocean Logistics — truck, air, intermodal, and expedited.",
};

const regions = [
  {
    title: "Midwest hub",
    body: "Schaumburg / Chicago-area strength for manufacturing, distribution, and cross-country origin work.",
  },
  {
    title: "East & Southeast",
    body: "Lane coverage for retail, industrial, and coastal port-adjacent domestic moves.",
  },
  {
    title: "South Central & Southwest",
    body: "FTL, LTL, and expedited capacity across high-volume U.S. corridors.",
  },
  {
    title: "West Coast & Mountain",
    body: "Domestic air, intermodal, and truck programs tied to ramps, airports, and regional DCs.",
  },
];

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="United States only — nationwide execution"
        description="We move freight inside the USA. No international bookings — just domestic capacity, clear lanes, and operators who own the file."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-max">
          <div className="card mb-10 border-amber-400/30 bg-amber-400/10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              Service area
            </p>
            <h2 className="mt-2 text-xl font-semibold text-navy-900 sm:text-2xl">
              {site.coverageNote}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-800/80">
              Air &amp; Ocean Logistics brokers and moves cargo within the United States.
              If your shipment starts or ends outside the U.S., we are not the right fit —
              and we will tell you that up front.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
              Modes we run
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {site.modes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm font-semibold text-navy-900 shadow-sm"
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>

          <h2 className="mb-5 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Regional coverage
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {regions.map((region) => (
              <article key={region.title} className="card">
                <h3 className="text-lg font-semibold text-navy-900">{region.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{region.body}</p>
              </article>
            ))}
          </div>

          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-navy-900">Cross-country U.S. lanes</h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-500">
              Coast-to-coast and multi-stop domestic programs are core to what we do. Share origin
              city/state, destination city/state, and cargo details — we will build the plan with
              the right mode mix.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
