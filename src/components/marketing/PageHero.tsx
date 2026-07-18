type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-steel-200 bg-steel-50">
      <div className="container-wide section-pad py-12 sm:py-16">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="display max-w-3xl text-3xl text-navy-900 sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-500 sm:text-lg">
          {description}
        </p>
        <div className="mt-6 h-1 w-16 rounded-full bg-brand-orange" />
      </div>
    </section>
  );
}
