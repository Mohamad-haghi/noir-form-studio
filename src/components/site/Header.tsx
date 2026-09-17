import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui-kit/Button";
import { business, navigation } from "@/data/site";
import { useBooking } from "@/lib/booking/BookingProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:h-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link
          to="/"
          className="min-w-0 font-display text-base font-extrabold tracking-[0.18em] uppercase transition-colors hover:text-brand sm:text-lg"
          aria-label={`${business.name} — home`}
        >
          Noir <span className="text-brand">&</span> Form
        </Link>

        <nav aria-label="Main" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="label relative text-muted-foreground transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-foreground hover:after:origin-left hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => open()}
            variant="solid"
          >
            Book Now
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid h-11 w-11 shrink-0 place-items-center border border-border-strong text-foreground transition-colors hover:border-brand hover:text-brand lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile / tablet overlay navigation */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background transition-[opacity,visibility] duration-500 ease-editorial lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8">
          <span className="font-display text-base font-extrabold tracking-[0.18em] uppercase">
            Noir <span className="text-brand">&</span> Form
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="grid h-11 w-11 place-items-center border border-border-strong transition-colors hover:border-brand hover:text-brand"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="flex h-[calc(100%-4rem)] flex-col justify-between overflow-y-auto px-5 pb-10 sm:px-8"
        >
          <ul className="mt-6 flex flex-col">
            {navigation.map((item, i) => (
              <li key={item.label} className="border-b border-border">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-5 transition-colors hover:text-brand"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  <span className="label w-6 text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display-lg">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-6">
            <Button
              size="lg"
              block
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
            >
              Book an appointment
            </Button>
            <div className="space-y-1 text-sm text-muted-foreground">
              <a href={business.phoneHref} className="block hover:text-brand">
                {business.phone}
              </a>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-brand"
              >
                {business.instagram}
              </a>
              <p>
                {business.address.line1}, {business.address.city}
              </p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
