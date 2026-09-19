import { Clock } from "lucide-react";

import {
  barbers,
  formatDuration,
  formatPrice,
  getBarber,
  getService,
  servicesForBarber,
} from "@/data/site";
import { formatLongDate, getDayOptions, getSlots } from "@/lib/booking/availability";
import { useBooking } from "@/lib/booking/BookingProvider";
import { cn } from "@/lib/utils";
import { EmptyState, FieldError, SelectCard, StepTitle, TextField } from "./BookingFields";

export function BarberStep() {
  const { draft, setBarber, errors } = useBooking();

  return (
    <div>
      <StepTitle index="01" title="Select your barber" hint="Both barbers work to the same standard." />
      <div className="grid gap-3 sm:grid-cols-2">
        {barbers.map((barber) => (
          <SelectCard
            key={barber.id}
            selected={draft.barberId === barber.id}
            onClick={() => setBarber(barber.id)}
            ariaLabel={`Select ${barber.name}`}
            className="flex gap-4"
          >
            <img
              src={barber.image}
              alt=""
              width={1024}
              height={1280}
              loading="lazy"
              className="h-24 w-20 shrink-0 object-cover"
            />
            <span className="min-w-0 pe-8">
              <span className="block font-display text-base font-bold uppercase">{barber.name}</span>
              <span className="label mt-2 block text-brand">{barber.title}</span>
              <span className="label mt-2 block text-muted-foreground">
                {barber.specialties.join(" · ")}
              </span>
            </span>
          </SelectCard>
        ))}
      </div>
      <FieldError id="barber-error" message={errors.barber} />
    </div>
  );
}

export function ServiceStep() {
  const { draft, setService, errors } = useBooking();
  const options = servicesForBarber(draft.barberId);
  const barber = getBarber(draft.barberId);

  return (
    <div>
      <StepTitle
        index="02"
        title="Select a service"
        hint={barber ? `Available with ${barber.firstName}.` : undefined}
      />
      {options.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map((service) => (
            <SelectCard
              key={service.id}
              selected={draft.serviceId === service.id}
              onClick={() => setService(service.id)}
              ariaLabel={`Select ${service.name}`}
            >
              <span className="flex items-baseline justify-between gap-3 pe-8">
                <span className="font-display text-base font-bold uppercase">{service.name}</span>
                <span className="font-display text-sm font-bold text-brand">
                  {formatPrice(service.price)}
                </span>
              </span>
              <span className="label mt-2 flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {formatDuration(service.duration)}
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </span>
            </SelectCard>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No services listed"
          body="This barber has no bookable services right now. Choose another barber or call the studio."
        />
      )}
      <FieldError id="service-error" message={errors.service} />
    </div>
  );
}

export function DateStep() {
  const { draft, setDate, errors } = useBooking();
  const days = getDayOptions(draft.barberId);
  const barber = getBarber(draft.barberId);

  return (
    <div>
      <StepTitle
        index="03"
        title="Select a date"
        hint={
          barber
            ? `${barber.firstName} works ${barber.workingHours.start}–${barber.workingHours.end}.`
            : undefined
        }
      />
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:grid sm:grid-cols-7 sm:overflow-visible">
        {days.map((day) => {
          const selected = draft.date === day.date;
          return (
            <button
              key={day.date}
              type="button"
              disabled={!day.available}
              onClick={() => setDate(day.date)}
              aria-pressed={selected}
              aria-label={`${formatLongDate(day.date)}${day.available ? "" : " — closed"}`}
              className={cn(
                "flex min-w-16 shrink-0 flex-col items-center gap-1 border px-3 py-3 transition-[border-color,background-color] duration-300",
                selected
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border hover:border-border-strong",
                !day.available && "cursor-not-allowed border-border/50 text-muted-foreground/40 line-through hover:border-border/50",
              )}
            >
              <span className="label">{day.weekdayShort}</span>
              <span className="font-display text-lg font-bold">{day.dayNumber}</span>
              <span className="label opacity-70">{day.isToday ? "Today" : day.monthShort}</span>
            </button>
          );
        })}
      </div>
      <FieldError id="date-error" message={errors.date} />
    </div>
  );
}

export function TimeStep() {
  const { draft, setTime, errors } = useBooking();
  const slots = getSlots(draft.barberId, draft.serviceId, draft.date);
  const available = slots.filter((s) => s.available);

  return (
    <div>
      <StepTitle
        index="04"
        title="Select a time"
        hint={draft.date ? formatLongDate(draft.date) : undefined}
      />
      {available.length ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {slots.map((slot) => {
            const selected = draft.time === slot.time;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => setTime(slot.time)}
                aria-pressed={selected}
                aria-label={slot.available ? `Book at ${slot.label}` : `${slot.label} unavailable`}
                className={cn(
                  "border py-3.5 font-display text-sm font-bold tracking-wide transition-[border-color,background-color] duration-300",
                  selected
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border hover:border-border-strong",
                  !slot.available &&
                    "cursor-not-allowed border-border/50 text-muted-foreground/35 line-through hover:border-border/50",
                )}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Fully booked"
          body="No appointments available for this day. Please choose another date."
        />
      )}
      <FieldError id="time-error" message={errors.time} />
    </div>
  );
}

export function DetailsStep() {
  const { draft, setCustomerField, errors } = useBooking();

  return (
    <div>
      <StepTitle index="05" title="Your details" hint="We only use these to confirm your appointment." />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="booking-name"
          label="Full name"
          value={draft.customer.name}
          onChange={(v) => setCustomerField("name", v)}
          error={errors.name}
          autoComplete="name"
          placeholder="Alex Bennett"
        />
        <TextField
          id="booking-phone"
          label="Mobile number"
          value={draft.customer.phone}
          onChange={(v) => setCustomerField("phone", v)}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
          type="tel"
          placeholder="+44 7700 000000"
        />
        <TextField
          id="booking-email"
          label="Email"
          optional
          value={draft.customer.email}
          onChange={(v) => setCustomerField("email", v)}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
          type="email"
          placeholder="you@email.com"
        />
        <div className="sm:col-span-2">
          <TextField
            id="booking-note"
            label="Note for your barber"
            optional
            multiline
            value={draft.customer.note}
            onChange={(v) => setCustomerField("note", v)}
            placeholder="Anything we should know before you sit down."
          />
        </div>
      </div>
    </div>
  );
}

export function ReviewStep() {
  const { draft, goTo } = useBooking();
  const barber = getBarber(draft.barberId);
  const service = getService(draft.serviceId);

  const rows: { label: string; value: string; step?: Parameters<typeof goTo>[0] }[] = [
    { label: "Barber", value: barber?.name ?? "—", step: "barber" },
    { label: "Service", value: service?.name ?? "—", step: "service" },
    { label: "Date", value: draft.date ? formatLongDate(draft.date) : "—", step: "date" },
    { label: "Time", value: draft.time ?? "—", step: "time" },
    { label: "Duration", value: service ? formatDuration(service.duration) : "—" },
    { label: "Price", value: service ? formatPrice(service.price) : "—" },
    { label: "Name", value: draft.customer.name || "—", step: "details" },
    { label: "Mobile", value: draft.customer.phone || "—", step: "details" },
  ];

  return (
    <div>
      <StepTitle index="06" title="Review your appointment" />
      <dl className="border-t border-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-border py-4"
          >
            <dt className="label text-muted-foreground">{row.label}</dt>
            <dd className="flex items-baseline gap-3 text-end">
              <span className="font-display text-sm font-bold tracking-wide uppercase">
                {row.value}
              </span>
              {row.step ? (
                <button
                  type="button"
                  onClick={() => goTo(row.step!)}
                  className="label text-brand underline-offset-4 hover:underline"
                >
                  Edit
                </button>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
      {draft.customer.note ? (
        <p className="mt-5 border border-border p-4 text-sm text-muted-foreground">
          “{draft.customer.note}”
        </p>
      ) : null}
    </div>
  );
}
