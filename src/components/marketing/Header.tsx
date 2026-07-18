"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/85 backdrop-blur-md">
      <div className="container-max section-pad flex h-16 items-center justify-between sm:h-[4.25rem]">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-xs font-bold tracking-tight text-navy-950 shadow-md shadow-amber-500/30">
            AOL
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-wide text-white">
              Air &amp; Ocean
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-steel-400">
              Logistics
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-steel-200 transition hover:bg-white/5 hover:text-white"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-steel-100 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="btn-primary mt-2 text-center"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
