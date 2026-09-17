import { Clock, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui-kit/Button";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { Reveal } from "@/components/ui-kit/Reveal";
import { formatDuration, formatPrice, getBarber, services } from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";
import { cn } from "@/lib/utils";

export function Services() {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const [openMobileId, setOpenMobileId] = useState<string | null>(services[0]?.id ?? null);
  const { open } = useBooking();
  const active = services.find((s) => s.id === activeId) ?? services[0];

  if (!services.length) {
    return (
      <section id="services" className="border-t border-border py-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <p className="text-sm text-muted-foreground">
            The service list is being updated. Please call the studio to book.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Price List"
          title="The services"
          subtitle="Every appointment includes a consultation, a hot towel and a finish you can repeat at home."
        />

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          {/* Editorial list */}
          <ul className="border-t border-border">
            {services.map((service) => {
              const isActive = service.id === active?.id;
              const isOpen = openMobileId === service.id;
              return (
                <li key={service.id} className="border-b border-border">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(service.id)}
                    onFocus={() => setActiveId(service.id)}
                    onClick={() => {
                      setActiveId(service.id);
                      setOpenMobileId(isOpen ? null : service.id);
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${service.id}`}
                    className="group flex w-full items-center gap-4 py-5 text-left transition-colors sm:gap-6 sm:py-6"
                  >
                    <span
                      className={cn(
                        "label w-7 shrink-0 transition-colors",
                        isActive ? "text-brand" : "text-muted-foreground",
                      )}
                    >
                      {service.index}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 font-display text-xl font-bold uppercase transition-[color,transform] duration-500 ease-editorial sm:text-2xl lg:text-3xl",
                        isActive ? "text-brand lg:translate-x-2" : "text-foreground",
                      )}
                    >
                      {service.name}
                    </span>
                    <span className="label hidden shrink-0 text-muted-foreground sm:block">
                      {formatDuration(service.duration)}
                    </span>
                    <span className="shrink-0 font-display text-base font-bold sm:text-lg">
                      {formatPrice(service.price)}
                    </span>
                    <Plus
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-500 lg:hidden",
                        isOpen && "rotate-45 text-brand",
                      )}
                      strokeWidth={1.5}
                    />
                  </button>

                  {/* Mobile / tablet accordion detail */}
                  <div
                    id={`service-panel-${service.id}`}
                    hidden={!isOpen}
                    className="lg:hidden"
                  >
                    <div className="pb-7">
                      <div className="aspect-16/10 overflow-hidden">
                        <img
                          src={service.image}
                          alt={`${service.name} at Noir & Form`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <p className="label mt-4 flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {formatDuration(service.duration)} · {formatPrice(service.price)}
                      </p>
                      <p className="label mt-3 text-muted-foreground">
                        With{" "}
                        {service.barberIds
                          .map((id) => getBarber(id)?.firstName)
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <Button
                        block
                        className="mt-6"
                        onClick={() => open(service.barberIds[0] ?? null, service.id)}
                      >
                        Book this service
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop detail panel */}
          <Reveal className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 overflow-hidden bg-surface">
                {services.map((service) => (
                  <img
                    key={service.id}
                    src={service.image}
                    alt={`${service.name} at Noir & Form`}
                    loading="lazy"
                    aria-hidden={service.id !== active?.id}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-editorial",
                      service.id === active?.id
                        ? "scale-100 opacity-100"
                        : "scale-[1.04] opacity-0",
                    )}
                  />
                ))}
              </div>

              {active ? (
                <div key={active.id} className="anim-fade mt-7">
                  <div className="flex items-center justify-between gap-4">
                    <p className="label text-brand">{active.index} — Selected</p>
                    <p className="label text-muted-foreground">
                      {formatDuration(active.duration)} · {formatPrice(active.price)}
                    </p>
                  </div>
                  <h3 className="display-lg mt-4">{active.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {active.description}
                  </p>
                  <p className="label mt-5 text-muted-foreground">
                    With{" "}
                    {active.barberIds
                      .map((id) => getBarber(id)?.firstName)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <Button
                    className="mt-7"
                    size="lg"
                    onClick={() => open(active.barberIds[0] ?? null, active.id)}
                  >
                    Book this service
                  </Button>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
