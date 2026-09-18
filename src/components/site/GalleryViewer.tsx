import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { getBarber, getService, type GalleryItem } from "@/data/site";

interface GalleryViewerProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryViewer({ items, index, onClose, onNavigate }: GalleryViewerProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];

  const prev = () => onNavigate((index - 1 + items.length) % items.length);
  const next = () => onNavigate((index + 1) % items.length);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length]);

  if (!item) return null;

  const barber = getBarber(item.barberId);
  const service = getService(item.serviceId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — image ${index + 1} of ${items.length}`}
      className="anim-fade fixed inset-0 z-[120] flex flex-col bg-background/97"
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX ?? null;
        if (start == null || end == null) return;
        if (Math.abs(end - start) > 50) (end < start ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-8">
        <p className="label text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center border border-border-strong transition-colors hover:border-brand hover:text-brand"
          aria-label="Close image viewer"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6 sm:px-16">
        <img
          key={item.id}
          src={item.image}
          alt={`${item.title} — ${service?.name ?? ""} by ${barber?.name ?? ""}`}
          width={item.width}
          height={item.height}
          className="anim-fade max-h-full w-auto max-w-full object-contain"
        />

        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 grid h-12 w-12 place-items-center border border-border-strong bg-background/70 transition-colors hover:border-brand hover:text-brand sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 grid h-12 w-12 place-items-center border border-border-strong bg-background/70 transition-colors hover:border-brand hover:text-brand sm:right-4"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="border-t border-border px-5 py-5 sm:px-8">
        <h2 className="display-lg">{item.title}</h2>
        <p className="label mt-3 text-muted-foreground">
          {barber?.name}
          {service ? ` · ${service.name}` : ""}
        </p>
      </div>
    </div>
  );
}
