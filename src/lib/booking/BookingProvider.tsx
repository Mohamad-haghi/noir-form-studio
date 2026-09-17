import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { barbers, getService, servicesForBarber } from "@/data/site";
import { getSlots, worksOnDate } from "./availability";
import { localTransport } from "./transport";
import { validateAll, validateStep } from "./validation";
import {
  BOOKING_STEPS,
  type BookingDraft,
  type BookingStep,
  type BookingTransport,
  type ConfirmedBooking,
  type Customer,
  type FieldErrors,
} from "./types";

const emptyDraft: BookingDraft = {
  barberId: null,
  serviceId: null,
  date: null,
  time: null,
  customer: { name: "", phone: "", email: "", note: "" },
};

interface BookingContextValue {
  isOpen: boolean;
  open: (barberId?: string | null, serviceId?: string | null) => void;
  close: () => void;
  draft: BookingDraft;
  step: BookingStep;
  stepIndex: number;
  steps: typeof BOOKING_STEPS;
  errors: FieldErrors;
  isSubmitting: boolean;
  submitError: string | null;
  confirmation: ConfirmedBooking | null;
  setBarber: (id: string) => void;
  setService: (id: string) => void;
  setDate: (iso: string) => void;
  setTime: (time: string) => void;
  setCustomerField: (field: keyof Customer, value: string) => void;
  goTo: (step: BookingStep) => void;
  next: () => void;
  back: () => void;
  confirm: () => Promise<void>;
  reset: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({
  children,
  transport = localTransport,
}: {
  children: ReactNode;
  transport?: BookingTransport;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [step, setStep] = useState<BookingStep>("barber");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmedBooking | null>(null);

  const reset = useCallback(() => {
    setDraft(emptyDraft);
    setStep("barber");
    setErrors({});
    setSubmitError(null);
    setConfirmation(null);
    setIsSubmitting(false);
  }, []);

  const open = useCallback((barberId?: string | null, serviceId?: string | null) => {
    setErrors({});
    setSubmitError(null);
    setConfirmation(null);
    setDraft((prev) => ({
      ...prev,
      barberId: barberId ?? prev.barberId,
      serviceId: serviceId ?? prev.serviceId,
    }));
    setStep(barberId ? (serviceId ? "date" : "service") : "barber");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const setBarber = useCallback((id: string) => {
    setErrors((e) => ({ ...e, barber: undefined }));
    setDraft((prev) => {
      const allowed = servicesForBarber(id).some((s) => s.id === prev.serviceId);
      const barber = barbers.find((b) => b.id === id);
      const stillWorks = barber && prev.date ? worksOnDate(barber, prev.date) : true;
      return {
        ...prev,
        barberId: id,
        serviceId: allowed ? prev.serviceId : null,
        date: stillWorks ? prev.date : null,
        time: null,
      };
    });
  }, []);

  const setService = useCallback((id: string) => {
    setErrors((e) => ({ ...e, service: undefined }));
    setDraft((prev) => ({ ...prev, serviceId: id, time: null }));
  }, []);

  const setDate = useCallback((iso: string) => {
    setErrors((e) => ({ ...e, date: undefined }));
    setDraft((prev) => ({ ...prev, date: iso, time: null }));
  }, []);

  const setTime = useCallback((time: string) => {
    setErrors((e) => ({ ...e, time: undefined }));
    setDraft((prev) => ({ ...prev, time }));
  }, []);

  const setCustomerField = useCallback((field: keyof Customer, value: string) => {
    setErrors((e) => ({ ...e, [field]: undefined }));
    setDraft((prev) => ({ ...prev, customer: { ...prev.customer, [field]: value } }));
  }, []);

  const stepIndex = BOOKING_STEPS.findIndex((s) => s.id === step);

  const goTo = useCallback((target: BookingStep) => {
    setErrors({});
    setStep(target);
  }, []);

  const next = useCallback(() => {
    const stepErrors = validateStep(step, draft);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    const order = BOOKING_STEPS.map((s) => s.id);
    const idx = order.indexOf(step);
    setStep(order[Math.min(idx + 1, order.length - 1)]);
  }, [draft, step]);

  const back = useCallback(() => {
    const order = BOOKING_STEPS.map((s) => s.id);
    const idx = order.indexOf(step);
    setErrors({});
    setStep(order[Math.max(idx - 1, 0)]);
  }, [step]);

  const confirm = useCallback(async () => {
    const allErrors = validateAll(draft);
    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      const first = (["barber", "service", "date", "time"] as const).find((k) => allErrors[k]);
      if (first) setStep(first);
      else setStep("details");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await transport.submit(draft);
      setConfirmation(result);
      setStep("success");
    } catch {
      setSubmitError("We couldn't send your request just now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [draft, transport]);

  // keep an invalid slot from surviving a date/service change
  useEffect(() => {
    if (!draft.time) return;
    const slots = getSlots(draft.barberId, draft.serviceId, draft.date);
    if (!slots.some((s) => s.time === draft.time && s.available)) {
      setDraft((prev) => ({ ...prev, time: null }));
    }
  }, [draft.barberId, draft.serviceId, draft.date, draft.time]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const value = useMemo<BookingContextValue>(
    () => ({
      isOpen,
      open,
      close,
      draft,
      step,
      stepIndex,
      steps: BOOKING_STEPS,
      errors,
      isSubmitting,
      submitError,
      confirmation,
      setBarber,
      setService,
      setDate,
      setTime,
      setCustomerField,
      goTo,
      next,
      back,
      confirm,
      reset,
    }),
    [
      isOpen,
      open,
      close,
      draft,
      step,
      stepIndex,
      errors,
      isSubmitting,
      submitError,
      confirmation,
      setBarber,
      setService,
      setDate,
      setTime,
      setCustomerField,
      goTo,
      next,
      back,
      confirm,
      reset,
    ],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export const selectedService = (draft: BookingDraft) => getService(draft.serviceId);
