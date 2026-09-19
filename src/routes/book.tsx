import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { BookingEngine } from "@/components/booking/BookingEngine";
import { barbers, business } from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";

const title = "Book an appointment — Noir & Form";
const description =
  "Book a haircut, skin fade, beard sculpt or grooming facial with Alex or Daniel at Noir & Form, London.";

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => ({
    barber: typeof search.barber === "string" ? search.barber : undefined,
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/book" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const { barber, service } = Route.useSearch();
  const { setBarber, setService, goTo } = useBooking();

  useEffect(() => {
    if (barber && barbers.some((b) => b.id === barber)) {
      setBarber(barber);
      goTo(service ? "date" : "service");
    }
    if (service) setService(service);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barber, service]);

  return (
    <section className="pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="label text-brand">Appointments</p>
        <h1 className="display-xl mt-4">Book your chair</h1>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Six short steps. No account, no deposit — we confirm by text. Prefer to talk? Call{" "}
          <a href={business.phoneHref} className="text-brand hover:underline">
            {business.phone}
          </a>
          .
        </p>

        <div className="mt-12 border border-border p-5 sm:p-8">
          <BookingEngine />
        </div>
      </div>
    </section>
  );
}
