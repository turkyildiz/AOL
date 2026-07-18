import type { Metadata } from "next";
import { LeadForm } from "@/components/marketing/LeadForm";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a U.S. trucking quote from Air & Ocean Logistics — FTL, LTL, expedited, and dedicated. Road freight only.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Quote your next U.S. truck load"
        description="Trucking only — FTL, LTL, expedited, or dedicated. Share the essentials and we come back with a clear rate and plan."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-wide grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="card-glow sticky top-28">
              <h2 className="text-lg font-semibold text-navy-900">Faster quotes need</h2>
              <ul className="mt-4 space-y-3 text-sm text-steel-500">
                {[
                  "U.S. origin and destination (city, ST)",
                  "Pickup date and delivery window",
                  "Equipment type (van, reefer, flatbed…)",
                  "Weight, pallets, or dimensions",
                  "Commodity and accessorials",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-steel-50 px-4 py-3 text-sm text-navy-800">
                Hot load? Call{" "}
                <a href={site.contact.phoneHref} className="font-semibold text-brand-red">
                  {site.contact.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <LeadForm variant="quote" />
          </div>
        </div>
      </section>
    </>
  );
}
