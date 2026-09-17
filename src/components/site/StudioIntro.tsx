import { Reveal } from "@/components/ui-kit/Reveal";
import { business, studioMedia, studioStats } from "@/data/site";

export function StudioIntro() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="label text-brand">01 — The Studio</span>
              <span className="hairline flex-1" aria-hidden="true" />
            </Reveal>

            <Reveal delay={80}>
              <h2 className="display-xl mt-8 text-balance">
                Crafted with
                <br />
                <span className="text-brand">precision.</span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {business.name} is a modern grooming studio built around precision, personal style
                and attention to detail. Two barbers, one standard, and a room designed so the
                forty-five minutes you spend in the chair feel like time you chose to spend.
              </p>
            </Reveal>

            <dl className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-4 lg:mt-20">
              {studioStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 90} className="border-l border-border pl-4">
                  <dt className="label mt-2 text-muted-foreground">{stat.label}</dt>
                  <dd className="font-display text-3xl font-extrabold sm:text-4xl">{stat.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-4/5 overflow-hidden sm:aspect-3/4 lg:aspect-4/5">
              <img
                src={studioMedia.image}
                alt="Interior of the Noir & Form studio with a black leather barber chair and marble counter"
                width={1280}
                height={1600}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial hover:scale-[1.03]"
              />
            </div>
            <p className="label mt-4 text-muted-foreground">
              {business.address.line1} · {business.address.city}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
