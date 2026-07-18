import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-steel-200">
      <div className="container-max section-pad grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-xs font-bold text-navy-950">
              AOL
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Air &amp; Ocean</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-steel-400">
                Logistics
              </div>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-steel-400">
            {site.tagline}. Multi-mode freight solutions with operator accountability.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-steel-400">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="transition hover:text-white">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-steel-400">
            Modes
          </h3>
          <ul className="space-y-2 text-sm">
            {site.modes.map((mode) => (
              <li key={mode}>{mode}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-steel-400">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.contact.phoneHref} className="transition hover:text-white">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={site.contact.emailHref} className="transition hover:text-white">
                {site.contact.email}
              </a>
            </li>
            {site.contact.addressLines.map((line) => (
              <li key={line} className="text-steel-400">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max section-pad flex flex-col gap-2 py-5 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Freight brokerage with assets · Est. {site.since}</p>
        </div>
      </div>
    </footer>
  );
}
