import type { Metadata } from "next";
import { LeadForm } from "@/components/marketing/LeadForm";
import { PageHero } from "@/components/marketing/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for U.S. trucking quotes, FTL/LTL capacity, and account support.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the team that will run your loads"
        description="Questions, new lanes, or a hot pickup — reach us by phone, email, or the form below."
      />

      <section className="section-pad py-16 sm:py-20">
        <div className="container-wide grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="card-glow space-y-6">
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-500">
                  Phone
                </h2>
                <a
                  href={site.contact.phoneHref}
                  className="mt-1 block text-xl font-semibold text-navy-900 transition hover:text-brand-red"
                >
                  {site.contact.phone}
                </a>
              </div>
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-500">
                  Email
                </h2>
                <a
                  href={site.contact.emailHref}
                  className="mt-1 block text-lg font-semibold text-navy-900 transition hover:text-brand-red"
                >
                  {site.contact.email}
                </a>
              </div>
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-500">
                  Location
                </h2>
                <div className="mt-1 text-base text-navy-900">
                  {site.contact.addressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
              <p className="border-t border-navy-900/8 pt-5 text-sm leading-relaxed text-steel-500">
                For the fastest truck quote, use the{" "}
                <a href="/quote" className="font-semibold text-navy-900 underline-offset-2 hover:underline">
                  quote form
                </a>{" "}
                with origin, destination, equipment, and weight.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <LeadForm variant="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
