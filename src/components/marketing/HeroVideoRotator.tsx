"use client";

import { useEffect, useRef, useState } from "react";

/** Ten looping hero clips — city, rural, flatbed, reefer, dry van, etc. */
export const HERO_VIDEOS = [
  "/videos/hero-01.mp4",
  "/videos/hero-02.mp4",
  "/videos/hero-03.mp4",
  "/videos/hero-04.mp4",
  "/videos/hero-05.mp4",
  "/videos/hero-06.mp4",
  "/videos/hero-07.mp4",
  "/videos/hero-08.mp4",
  "/videos/hero-09.mp4",
  "/videos/hero-10.mp4",
] as const;

const ROTATE_MS = 7000;

type HeroVideoRotatorProps = {
  poster?: string;
  className?: string;
};

export function HeroVideoRotator({
  poster = "/images/hero-truck.jpg",
  className = "",
}: HeroVideoRotatorProps) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Preload next few clips
  useEffect(() => {
    HERO_VIDEOS.forEach((src, i) => {
      if (i === 0) return;
      const v = document.createElement("video");
      v.preload = "metadata";
      v.muted = true;
      v.src = src;
    });
  }, []);

  useEffect(() => {
    const el = videoRefs.current[index];
    if (el) {
      el.currentTime = 0;
      void el.play().catch(() => {
        /* autoplay may be blocked — poster still shows */
      });
    }

    const t = window.setTimeout(() => {
      setPrev(index);
      setIndex((i) => (i + 1) % HERO_VIDEOS.length);
    }, ROTATE_MS);

    return () => window.clearTimeout(t);
  }, [index]);

  // Clear previous layer after fade
  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), 900);
    return () => window.clearTimeout(t);
  }, [prev]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {HERO_VIDEOS.map((src, i) => {
        const active = i === index;
        const isPrev = i === prev;
        if (!active && !isPrev && Math.abs(i - index) > 1 && i !== (index + 1) % HERO_VIDEOS.length) {
          // Keep DOM light: only mount nearby clips + current/prev
          return null;
        }
        return (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-700 sm:block ${
              active ? "opacity-100" : isPrev ? "opacity-0" : "opacity-0"
            }`}
            muted
            playsInline
            loop
            preload={active || i === (index + 1) % HERO_VIDEOS.length ? "auto" : "metadata"}
            poster={poster}
            aria-hidden
          >
            <source src={src} type="video/mp4" />
          </video>
        );
      })}

      {/* Mobile: cycling posters via background images */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:hidden transition-[background-image] duration-700"
        style={{
          backgroundImage: `url(${
            [
              "/images/hero-truck.jpg",
              "/images/hero-flatbed.jpg",
              "/images/hero-reefer.jpg",
              "/images/hero-dryvan.jpg",
              "/images/hero-flatbed.jpg",
              "/images/hero-reefer.jpg",
              "/images/hero-dryvan.jpg",
              "/images/hero-truck.jpg",
              "/images/hero-reefer.jpg",
              "/images/hero-flatbed.jpg",
            ][index]
          })`,
        }}
        aria-hidden
      />

      {/* Progress dots */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-[5] hidden -translate-x-1/2 gap-1.5 sm:flex">
        {HERO_VIDEOS.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-6 bg-brand-orange" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
