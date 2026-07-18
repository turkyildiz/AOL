"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/marketing/BrandLogo";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-steel-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="container-wide section-pad flex h-[4.25rem] items-center justify-between sm:h-[4.75rem]">
        <Link href="/" className="inline-flex items-center" aria-label={`${site.name} home`}>
          <BrandLogo variant="header" priority className="h-9 w-auto sm:h-10" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-navy-900/80 transition hover:bg-steel-50 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/quote" className="btn-primary ml-2 !py-2.5 !text-sm">
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-steel-200 text-navy-900 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-steel-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-medium text-navy-900 hover:bg-steel-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/quote" className="btn-primary mt-2 text-center" onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
