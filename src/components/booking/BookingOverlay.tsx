import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { useBooking } from "@/lib/booking/BookingProvider";
import { cn } from "@/lib/utils";
import { BookingEngine } from "./BookingEngine";

export function BookingOverlay() {
  const { isOpen, close } = useBooking();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[110] transition-[opacity,visibility] duration-400 ease-editorial",
        isOpen ? "visible opacity-100" : "invisible opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close booking"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-background/85 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book an appointment"
        tabIndex={-1}
        ref={panelRef}
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[94svh] flex-col border-t border-border bg-background transition-transform duration-500 ease-editorial sm:inset-y-0 sm:left-auto sm:max-h-none sm:w-[min(40rem,100%)] sm:border-s sm:border-t-0",
          isOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-0",
        )}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-8">
          <p className="label text-muted-foreground">
            Noir <span className="text-brand">&</span> Form — Booking
          </p>
          <button
            type="button"
            onClick={close}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Close booking"
            className="grid h-11 w-11 place-items-center border border-border-strong transition-colors hover:border-brand hover:text-brand"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-10">
          {isOpen ? <BookingEngine /> : null}
        </div>
      </div>
    </div>
  );
}
