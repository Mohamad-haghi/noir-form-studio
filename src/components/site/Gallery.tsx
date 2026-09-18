import { useMemo, useState } from "react";

import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { Reveal } from "@/components/ui-kit/Reveal";
import {
  barbers,
  gallery as allGallery,
  galleryCategories,
  getBarber,
  getService,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/site";
import { cn } from "@/lib/utils";
import { GalleryViewer } from "./GalleryViewer";

const spanClasses: Record<GalleryItem["span"], string> = {
  feature: "sm:col-span-2 sm:row-span-2 aspect-4/5",
  tall: "aspect-4/5",
  wide: "sm:col-span-2 aspect-16/10",
  square: "aspect-square",
};

interface GalleryProps {
  items?: GalleryItem[];
  showBarberFilter?: boolean;
  heading?: { index?: string; eyebrow?: string; title: string; subtitle?: string };
  compact?: boolean;
}

export function Gallery({
  items = allGallery,
  showBarberFilter = true,
  heading = {
    index: "05",
    eyebrow: "Selected Work",
    title: "The work",
    subtitle: "Precision you can see. Tap any image to open it full screen.",
  },
  compact = false,
}: GalleryProps) {
  const [category, setCategory] = useState<"all" | GalleryCategory>("all");
  const [barberId, setBarberId] = useState<"all" | string>("all");
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (category === "all" || item.category === category) &&
          (barberId === "all" || item.barberId === barberId),
      ),
    [items, category, barberId],
  );

  return (
    <section id="work" className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading {...heading} />

        <Reveal className="mt-10 flex flex-col gap-4 sm:mt-14">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
                className={cn(
                  "label shrink-0 border px-4 py-2.5 transition-colors duration-300",
                  category === cat.id
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {showBarberFilter ? (
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              {[{ id: "all", label: "All barbers" }, ...barbers.map((b) => ({ id: b.id, label: `Work by ${b.firstName}` }))].map(
                (option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setBarberId(option.id)}
                    aria-pressed={barberId === option.id}
                    className={cn(
                      "label shrink-0 border-b py-2 transition-colors duration-300",
                      barberId === option.id
                        ? "border-brand text-brand"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                ),
              )}
            </div>
          ) : null}
        </Reveal>

        {filtered.length ? (
          <div
            className={cn(
              "mt-10 grid auto-rows-min grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4",
              !compact && "lg:grid-cols-4",
            )}
          >
            {filtered.map((item, i) => {
              const barber = getBarber(item.barberId);
              const service = getService(item.serviceId);
              return (
                <Reveal key={item.id} delay={Math.min(i, 6) * 70} className={spanClasses[item.span]}>
                  <button
                    type="button"
                    onClick={() => setViewerIndex(i)}
                    className="group relative block h-full w-full overflow-hidden bg-surface text-left"
                    aria-label={`Open ${item.title} full screen`}
                  >
                    <img
                      src={item.image}
                      alt={`${item.title} — ${service?.name ?? ""} by ${barber?.name ?? ""}`}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0" />
                    <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-100 transition-[transform,opacity] duration-500 ease-editorial group-hover:translate-y-0 sm:opacity-0 sm:group-hover:opacity-100">
                      <span className="label block text-brand">{service?.name}</span>
                      <span className="mt-1 block font-display text-sm font-bold uppercase">
                        {item.title}
                      </span>
                      <span className="label mt-1 block text-muted-foreground">{barber?.name}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="mt-14 border border-border px-6 py-16 text-center">
            <p className="display-lg text-muted-foreground">Nothing here yet</p>
            <p className="mt-4 text-sm text-muted-foreground">
              No work matches this filter. Try another category or barber.
            </p>
          </div>
        )}
      </div>

      {viewerIndex !== null && filtered[viewerIndex] ? (
        <GalleryViewer
          items={filtered}
          index={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onNavigate={setViewerIndex}
        />
      ) : null}
    </section>
  );
}
