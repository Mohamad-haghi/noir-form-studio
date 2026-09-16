export type BookingStep =
  | "barber"
  | "service"
  | "date"
  | "time"
  | "details"
  | "review"
  | "success";

export const BOOKING_STEPS: { id: BookingStep; label: string }[] = [
  { id: "barber", label: "Barber" },
  { id: "service", label: "Service" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "details", label: "Details" },
  { id: "review", label: "Review" },
];

export interface Customer {
  name: string;
  phone: string;
  email: string;
  note: string;
}

export interface BookingDraft {
  barberId: string | null;
  serviceId: string | null;
  /** ISO date, YYYY-MM-DD */
  date: string | null;
  /** 24h time, HH:MM */
  time: string | null;
  customer: Customer;
}

export interface ConfirmedBooking extends BookingDraft {
  reference: string;
  createdAt: string;
}

export type FieldErrors = Partial<Record<"barber" | "service" | "date" | "time" | "name" | "phone" | "email", string>>;

/**
 * Transport contract for a future backend. Swap `submitBookingLocally` for an
 * implementation that calls a server function, calendar or SMS provider — no
 * UI component needs to change.
 */
export interface BookingTransport {
  submit(draft: BookingDraft): Promise<ConfirmedBooking>;
}
