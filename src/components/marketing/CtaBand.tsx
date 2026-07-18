import Link from "next/link";
import { site } from "@/content/site";

export function CtaBand() {
  return (
    <section className="section-pad py-16 sm:py-20">
      <div className="container-max overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-center shadow-xl shadow-navy-900/20 sm:px-12 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Ready to move
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Tell us about your next shipment
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-steel-200 sm:text-base">
          Air, ocean, or ground — we will shape a clear plan, a real quote, and a single team
          accountable for the outcome.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn-primary w-full sm:w-auto">
            Request a Quote
          </Link>
          <a href={site.contact.phoneHref} className="btn-secondary w-full sm:w-auto">
            Call {site.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
