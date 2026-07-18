import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { site } from "@/content/site";

const icons = {
  ftl: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M3 7h11v9H3V7zm11 3h4l3 3v3h-7v-6zM7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ltl: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M4 18V8h5l2 3h9v7H4zm0 0h16M8 11h3M8 14h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  expedited: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M13 3L5 14h6l-1 7 9-12h-6l0-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  dedicated: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M4 19V5h6l2 2h8v12H4zm0 0h16M8 12h8M8 15h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const serviceIconKeys = ["ftl", "ltl", "expedited", "dedicated"] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-grid noise relative min-h-[88vh] overflow-hidden text-white">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ink" />
          <div className="absolute right-12 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute right-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-brand-red/30" />
          <div className="absolute right-36 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-red/40 to-brand-blue/40 blur-xl" />
        </div>

        <div className="container-wide section-pad relative flex min-h-[88vh] flex-col justify-center py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-steel-200 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              U.S. trucking brokerage · Est. {site.since}
            </div>

            <h1 className="display text-4xl sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              Road freight that{" "}
              <span className="bg-gradient-to-r from-brand-red-bright via-white to-brand-blue bg-clip-text text-transparent">
                actually moves
              </span>
              .
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
              {site.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/quote" className="btn-primary">
                Get a truck quote
              </Link>
              <a href={site.contact.phoneHref} className="btn-secondary">
                Call {site.contact.phone}
              </a>
              <Link
                href="/services"
                className="text-center text-sm font-medium text-steel-400 transition hover:text-white sm:ml-2 sm:text-left"
              >
                View services →
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {site.modes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-steel-200"
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>

          {/* Floating trust strip */}
          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-20">
            {site.stats.map((stat) => (
              <div key={stat.label} className="card-dark px-4 py-4 sm:px-5">
                <div className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-steel-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning bar */}
      <section className="border-b border-navy-900/5 bg-white">
        <div className="container-wide section-pad flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-navy-900">
            <span className="text-brand-red">Trucking only.</span> No air carriage. No ocean
            carriage. Contiguous U.S. road freight.
          </p>
          <div className="flex flex-wrap gap-2">
            {site.equipment.slice(0, 4).map((eq) => (
              <span
                key={eq}
                className="rounded-full bg-steel-100 px-3 py-1 text-xs font-semibold text-navy-800"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mesh-light section-pad py-20 sm:py-28">
        <div className="container-wide">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Services</p>
              <h2 className="display mt-3 text-3xl text-navy-900 sm:text-4xl lg:text-[2.75rem]">
                Capacity for every road scenario
              </h2>
              <p className="mt-4 text-base text-steel-500">
                One ops team for full truckload, LTL, expedited, and dedicated lanes — built around
                how freight actually moves on U.S. highways.
              </p>
            </div>
            <Link href="/services" className="btn-dark shrink-0 self-start lg:self-auto">
              All services
            </Link>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {site.services.map((service, i) => (
              <article key={service.slug} className="card-glow group transition duration-300 hover:-translate-y-0.5">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-900 to-ink text-white shadow-lg shadow-navy-900/20">
                  {icons[serviceIconKeys[i]]}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{service.summary}</p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-navy-800">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-red to-brand-blue" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why AOL */}
      <section className="bg-ink section-pad py-20 text-white sm:py-28">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow-light">Why shippers choose us</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Broker agility. Asset-backed reliability.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {site.differentiators.map((item, i) => (
              <div key={item.title} className="card-dark relative overflow-hidden">
                <div className="mb-4 text-4xl font-semibold text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="card-dark">
              <h3 className="text-lg font-semibold">How a load runs</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {site.process.map((step) => (
                  <div key={step.step} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs font-bold tracking-widest text-brand-red-bright">
                      {step.step}
                    </div>
                    <div className="mt-2 font-semibold text-white">{step.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-steel-400">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-red/20 via-navy-900 to-brand-blue/20 p-8 sm:p-10">
              <p className="eyebrow-light">Industries</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Built for shippers who live on the clock
              </h3>
              <p className="mt-3 text-sm text-steel-300">
                From production lines to distribution centers — capacity that respects appointments
                and delivery windows.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-white/15 bg-black/20 px-3.5 py-1.5 text-xs font-medium text-steel-100"
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <Link href="/about" className="btn-primary mt-8">
                About Air &amp; Ocean
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage teaser */}
      <section className="section-pad py-20 sm:py-24">
        <div className="container-wide card-glow flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Coverage</p>
            <h2 className="display mt-2 text-3xl text-navy-900 sm:text-4xl">
              Contiguous U.S. trucking network
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel-500 sm:text-base">
              Cross-country lanes, regional hauls, and multi-stop routes — with equipment matched to
              the commodity, not forced into a single product.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/coverage" className="btn-dark">
              View coverage
            </Link>
            <Link href="/quote" className="btn-ghost">
              Quote a lane
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
