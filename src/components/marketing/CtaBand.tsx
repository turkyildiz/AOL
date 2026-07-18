import Link from "next/link";
import { site } from "@/content/site";

export function CtaBand() {
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="container-wide relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center shadow-2xl shadow-navy-900/30 sm:px-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-brand-red/25 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-brand-blue/25 blur-3xl" />
          <div className="grid-fade absolute inset-0 opacity-60" />
        </div>
        <div className="relative">
          <p className="eyebrow-light">Ready to book</p>
          <h2 className="display mx-auto mt-3 max-w-2xl text-3xl text-white sm:text-4xl">
            Tell us about your next load
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-steel-300 sm:text-base">
            FTL, LTL, or expedited — U.S. trucking only. Clear rates, real capacity, one team
            accountable through delivery.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-primary w-full sm:w-auto">
              Request a Quote
            </Link>
            <a href={site.contact.phoneHref} className="btn-secondary w-full sm:w-auto">
              Call {site.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
