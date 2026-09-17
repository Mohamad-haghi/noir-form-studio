import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui-kit/Button";
import { Reveal } from "@/components/ui-kit/Reveal";
import { galleryForBarber, type Barber } from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";

export function BarberCard({ barber, delay = 0 }: { barber: Barber; delay?: number }) {
  const { open } = useBooking();
  const workCount = galleryForBarber(barber.id).length;

  return (
    <Reveal delay={delay} as="article" className="group flex flex-col">
      <Link
        to="/barbers/$barberId"
        params={{ barberId: barber.id }}
        className="relative block aspect-4/5 overflow-hidden bg-surface"
        aria-label={`View ${barber.name}'s profile`}
      >
        <img
          src={barber.image}
          alt={`Portrait of ${barber.name}, ${barber.title}`}
          width={1024}
          height={1280}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        <span
          aria-hidden="true"
          className="absolute top-5 left-5 font-display text-sm font-extrabold tracking-[0.2em] text-brand"
        >
          {barber.order}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-[width] duration-700 ease-editorial group-hover:w-full"
        />
      </Link>

      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="display-lg">{barber.name}</h3>
            <p className="label mt-2 text-brand">{barber.title}</p>
          </div>
          <span className="label shrink-0 pt-1 text-muted-foreground">
            {barber.experienceYears} yrs
          </span>
        </div>

        <p className="label mt-5 text-muted-foreground">
          {barber.specialties.join(" · ")}
        </p>

        <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {barber.bio}
        </p>

        <p className="label mt-5 text-muted-foreground">
          {String(workCount).padStart(2, "0")} selected works
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button className="sm:flex-1" onClick={() => open(barber.id)}>
            Book with {barber.firstName}
          </Button>
          <Button variant="outline" asChild className="sm:flex-1">
            <Link to="/barbers/$barberId" params={{ barberId: barber.id }}>
              View profile
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
