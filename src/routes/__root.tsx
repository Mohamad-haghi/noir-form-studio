import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BookingProvider } from "@/lib/booking/BookingProvider";
import { BookingOverlay } from "@/components/booking/BookingOverlay";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingBookButton } from "@/components/site/FloatingBookButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-md">
        <p className="label text-brand">404</p>
        <h1 className="display-xl mt-4">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page doesn't exist or has moved. The studio is still open.
        </p>
        <Link
          to="/"
          className="label mt-8 inline-flex h-12 items-center border border-border-strong px-6 transition-colors hover:border-brand hover:text-brand"
        >
          Back to the studio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-md">
        <p className="label text-brand">Something went wrong</p>
        <h1 className="display-lg mt-4">This page didn't load</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Try again, or call the studio to book by phone.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="label inline-flex h-12 items-center bg-brand px-6 text-brand-foreground transition-colors hover:bg-brand-soft"
          >
            Try again
          </button>
          <a
            href="/"
            className="label inline-flex h-12 items-center border border-border-strong px-6 transition-colors hover:border-brand hover:text-brand"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Noir & Form — Premium Men's Grooming Studio, London" },
      {
        name: "description",
        content:
          "Noir & Form is a premium men's grooming studio in London. Precision cuts, skin fades and beard sculpting by appointment.",
      },
      { name: "theme-color", content: "#141312" },
      { property: "og:site_name", content: "Noir & Form" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600;700&family=Vazirmatn:wght@400;600;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <Header />
        <main id="main">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <Footer />
        <FloatingBookButton />
        <BookingOverlay />
      </BookingProvider>
    </QueryClientProvider>
  );
}
