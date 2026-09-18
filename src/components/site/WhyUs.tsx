import { Reveal } from "@/components/ui-kit/Reveal";
import { business, whyUs } from "@/data/site";

export function WhyUs() {
  return (
    <section className="border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <Reveal className="flex items-center gap-4">
          <span className="label text-brand">07 — Why {business.name}</span>
          <span className="hairline flex-1" aria-hidden="true" />
        </Reveal>

        <ul className="mt-12 sm:mt-16">
          {whyUs.map((item, i) => (
            <Reveal
              key={item.index}
              as="li"
              delay={i * 90}
              className="grid gap-4 border-b border-border py-8 sm:grid-cols-[auto_1fr] sm:gap-12 sm:py-10 lg:grid-cols-[auto_0.9fr_1fr]"
            >
              <span aria-hidden="true" className="section-index leading-none">
                {item.index}
              </span>
              <h3 className="display-lg self-center">{item.title}</h3>
              <p className="max-w-md self-center text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
