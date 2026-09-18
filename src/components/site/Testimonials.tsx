import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef, useState } from "react";

import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { Reveal } from "@/components/ui-kit/Reveal";
import { testimonials as allTestimonials, type Testimonial } from "@/data/site";

export function Testimonials({ items = allTestimonials }: { items?: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  if (!items.length) {
    return null;
  }

  const active = items[index] ?? items[0];
  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section className="border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading index="08" eyebrow="Testimonials" title="Client stories" />

        <Reveal
          className="mt-12 sm:mt-16"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        >
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Client stories"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(-1);
              if (e.key === "ArrowRight") go(1);
            }}
            onTouchStart={(e) => {
              touchX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX ?? null;
              if (start == null || end == null) return;
              if (Math.abs(end - start) > 50) go(end < start ? 1 : -1);
              touchX.current = null;
            }}
            className="border-t border-border pt-10"
          >
            <div
              key={active?.id}
              className="anim-fade min-h-[16rem] sm:min-h-[14rem]"
              aria-live="polite"
            >
              <div className="flex items-center gap-1.5" aria-label={`${active?.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < (active?.rating ?? 0) ? "h-3.5 w-3.5 text-brand" : "h-3.5 w-3.5 text-border-strong"
                    }
                    fill={i < (active?.rating ?? 0) ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <blockquote className="mt-7 max-w-4xl font-display text-xl leading-tight font-bold uppercase text-balance sm:text-3xl lg:text-4xl">
                “{active?.quote}”
              </blockquote>
              <footer className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="label">{active?.name}</span>
                <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
                <span className="label text-brand">{active?.service}</span>
              </footer>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6 border-t border-border pt-6">
              <p className="label text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous story"
                  className="grid h-11 w-11 place-items-center border border-border-strong transition-colors hover:border-brand hover:text-brand"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next story"
                  className="grid h-11 w-11 place-items-center border border-border-strong transition-colors hover:border-brand hover:text-brand"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
