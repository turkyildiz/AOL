import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Air & Ocean Logistics — U.S. trucking brokerage with assets. ISO 9001, GDP certified, and customs bonded.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A trucking brokerage built for U.S. shippers"
        description={`${site.name} combines nationwide truck capacity with asset-backed reliability — road freight only.`}
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-2xl text-navy-900 sm:text-3xl">Our focus</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-steel-500">
              <p>
                Founded in {site.since}, {site.legalName} exists to move freight on American roads
                with clarity and accountability — not ticket queues and black-box rates.
              </p>
              <p>
                We are a{" "}
                <strong className="font-semibold text-navy-900">
                  trucking brokerage with assets
                </strong>
                . We do <strong className="font-semibold text-navy-900">not</strong> book air or
                ocean carriage. Every file is FTL, LTL, expedited, or dedicated road capacity inside
                the United States.
              </p>
              <p>
                Manufacturers, retailers, and industrial shippers trust us when appointments matter,
                markets tighten, and someone has to own the outcome.
              </p>
              <p>
                We are{" "}
                <strong className="font-semibold text-navy-900">ISO 9001</strong>,{" "}
                <strong className="font-semibold text-navy-900">GDP certified</strong>, and{" "}
                <strong className="font-semibold text-navy-900">customs bonded</strong> — so quality
                systems, healthcare distribution discipline, and bonded freight are part of how we
                operate every day.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {site.certifications.map((item) => (
              <div key={item.code} className="card-glow">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
                  {item.code}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{item.body}</p>
              </div>
            ))}
            {site.differentiators.map((item) => (
              <div key={item.title} className="card-glow">
                <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink section-pad py-16 text-white">
        <div className="container-wide">
          <h2 className="display text-2xl sm:text-3xl">How we work with you</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Clarity first",
                body: "Rates and plans that spell out equipment, transit, and assumptions — so you are never guessing.",
              },
              {
                title: "One file owner",
                body: "A real operator accountable for pickup, check-calls, exceptions, and POD through delivery.",
              },
              {
                title: "Escalate early",
                body: "Weather, capacity, or appointment shifts — you hear it from us with options, not after the damage.",
              },
            ].map((item) => (
              <div key={item.title} className="card-dark">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
