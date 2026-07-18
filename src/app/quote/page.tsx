import type { Metadata } from "next";
import { LeadForm } from "@/components/marketing/LeadForm";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a U.S. multi-mode freight quote from Air & Ocean Logistics — domestic air, truck, intermodal, and project cargo.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Tell us how your U.S. cargo needs to move"
        description="United States shipments only. Share the essentials — we will come back with mode options, transit windows, and clear next steps."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-max grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold text-navy-900">What helps us quote faster</h2>
              <ul className="mt-4 space-y-3 text-sm text-steel-500">
                {[
                  "U.S. origin and destination (city, ST)",
                  "Ready date and delivery target",
                  "Weight, dimensions, or pallet count",
                  "Commodity and any hazmat / special handling",
                  "Preferred mode — or ask us to recommend",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-steel-100 px-4 py-3 text-sm text-navy-800">
                Urgent? Call{" "}
                <a href={site.contact.phoneHref} className="font-semibold text-navy-900">
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
