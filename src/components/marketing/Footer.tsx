import Link from "next/link";
import { BrandLogo } from "@/components/marketing/BrandLogo";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel-200 bg-navy-900 text-steel-300">
      <div className="container-wide section-pad grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" className="mb-4 inline-flex rounded-md bg-white px-2 py-1.5">
            <BrandLogo variant="header" className="h-9 w-auto" />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-steel-400">
            U.S. trucking brokerage with assets. Instant FTL &amp; partial quotes powered by the
            QuickLoad network.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-steel-400">Company</h3>
          <ul className="space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="font-semibold text-brand-orange hover:text-white">
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-steel-400">Services</h3>
          <ul className="space-y-2 text-sm">
            {site.modes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-steel-400">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.contact.phoneHref} className="text-base font-semibold text-white hover:text-brand-orange">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={site.contact.emailHref} className="hover:text-white">
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

      <div className="border-t border-white/10">
        <div className="container-wide section-pad flex flex-col gap-2 py-4 text-xs text-steel-500 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>{site.coverageNote}</p>
        </div>
      </div>
    </footer>
  );
}
