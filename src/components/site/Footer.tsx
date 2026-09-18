import { Instagram, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui-kit/Button";
import { business, navigation } from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";

export function Footer() {
  const { open } = useBooking();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background pb-28 pt-16 sm:pb-16 sm:pt-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-[0.14em] uppercase">
              Noir <span className="text-brand">&</span> Form
            </p>
            <p className="label mt-4 text-muted-foreground">{business.tagline}</p>
            <Button className="mt-8" onClick={() => open()}>
              Book appointment
            </Button>
          </div>

          <nav aria-label="Footer">
            <p className="label text-brand">Studio</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="label text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-brand">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={business.phoneHref} className="transition-colors hover:text-foreground">
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {business.email}
                </a>
              </li>
              <li>
                {business.address.line1}, {business.address.city}
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center border border-border-strong transition-colors hover:border-brand hover:text-brand"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center border border-border-strong transition-colors hover:border-brand hover:text-brand"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-muted-foreground">
            © {year} {business.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <a href="/#contact" className="label text-muted-foreground hover:text-foreground">
                Privacy
              </a>
            </li>
            <li>
              <a href="/#contact" className="label text-muted-foreground hover:text-foreground">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
