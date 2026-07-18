type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="hero-grid noise relative overflow-hidden text-white">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="container-wide section-pad relative py-20 sm:py-24">
        {eyebrow && <p className="eyebrow-light mb-4">{eyebrow}</p>}
        <h1 className="display max-w-3xl text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 h-px w-24 bg-gradient-to-r from-brand-red to-brand-blue" />
      </div>
    </section>
  );
}
