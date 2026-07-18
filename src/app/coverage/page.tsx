import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Nationwide U.S. trucking coverage from Air & Ocean Logistics — FTL, LTL, and expedited. United States road freight only.",
};

const regions = [
  {
    title: "Midwest hub",
    body: "Schaumburg / Chicago-area strength for manufacturing, distribution, and cross-country origins.",
  },
  {
    title: "East & Southeast",
    body: "Retail, industrial, and coastal corridor trucking with appointment-sensitive deliveries.",
  },
  {
    title: "South Central & Southwest",
    body: "High-volume FTL and LTL lanes across Texas, the Gulf, and southwest distribution hubs.",
  },
  {
    title: "West Coast & Mountain",
    body: "Long-haul and regional capacity into CA, PNW, and mountain markets — dry van and specialty.",
  },
];

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="United States trucking — nationwide lanes"
        description="Contiguous U.S. road freight only. No international. No air. No ocean. Just highway capacity you can book with confidence."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-wide">
          <div className="card-glow mb-10 border-brand-red/15 bg-gradient-to-br from-white to-steel-50 p-8">
            <p className="eyebrow">Service area</p>
            <h2 className="mt-2 text-2xl font-semibold text-navy-900 sm:text-3xl">
              {site.coverageNote}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-500">
              Air &amp; Ocean Logistics moves freight by truck within the United States. If your
              shipment requires air or ocean carriage — or starts/ends outside the U.S. — we are not
              the right fit, and we will tell you that up front.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="display text-2xl text-navy-900 sm:text-3xl">What we book</h2>
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

          <h2 className="display mb-5 text-2xl text-navy-900 sm:text-3xl">Regional strength</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {regions.map((region) => (
              <article key={region.title} className="card-glow">
                <h3 className="text-lg font-semibold text-navy-900">{region.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{region.body}</p>
              </article>
            ))}
          </div>

          <div className="card mt-8 p-8">
            <h3 className="text-lg font-semibold text-navy-900">Cross-country & multi-stop</h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-500">
              Coast-to-coast FTL, multi-stop routes, and recurring dedicated lanes are core. Share
              origin city/state, destination city/state, equipment, and pickup window — we build
              the plan.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
