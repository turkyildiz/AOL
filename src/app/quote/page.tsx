import type { Metadata } from "next";
import { QuickQuote } from "@/components/marketing/QuickQuote";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Instant U.S. trucking quotes via QuickLoad — FTL and partial/LTL rates with live pricing.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Instant freight quotes — FTL & partial"
        description="Same idea as QuickLoad’s Quick Quote: enter the lane, get priced options in seconds. U.S. trucking only."
      />

      <section className="section-pad py-12 sm:py-16">
        <div className="container-wide">
          <QuickQuote />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Live network rates",
                d: "We query QuickLoad for marketplace and network pricing on your lane.",
              },
              {
                t: "FTL & partial",
                d: "Full truckload or LTL-style partial — pick the tab that matches your freight.",
              },
              {
                t: "Ops backup",
                d: `Prefer a human? Call ${site.contact.phone} or email ${site.contact.email}.`,
              },
            ].map((x) => (
              <div key={x.t} className="card p-5">
                <h3 className="font-semibold text-navy-900">{x.t}</h3>
                <p className="mt-1 text-sm text-steel-500">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
