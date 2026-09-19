import { AlertCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui-kit/Button";
import { formatDuration, formatPrice, getBarber, getService } from "@/data/site";
import { formatLongDate } from "@/lib/booking/availability";
import { useBooking } from "@/lib/booking/BookingProvider";
import { cn } from "@/lib/utils";
import { BookingSuccess } from "./BookingSuccess";
import { BarberStep, DateStep, DetailsStep, ReviewStep, ServiceStep, TimeStep } from "./steps";

export function BookingEngine() {
  const { step, stepIndex, steps, goTo, next, back, confirm, isSubmitting, submitError, draft } =
    useBooking();

  if (step === "success") return <BookingSuccess />;

  const barber = getBarber(draft.barberId);
  const service = getService(draft.serviceId);

  return (
    <div>
      {/* progress */}
      <ol className="mb-10 flex flex-wrap gap-x-5 gap-y-2" aria-label="Booking steps">
        {steps.map((s, i) => {
          const state = i === stepIndex ? "current" : i < stepIndex ? "done" : "todo";
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => i <= stepIndex && goTo(s.id)}
                disabled={i > stepIndex}
                aria-current={state === "current" ? "step" : undefined}
                className={cn(
                  "label flex items-center gap-2 transition-colors",
                  state === "current" && "text-brand",
                  state === "done" && "text-muted-foreground hover:text-foreground",
                  state === "todo" && "text-muted-foreground/40",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px transition-[width,background-color] duration-500",
                    state === "current" ? "w-6 bg-brand" : "w-3 bg-border-strong",
                  )}
                />
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>

      <div key={step} className="anim-fade">
        {step === "barber" ? <BarberStep /> : null}
        {step === "service" ? <ServiceStep /> : null}
        {step === "date" ? <DateStep /> : null}
        {step === "time" ? <TimeStep /> : null}
        {step === "details" ? <DetailsStep /> : null}
        {step === "review" ? <ReviewStep /> : null}
      </div>

      {submitError ? (
        <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          {submitError}
        </p>
      ) : null}

      {/* summary + actions */}
      <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-muted-foreground">
          {[
            barber?.firstName,
            service?.name,
            draft.date ? formatLongDate(draft.date) : null,
            draft.time,
            service ? `${formatDuration(service.duration)} · ${formatPrice(service.price)}` : null,
          ]
            .filter(Boolean)
            .join(" · ") || "Nothing selected yet"}
        </p>

        <div className="flex gap-3">
          {stepIndex > 0 ? (
            <Button variant="outline" onClick={back} disabled={isSubmitting}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back
            </Button>
          ) : null}

          {step === "review" ? (
            <Button onClick={confirm} disabled={isSubmitting} size="lg" className="flex-1 sm:flex-none">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Sending
                </>
              ) : (
                "Confirm appointment"
              )}
            </Button>
          ) : (
            <Button onClick={next} className="flex-1 sm:flex-none">
              Continue
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
