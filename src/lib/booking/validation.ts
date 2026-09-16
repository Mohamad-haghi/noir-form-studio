import type { BookingDraft, BookingStep, FieldErrors } from "./types";

const phonePattern = /^\+?[\d\s().-]{9,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateStep(step: BookingStep, draft: BookingDraft): FieldErrors {
  const errors: FieldErrors = {};

  if (step === "barber" && !draft.barberId) {
    errors.barber = "Please choose a barber.";
  }
  if (step === "service" && !draft.serviceId) {
    errors.service = "Please choose a service.";
  }
  if (step === "date" && !draft.date) {
    errors.date = "Please choose a date.";
  }
  if (step === "time" && !draft.time) {
    errors.time = "Please choose a time.";
  }
  if (step === "details" || step === "review") {
    if (draft.customer.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }
    if (!phonePattern.test(draft.customer.phone.trim())) {
      errors.phone = "Please enter a valid mobile number.";
    }
    if (draft.customer.email.trim() && !emailPattern.test(draft.customer.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }
  return errors;
}

export function validateAll(draft: BookingDraft): FieldErrors {
  return {
    ...validateStep("barber", draft),
    ...validateStep("service", draft),
    ...validateStep("date", draft),
    ...validateStep("time", draft),
    ...validateStep("details", draft),
  };
}
