import { useEffect, useState } from "react";

import { Button } from "@/components/ui-kit/Button";
import { useBooking } from "@/lib/booking/BookingProvider";
import { cn } from "@/lib/utils";

/** Persistent mobile booking CTA. Hidden while the booking engine is open. */
export function FloatingBookButton() {
  const { open, isOpen } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-[transform,opacity] duration-500 ease-editorial sm:hidden",
        visible && !isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <Button size="lg" block onClick={() => open()}>
        Book an appointment
      </Button>
    </div>
  );
}
