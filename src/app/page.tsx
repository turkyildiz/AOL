import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { site } from "@/content/site";

const serviceIcons = [
  // Air
  <svg key="air" viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
    <path
      d="M3 12.5l18-7-4.5 8.5L21 19l-7-1.5L8 21l1-5.5L3 12.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>,
  // Ocean
  <svg key="ocean" viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
    <path
      d="M3 16c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M4 10h3l2-4h6l2 4h3M7 10v4m10-4v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  // Truck
  <svg key="truck" viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
    <path
      d="M3 7h11v9H3V7zm11 3h4l3 3v3h-7v-6zM7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>,
  // Project
  <svg key="project" viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
    <path
      d="M4 19V5h6l2 2h8v12H4zm0 0h16M8 11h8M8 14h5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-grid relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 top-8 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-navy-700/50 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container-max section-pad relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {site.tagline} · Est. {site.since}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Freight that moves with{" "}
              <span className="text-amber-400">precision</span> — air, ocean, and ground.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-200 sm:text-lg">
              {site.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="btn-primary">
                Get a Quote
              </Link>
              <a href={site.contact.phoneHref} className="btn-secondary">
                Call {site.contact.phone}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {site.modes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-steel-100"
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
                Why shippers choose AOL
              </p>
              <ul className="mt-6 space-y-5">
                {site.differentiators.map((item) => (
                  <li key={item.title} className="border-t border-white/10 pt-5 first:border-0 first:pt-0">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel-300">{item.body}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-navy-950/60 p-4">
                <p className="text-sm text-steel-200">
                  Need capacity today?{" "}
                  <Link href="/quote" className="font-semibold text-amber-400 hover:text-amber-300">
                    Request a quote
                  </Link>{" "}
                  or email{" "}
                  <a href={site.contact.emailHref} className="font-semibold text-white hover:text-amber-300">
                    {site.contact.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / stats */}
      <section className="border-b border-navy-900/8 bg-white">
        <div className="container-max section-pad grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-steel-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mesh-light section-pad py-16 sm:py-24">
        <div className="container-max">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                Services
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                Capacity across every critical mode
              </h2>
              <p className="mt-3 max-w-2xl text-base text-steel-500">
                One accountable team for air, ocean, truck brokerage, and complex project moves.
              </p>
            </div>
            <Link href="/services" className="btn-dark shrink-0 self-start sm:self-auto">
              View all services
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {site.services.map((service, i) => (
              <article key={service.slug} className="card group transition hover:border-navy-700/20 hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                  {serviceIcons[i]}
                </div>
                <h3 className="text-lg font-semibold text-navy-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{service.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-navy-800">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-950 section-pad py-16 text-white sm:py-24">
        <div className="container-max">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            How it works
          </p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            From first call to final mile
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="text-sm font-bold tracking-widest text-amber-400">{step.step}</div>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assets + industries */}
      <section className="section-pad py-16 sm:py-24">
        <div className="container-max grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Assets & network
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Broker agility. Asset-backed reliability.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-500">
              We operate as a freight brokerage with assets — combining owned and controlled capacity
              with a vetted partner network. That means flexibility when the market is tight, and
              options when your freight does not fit a one-size product.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Air and ocean programs coordinated with ground execution",
                "Asset-backed options where schedule integrity matters",
                "Partner network for surge, specialty, and global handoffs",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm text-navy-800">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-600">
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-dark mt-8">
              About Air &amp; Ocean
            </Link>
          </div>

          <div className="card bg-navy-900 p-8 text-white sm:p-10">
            <h3 className="text-lg font-semibold">Industries we support</h3>
            <p className="mt-2 text-sm text-steel-300">
              From production lines to store shelves — freight that keeps commercial commitments intact.
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
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-steel-300">
                Prefer a human first? Call{" "}
                <a href={site.contact.phoneHref} className="font-semibold text-amber-400">
                  {site.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
