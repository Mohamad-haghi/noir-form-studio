import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";

import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Button } from "@/components/ui-kit/Button";
import { Reveal } from "@/components/ui-kit/Reveal";
import {
  barbers,
  formatDuration,
  formatPrice,
  galleryForBarber,
  getBarber,
  getService,
  testimonials,
} from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";

const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Route = createFileRoute("/barbers/$barberId")({
  loader: ({ params }) => {
    const barber = barbers.find((b) => b.id === params.barberId);
    if (!barber) throw notFound();
    return { barberId: barber.id, name: barber.name, title: barber.title, bio: barber.bio };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Barber not found — Noir & Form" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — ${loaderData.title} | Noir & Form`;
    const description = `${loaderData.name} at Noir & Form, London. ${loaderData.bio.slice(0, 120)}…`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/barbers/${loaderData.barberId}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/barbers/${loaderData.barberId}` }],
    };
  },
  component: BarberProfilePage,
});

function BarberProfilePage() {
  const { barberId } = Route.useParams();
  const barber = getBarber(barberId);
  const { open } = useBooking();

  if (!barber) return null;

  const barberServices = barber.serviceIds.map((id) => getService(id)).filter(Boolean);
  const work = galleryForBarber(barber.id);
  const stories = testimonials.filter((t) =>
    barberServices.some((s) => s?.name === t.service),
  );

  return (
    <>
      <section className="border-b border-border pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Link
            to="/"
            className="label inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            All barbers
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal className="relative">
              <div className="aspect-4/5 overflow-hidden bg-surface">
                <img
                  src={barber.image}
                  alt={`Portrait of ${barber.name}, ${barber.title} at Noir & Form`}
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={90}>
              <p className="label text-brand">
                {barber.order} — {barber.title}
              </p>
              <h1 className="display-xl mt-5">{barber.name}</h1>
              <p className="label mt-5 text-muted-foreground">
                {barber.specialties.join(" · ")}
              </p>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
                {barber.bio}
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
                <div className="border-l border-border pl-4">
                  <dt className="label text-muted-foreground">Experience</dt>
                  <dd className="font-display text-2xl font-extrabold">
                    {barber.experienceYears} yrs
                  </dd>
                </div>
                <div className="border-l border-border pl-4">
                  <dt className="label text-muted-foreground">Selected work</dt>
                  <dd className="font-display text-2xl font-extrabold">
                    {String(work.length).padStart(2, "0")}
                  </dd>
                </div>
                <div className="border-l border-border pl-4">
                  <dt className="label text-muted-foreground">Services</dt>
                  <dd className="font-display text-2xl font-extrabold">
                    {String(barberServices.length).padStart(2, "0")}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="label text-brand">Working days</p>
                  <p className="mt-3 font-display text-sm font-bold tracking-wide uppercase">
                    {barber.workingDays.map((d) => weekdayNames[d]).join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="label text-brand">Working hours</p>
                  <p className="mt-3 font-display text-sm font-bold tracking-wide uppercase">
                    {barber.workingHours.start} — {barber.workingHours.end}
                  </p>
                </div>
              </div>

              <Button size="lg" className="mt-10" onClick={() => open(barber.id)}>
                Book with {barber.firstName}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal className="flex items-center gap-4">
            <span className="label text-brand">Services with {barber.firstName}</span>
            <span className="hairline flex-1" aria-hidden="true" />
          </Reveal>

          <ul className="mt-10 border-t border-border">
            {barberServices.map((service) =>
              service ? (
                <li
                  key={service.id}
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border py-5"
                >
                  <span className="label w-7 text-brand">{service.index}</span>
                  <span className="min-w-0 flex-1 font-display text-lg font-bold uppercase sm:text-xl">
                    {service.name}
                  </span>
                  <span className="label flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3 w-3" strokeWidth={1.5} />
                    {formatDuration(service.duration)}
                  </span>
                  <span className="font-display text-base font-bold">
                    {formatPrice(service.price)}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => open(barber.id, service.id)}>
                    Book
                  </Button>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>

      <Gallery
        items={work}
        showBarberFilter={false}
        compact
        heading={{
          eyebrow: "Portfolio",
          title: `Work by ${barber.firstName}`,
          subtitle: "Tap any image to open it full screen.",
        }}
      />

      {stories.length ? <Testimonials items={stories} /> : null}

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <h2 className="display-xl text-balance">Reserve your chair with {barber.firstName}</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Pick a service, a day and a time. You'll get a confirmation reference straight away.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button size="lg" onClick={() => open(barber.id)}>
                Book with {barber.firstName}
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">Back to studio</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
