import { useCallback, useRef, useState } from "react";

import { Reveal } from "@/components/ui-kit/Reveal";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { transformation } from "@/data/site";

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section className="border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Before / After"
          title={transformation.title}
          subtitle="Drag the divider to see the difference precision makes."
        />

        <Reveal className="mt-12 sm:mt-16">
          <div
            ref={containerRef}
            className="relative aspect-4/5 w-full touch-pan-y overflow-hidden select-none sm:aspect-16/10"
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onPointerUp={() => {
              dragging.current = false;
            }}
            onPointerCancel={() => {
              dragging.current = false;
            }}
          >
            <img
              src={transformation.after.image}
              alt="Client after a signature haircut and beard sculpt"
              width={1200}
              height={1408}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                src={transformation.before.image}
                alt="Client before a signature haircut and beard sculpt"
                width={1200}
                height={1408}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <span className="label absolute top-4 left-4 border border-border-strong bg-background/70 px-3 py-1.5">
              {transformation.before.label}
            </span>
            <span className="label absolute top-4 right-4 border border-border-strong bg-background/70 px-3 py-1.5">
              {transformation.after.label}
            </span>

            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-brand"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand bg-background">
                <span className="font-display text-xs font-bold text-brand">↔</span>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              aria-label="Reveal the before and after images"
              className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
            />
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="label text-muted-foreground">{transformation.caption}</p>
            <p className="text-xs text-muted-foreground">{transformation.disclaimer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
