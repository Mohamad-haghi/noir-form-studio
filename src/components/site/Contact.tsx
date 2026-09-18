import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui-kit/Button";
import { Reveal } from "@/components/ui-kit/Reveal";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { business } from "@/data/site";

export function Contact() {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-0.16%2C51.505%2C-0.12%2C51.525&layer=mapnik`;

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          index="10"
          eyebrow="Location"
          title="Find the studio"
          subtitle={`${business.address.line1}, ${business.address.city} ${business.address.postcode}`}
        />

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <address className="not-italic">
              <p className="label text-muted-foreground">Address</p>
              <p className="mt-3 font-display text-xl font-bold uppercase">
                {business.address.line1}
                <br />
                {business.address.city} {business.address.postcode}
              </p>
            </address>

            <dl className="mt-10 border-t border-border">
              {business.openingHours.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-4"
                >
                  <dt className="label text-muted-foreground">{row.label}</dt>
                  <dd className="font-display text-sm font-bold tracking-wide">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="solid" asChild>
                <a href={business.phoneHref}>
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  Call the studio
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={business.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={business.instagramUrl} target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  {business.instagram}
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-4/3 overflow-hidden border border-border bg-surface lg:aspect-16/12">
              <iframe
                title={`Map showing ${business.address.line1}, ${business.address.city}`}
                src={mapSrc}
                loading="lazy"
                className="h-full w-full opacity-70 grayscale transition-opacity duration-500 hover:opacity-90"
              />
              <span className="label pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 border border-border-strong bg-background/85 px-3 py-2">
                <MapPin className="h-3.5 w-3.5 text-brand" strokeWidth={1.5} />
                {business.mapQuery}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
