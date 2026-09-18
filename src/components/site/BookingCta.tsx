import { Button } from "@/components/ui-kit/Button";
import { Reveal } from "@/components/ui-kit/Reveal";
import { barbers } from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";

export function BookingCta() {
  const { open } = useBooking();

  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="label text-brand">09 — Appointments</p>
            <h2 className="display-xl mt-6 text-balance">
              Ready for your
              <br />
              next cut?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Choose your barber and reserve your chair.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            {barbers.map((barber) => (
              <Button
                key={barber.id}
                size="lg"
                variant={barber.order === "01" ? "solid" : "outline"}
                className="sm:flex-1 lg:flex-none"
                onClick={() => open(barber.id)}
              >
                Book with {barber.firstName}
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
