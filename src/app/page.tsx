import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/marketing/CtaBand";
import { QuickQuote } from "@/components/marketing/QuickQuote";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/*
        Landing hero like QuickLoad:
        full-bleed autoplay video + Get a Quote form visible on first screen
      */}
      <section className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden sm:min-h-[calc(100vh-4.75rem)]">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            className="hidden h-full w-full object-cover sm:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-truck.jpg"
            aria-hidden
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Mobile: static image (saves data; matches QL mobile pattern) */}
          <Image
            src="/images/hero-truck.jpg"
            alt=""
            fill
            priority
            className="object-cover sm:hidden"
            sizes="100vw"
          />
          {/* Dark overlay for form readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/55 to-navy-950/80" />
        </div>

        <div className="container-wide section-pad relative z-10 flex min-h-[calc(100vh-4.25rem)] flex-col justify-center py-10 sm:min-h-[calc(100vh-4.75rem)] sm:py-14">
          <div className="mx-auto w-full max-w-3xl text-center text-white">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              U.S. trucking brokerage
            </p>
            <h1 className="display mx-auto mt-3 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
              Get a freight quote in seconds
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-steel-200 sm:text-base">
              Full truckload &amp; partial · Live network rates · No hidden fees
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {site.certifications.map((c) => (
                <span
                  key={c.code}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur"
                >
                  {c.title}
                </span>
              ))}
            </div>
          </div>

          {/* Quote form on the video — same first-screen pattern as QuickLoad */}
          <div className="mx-auto mt-8 w-full max-w-3xl">
            <QuickQuote layout="hero" />
          </div>

          <p className="mt-6 text-center text-xs text-steel-300">
            Prefer to talk?{" "}
            <a href={site.contact.phoneHref} className="font-semibold text-white underline-offset-2 hover:underline">
              {site.contact.phone}
            </a>{" "}
            ·{" "}
            <a href={site.contact.emailHref} className="font-semibold text-white underline-offset-2 hover:underline">
              {site.contact.email}
            </a>
          </p>
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

      {/* Certifications */}
      <section className="border-b border-steel-200 bg-steel-50 section-pad py-12 sm:py-14">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Compliance &amp; trust</p>
            <h2 className="display mt-2 text-2xl text-navy-900 sm:text-3xl">
              Certified for quality, healthcare logistics, and bonded freight
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {site.certifications.map((c) => (
              <article key={c.code} className="card-glow">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
                  {c.code}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment story strip */}
      <section className="section-pad border-b border-steel-200 py-12">
        <div className="container-wide">
          <h2 className="display mb-6 text-center text-2xl text-navy-900 sm:text-3xl">
            Every truck type. Every kind of road.
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                img: "/images/hero-dryvan.jpg",
                t: "Dry van",
                d: "General cargo on major corridors and city lanes — AOL-branded capacity.",
              },
              {
                img: "/images/hero-flatbed.jpg",
                t: "Flatbed & machinery",
                d: "Heavy equipment and open-deck freight on highways and roads less traveled.",
              },
              {
                img: "/images/hero-reefer.jpg",
                t: "Reefer / pharma",
                d: "Temperature-controlled moves for healthcare and cold-chain freight, including vaccine-grade lanes.",
              },
            ].map((card) => (
              <article key={card.t} className="overflow-hidden rounded-xl border border-steel-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={card.img} alt={card.t} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-navy-900">{card.t}</h3>
                  <p className="mt-1 text-sm text-steel-500">{card.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
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

      {/* Why us + photo */}
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
