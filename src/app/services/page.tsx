import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Air freight, ocean FCL/LCL, truck brokerage, and project cargo from Air & Ocean Logistics.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Multi-mode freight, one accountable team"
        description="Whether your cargo needs altitude, ocean schedule, or road capacity, we design the move and own the execution."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-max space-y-6">
          {site.services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="card grid gap-6 lg:grid-cols-12 lg:items-start"
            >
              <div className="lg:col-span-1">
                <span className="text-sm font-bold tracking-widest text-amber-600">
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
                    className="flex items-start gap-3 rounded-xl bg-steel-100/80 px-4 py-3 text-sm text-navy-800"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-navy-900/8 bg-white section-pad py-14">
        <div className="container-max flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-navy-900">Not sure which mode fits?</h2>
            <p className="mt-1 text-sm text-steel-500">
              Send the constraints — we will recommend air, ocean, ground, or a blend.
            </p>
          </div>
          <Link href="/quote" className="btn-primary">
            Request a Quote
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
