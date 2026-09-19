import { Check } from "lucide-react";

import { Button } from "@/components/ui-kit/Button";
import { business, formatDuration, formatPrice, getBarber, getService } from "@/data/site";
import { formatLongDate } from "@/lib/booking/availability";
import { useBooking } from "@/lib/booking/BookingProvider";

export function BookingSuccess() {
  const { confirmation, reset, close } = useBooking();
  if (!confirmation) return null;

  const barber = getBarber(confirmation.barberId);
  const service = getService(confirmation.serviceId);

  const rows = [
    { label: "Reference", value: confirmation.reference },
    { label: "Barber", value: barber?.name ?? "—" },
    { label: "Service", value: service?.name ?? "—" },
    { label: "Date", value: confirmation.date ? formatLongDate(confirmation.date) : "—" },
    { label: "Time", value: confirmation.time ?? "—" },
    { label: "Duration", value: service ? formatDuration(service.duration) : "—" },
    { label: "Price", value: service ? formatPrice(service.price) : "—" },
    { label: "Name", value: confirmation.customer.name },
  ];

  return (
    <div className="anim-fade-up">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-brand text-brand">
        <Check className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <h2 className="display-xl mt-7 text-balance">Appointment request received</h2>
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
        We've got your request, {confirmation.customer.name.split(" ")[0]}. The studio will confirm
        by text shortly. Keep your reference handy — quote it if you need to move the appointment.
      </p>

      <dl className="mt-10 border-t border-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-border py-4"
          >
            <dt className="label text-muted-foreground">{row.label}</dt>
            <dd className="font-display text-sm font-bold tracking-wide uppercase">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={reset} className="sm:flex-1">
          Book another appointment
        </Button>
        <Button onClick={close} className="sm:flex-1">
          Done
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Need to change something? Call {business.phone}.
      </p>
    </div>
  );
}
