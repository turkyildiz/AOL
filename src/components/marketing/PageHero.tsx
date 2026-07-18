type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="hero-grid relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-navy-700/40 blur-3xl" />
      </div>
      <div className="container-max section-pad relative py-16 sm:py-20">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-200 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
