import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui-kit/Button";
import { business, heroMedia } from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";

export function Hero() {
  const { open } = useBooking();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffset(Math.min(window.scrollY, 900)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 sm:pb-20"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ transform: `translate3d(0, ${offset * 0.22}px, 0)` }}
        >
          {heroMedia.video ? (
            <video
              className="h-[112%] w-full object-cover"
              src={heroMedia.video}
              poster={heroMedia.poster}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={heroMedia.image}
              alt="A barber finishing a straight razor shave in the Noir & Form studio"
              width={1920}
              height={1280}
              fetchPriority="high"
              className="anim-slow-zoom h-[112%] w-full object-cover object-[60%_center]"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20" />
      </div>

      <div
        className="mx-auto w-full max-w-[1600px] px-5 sm:px-8"
        style={{ opacity: Math.max(0, 1 - offset / 520) }}
      >
        <p className="anim-fade-up label mb-6 flex items-center gap-3 text-brand [animation-delay:120ms]">
          <span className="h-px w-8 bg-brand" aria-hidden="true" />
          {business.name}
        </p>

        <h1 className="display-hero text-balance">
          <span className="anim-fade-up block [animation-delay:200ms]">Your style.</span>
          <span className="anim-fade-up block text-brand [animation-delay:340ms]">
            Your signature.
          </span>
        </h1>

        <div className="anim-fade-up mt-8 flex flex-col gap-8 [animation-delay:520ms] lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Precision grooming shaped around your style.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={() => open()}>
              Book your appointment
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#studio">Explore the studio</a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#studio"
        aria-label="Scroll to studio introduction"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-brand sm:flex"
      >
        <span className="label">Scroll</span>
        <ArrowDown className="anim-scroll-hint h-4 w-4" strokeWidth={1.5} />
      </a>
    </section>
  );
}
