import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Air, ocean, and ground coverage through Air & Ocean Logistics' brokerage network and asset-backed capacity.",
};

const lanes = [
  {
    title: "Domestic U.S.",
    body: "FTL, LTL, expedited, and airport/port drayage programs coordinated with national partners.",
  },
  {
    title: "Transatlantic & Europe",
    body: "Ocean FCL/LCL and air uplift for manufacturing, retail, and industrial equipment flows.",
  },
  {
    title: "Asia–U.S. trade",
    body: "Sailing schedules, consolidation options, and last-mile alignment for import programs.",
  },
  {
    title: "Latin America corridors",
    body: "Air and ocean connectivity with ground handoffs for time-sensitive and project cargo.",
  },
];

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Network reach with local execution discipline"
        description="Modes and lanes designed around how freight actually moves — not a single product forced onto every shipment."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-max">
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

          <div className="grid gap-5 sm:grid-cols-2">
            {lanes.map((lane) => (
              <article key={lane.title} className="card">
                <h3 className="text-lg font-semibold text-navy-900">{lane.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{lane.body}</p>
              </article>
            ))}
          </div>

          <div className="card mt-8 border-amber-400/30 bg-amber-400/10">
            <h3 className="text-lg font-semibold text-navy-900">Need a lane we did not list?</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-800/80">
              Send origin, destination, and cargo details. If we can move it responsibly — with the
              right capacity and compliance — we will build the plan.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
