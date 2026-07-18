import Link from "next/link";
import { BrandLogo } from "@/components/marketing/BrandLogo";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-steel-300">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-brand-red/15 blur-3xl" />
      </div>

      <div className="container-wide section-pad relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link
            href="/"
            className="mb-5 inline-flex items-center rounded-xl bg-white px-2.5 py-1.5 shadow-md"
            aria-label={`${site.name} home`}
          >
            <BrandLogo variant="header" className="h-9 w-auto" />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-steel-400">
            {site.tagline}. Nationwide FTL, LTL, and expedited — United States road freight only.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.modes.map((mode) => (
              <span
                key={mode}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-steel-200"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-500">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="font-medium text-brand-red-bright transition hover:text-white">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-500">
            Equipment
          </h3>
          <ul className="space-y-2.5 text-sm">
            {site.equipment.map((eq) => (
              <li key={eq}>{eq}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-500">
            Contact
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={site.contact.phoneHref} className="text-base font-semibold text-white transition hover:text-brand-red-bright">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={site.contact.emailHref} className="transition hover:text-white">
                {site.contact.email}
              </a>
            </li>
            {site.contact.addressLines.map((line) => (
              <li key={line} className="text-steel-500">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-wide section-pad flex flex-col gap-2 py-5 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>{site.coverageNote} · Est. {site.since}</p>
        </div>
      </div>
    </footer>
  );
}
