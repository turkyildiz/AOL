import Image from "next/image";
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
      {/* Hero — split layout with photo */}
      <section className="hero-grid noise relative overflow-hidden text-white">
        <div className="grid-fade pointer-events-none absolute inset-0 opacity-50" />

        <div className="container-wide section-pad relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Copy */}
            <div className="lg:col-span-5">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-steel-200 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                </span>
                U.S. trucking brokerage · Est. {site.since}
              </div>

              <h1 className="display text-4xl sm:text-5xl lg:text-[3.15rem] lg:leading-[1.06]">
                Road freight that{" "}
                <span className="bg-gradient-to-r from-brand-red-bright via-white to-brand-blue bg-clip-text text-transparent">
                  actually moves
                </span>
                .
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-steel-300 sm:text-lg">
                {site.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href="/quote" className="btn-primary">
                  Get a truck quote
                </Link>
                <a href={site.contact.phoneHref} className="btn-secondary">
                  Call {site.contact.phone}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {site.modes.map((mode) => (
                  <span
                    key={mode}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-steel-200"
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-brand-red/40 via-transparent to-brand-blue/40 blur-2xl" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 shadow-2xl shadow-black/50 ring-1 ring-white/10">
                  <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                    <Image
                      src="/images/hero-truck.jpg"
                      alt="Semi-truck on a U.S. highway at dusk — Air & Ocean Logistics trucking"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/50 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
                  </div>

                  {/* Floating chips on image */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 sm:bottom-5 sm:left-5 sm:right-auto">
                    <span className="rounded-full border border-white/20 bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      FTL · LTL · Expedited
                    </span>
                    <span className="rounded-full border border-white/20 bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      USA only
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats under hero */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-14">
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
              <article
                key={service.slug}
                className="card-glow group transition duration-300 hover:-translate-y-0.5"
              >
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

      {/* Photo + story band — fills visual weight */}
      <section className="section-pad pb-4 pt-4 sm:pb-8 sm:pt-8">
        <div className="container-wide overflow-hidden rounded-[2rem] border border-navy-900/8 bg-ink shadow-2xl shadow-navy-900/20">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
              <Image
                src="/images/yard-fleet.jpg"
                alt="Trucking yard with trailers ready for dispatch"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-ink/30" />
            </div>
            <div className="flex flex-col justify-center p-8 text-white sm:p-12 lg:p-14">
              <p className="eyebrow-light">Why shippers choose us</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">
                Broker agility. Asset-backed reliability.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-steel-300 sm:text-base">
                Network reach when you need options. Controlled capacity when the market tightens.
                Every load is U.S. trucking — FTL, LTL, expedited, or dedicated.
              </p>
              <ul className="mt-6 space-y-3">
                {site.differentiators.map((item) => (
                  <li key={item.title} className="flex gap-3 text-sm text-steel-200">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-bright" />
                    <span>
                      <strong className="font-semibold text-white">{item.title}.</strong> {item.body}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-primary mt-8 self-start">
                About Air &amp; Ocean
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process + industries */}
      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide grid gap-5 lg:grid-cols-2">
          <div className="card-glow p-8 sm:p-10">
            <p className="eyebrow">How a load runs</p>
            <h2 className="display mt-2 text-2xl text-navy-900 sm:text-3xl">
              From first call to POD
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {site.process.map((step) => (
                <div
                  key={step.step}
                  className="rounded-xl border border-navy-900/6 bg-steel-50 p-4"
                >
                  <div className="text-xs font-bold tracking-widest text-brand-red">{step.step}</div>
                  <div className="mt-2 font-semibold text-navy-900">{step.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-steel-500">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-navy-900/8 bg-gradient-to-br from-navy-900 via-ink to-navy-800 p-8 text-white shadow-xl sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-red/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" />
            <div className="relative">
              <p className="eyebrow-light">Industries</p>
              <h2 className="display mt-2 text-2xl sm:text-3xl">
                Built for shippers who live on the clock
              </h2>
              <p className="mt-3 text-sm text-steel-300">
                From production lines to DCs — capacity that respects appointments and delivery
                windows.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-steel-100"
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/coverage" className="btn-primary">
                  View coverage
                </Link>
                <Link href="/quote" className="btn-secondary">
                  Quote a lane
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
