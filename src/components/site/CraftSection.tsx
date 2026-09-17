import { useEffect, useRef, useState } from "react";

import { craftChapters } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven editorial sequence. Each chapter's image and copy cross-fade as
 * the sticky viewport travels through the section. Replace `image` with a video
 * source in site data later and swap the <img> for a <video> — the scroll model
 * is unchanged.
 */
export function CraftSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let frame = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      setActiveIndex(Math.floor(progress * craftChapters.length));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const active = craftChapters[activeIndex] ?? craftChapters[0];

  return (
    <section id="craft" className="scroll-mt-0 border-t border-border">
      <div ref={sectionRef} className="relative" style={{ height: `${craftChapters.length * 100}vh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          {/* media */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            {craftChapters.map((chapter, i) => (
              <img
                key={chapter.index}
                src={chapter.image}
                alt=""
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-editorial",
                  i === activeIndex ? "scale-100 opacity-100" : "scale-[1.08] opacity-0",
                )}
              />
            ))}
            <div className="absolute inset-0 bg-background/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
          </div>

          <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-5 py-24 sm:px-8 sm:py-28">
            <div className="flex items-baseline gap-5">
              <span className="label text-brand">04 — The Craft</span>
              <span className="hairline flex-1" aria-hidden="true" />
            </div>

            <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
              <ol className="flex gap-6 lg:flex-col lg:gap-5" aria-label="Craft chapters">
                {craftChapters.map((chapter, i) => (
                  <li key={chapter.index} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px transition-[width,background-color] duration-700 ease-editorial",
                        i === activeIndex ? "w-10 bg-brand" : "w-4 bg-border-strong",
                      )}
                    />
                    <span
                      className={cn(
                        "label transition-colors duration-500",
                        i === activeIndex ? "text-brand" : "text-muted-foreground",
                      )}
                      aria-current={i === activeIndex ? "step" : undefined}
                    >
                      {chapter.index}
                    </span>
                  </li>
                ))}
              </ol>

              <div key={active?.index} className="anim-fade max-w-2xl">
                <h2 className="display-hero text-balance">{active?.title}</h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {active?.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
