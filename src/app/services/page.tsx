import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "U.S. trucking services from Air & Ocean Logistics — FTL, LTL, expedited, and dedicated lanes. No air or ocean carriage.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="U.S. trucking capacity, one accountable team"
        description="Full truckload, LTL, expedited, and dedicated programs. We do not book air or ocean carriage — road freight only."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-wide space-y-5">
          {site.services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="card-glow grid gap-6 p-7 lg:grid-cols-12 lg:items-start lg:p-8"
            >
              <div className="lg:col-span-1">
                <span className="text-sm font-bold tracking-widest text-brand-red">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-semibold tracking-tight text-navy-900">
                  {service.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-steel-500">{service.summary}</p>
              </div>
              <ul className="space-y-2 lg:col-span-6">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl bg-steel-50 px-4 py-3 text-sm text-navy-800"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad pb-8">
        <div className="container-wide">
          <div className="card overflow-hidden p-0">
            <div className="grid lg:grid-cols-2">
              <div className="bg-ink p-8 text-white sm:p-10">
                <p className="eyebrow-light">Equipment</p>
                <h2 className="mt-2 text-2xl font-semibold">Matched to the freight</h2>
                <p className="mt-3 text-sm text-steel-300">
                  Dry van, reefer, flatbed, step deck, hot shot, and power only — sourced to fit the
                  load, not the other way around.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {site.equipment.map((eq) => (
                    <span
                      key={eq}
                      className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <h2 className="text-xl font-semibold text-navy-900">Not sure FTL vs LTL?</h2>
                <p className="mt-2 text-sm text-steel-500">
                  Send weight, pallets, dimensions, and the delivery window — we&apos;ll recommend
                  the right product.
                </p>
                <Link href="/quote" className="btn-primary mt-6 self-start">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
