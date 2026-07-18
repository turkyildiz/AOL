import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Air & Ocean Logistics — a freight brokerage with assets serving shippers since 2012.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built for shippers who need more than a middleman"
        description={`${site.name} combines brokerage reach with asset-backed capacity and operators who own the outcome.`}
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-max grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
              Our story
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-steel-500">
              <p>
                Founded in {site.since}, {site.legalName} set out to give shippers a clearer path
                across air, ocean, and ground — without the black box experience that plagues so
                many freight relationships.
              </p>
              <p>
                We operate as a <strong className="font-semibold text-navy-900">freight brokerage with assets</strong>:
                the flexibility of a broad network, plus controlled capacity when reliability cannot
                be left to chance.
              </p>
              <p>
                Today we support manufacturers, retailers, and industrial shippers who need
                disciplined communication, multi-mode options, and a team that shows up when plans
                change mid-voyage.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {site.differentiators.map((item) => (
              <div key={item.title} className="card">
                <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 section-pad py-16 text-white">
        <div className="container-max">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How we work with you</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Clarity first",
                body: "Quotes and plans that spell out mode, transit, and assumptions — so you are never guessing.",
              },
              {
                title: "One file owner",
                body: "A real operator accountable for milestones, documents, and exceptions from booking to delivery.",
              },
              {
                title: "Escalate early",
                body: "When the market or the weather shifts, you hear it from us with options — not after the damage.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
