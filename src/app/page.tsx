import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { QuickQuote } from "@/components/marketing/QuickQuote";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* Hero — QuickLoad-style dark band + messaging */}
      <section className="hero-ql relative overflow-hidden text-white">
        <div className="grid-fade pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-wide section-pad relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Smart trucking network
              </p>
              <h1 className="display text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Get FTL and partial truck quotes —{" "}
                <span className="text-brand-orange">built for shippers</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-steel-300 sm:text-lg">
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
              <div className="mt-8 flex flex-wrap gap-2">
                {["Competitive rates", "No hidden fees", "U.S. trucking only", "Live pricing"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-steel-200"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-brand-orange/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/hero-truck.jpg"
                    alt="Air & Ocean Logistics truck with Chicago skyline"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-steel-200 bg-white">
        <div className="container-wide section-pad grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-2xl font-bold text-navy-900 sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-steel-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instant quote — homepage centerpiece like QuickLoad */}
      <section className="mesh-light section-pad border-b border-steel-200 py-12 sm:py-16">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <h2 className="display text-3xl text-navy-900 sm:text-4xl">
              Quick <span className="text-brand-orange">Quote</span>
            </h2>
            <p className="mt-3 text-base text-steel-500">
              Provide load details and get FTL and partial rates in seconds — everywhere in the U.S.
            </p>
          </div>
          <QuickQuote />
        </div>
      </section>

      {/* Services cards */}
      <section className="section-pad py-16 sm:py-20">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="display mt-2 text-3xl text-navy-900 sm:text-4xl">
                Capacity when you need it
              </h2>
            </div>
            <Link href="/services" className="btn-dark self-start sm:self-auto">
              All services
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.services.map((svc) => (
              <article key={svc.slug} className="card-glow">
                <h3 className="text-lg font-semibold text-navy-900">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{svc.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-steel-200 bg-steel-50 section-pad py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl">
            <Image
              src="/images/yard-fleet.jpg"
              alt="Trucking yard"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="eyebrow">Why shippers choose us</p>
            <h2 className="display mt-2 text-3xl text-navy-900 sm:text-4xl">
              Competitive rates. Real operators.
            </h2>
            <ul className="mt-6 space-y-4">
              {site.differentiators.map((d) => (
                <li key={d.title} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  <div>
                    <p className="font-semibold text-navy-900">{d.title}</p>
                    <p className="text-sm text-steel-500">{d.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-primary mt-8">
              About Air &amp; Ocean
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad py-16 sm:py-20">
        <div className="container-wide">
          <h2 className="display text-center text-3xl text-navy-900 sm:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((step) => (
              <div key={step.step} className="card text-center">
                <div className="text-sm font-bold text-brand-orange">{step.step}</div>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm text-steel-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
