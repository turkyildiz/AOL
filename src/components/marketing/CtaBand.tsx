import Link from "next/link";
import { site } from "@/content/site";

export function CtaBand() {
  return (
    <section className="section-pad py-14 sm:py-20">
      <div className="container-wide overflow-hidden rounded-2xl bg-navy-900 px-6 py-12 text-center sm:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Ready to ship</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
          Get a freight quote in seconds
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-steel-300 sm:text-base">
          Competitive FTL &amp; partial rates. No hidden fees. U.S. trucking only.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn-primary w-full sm:w-auto">
            Get a Quote
          </Link>
          <a href={site.contact.phoneHref} className="btn-secondary w-full sm:w-auto">
            Call {site.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
