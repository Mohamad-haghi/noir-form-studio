import { createFileRoute } from "@tanstack/react-router";

import { BarberSection } from "@/components/site/BarberSection";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { BookingCta } from "@/components/site/BookingCta";
import { Contact } from "@/components/site/Contact";
import { CraftSection } from "@/components/site/CraftSection";
import { Gallery } from "@/components/site/Gallery";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { StudioIntro } from "@/components/site/StudioIntro";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyUs } from "@/components/site/WhyUs";
import { business, services } from "@/data/site";

const title = "Noir & Form — Premium Men's Grooming Studio, London";
const description =
  "Precision haircuts, skin fades and beard sculpting at Noir & Form, a premium men's grooming studio in London. Book with Alex or Daniel online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          additionalType: "https://schema.org/BarberShop",
          name: business.name,
          slogan: business.tagline,
          description: business.shortDescription,
          telephone: business.phone,
          email: business.email,
          priceRange: business.priceRange,
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.line1,
            addressLocality: business.address.city,
            postalCode: business.address.postcode,
            addressCountry: "GB",
          },
          sameAs: [business.instagramUrl],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "20:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday"],
              opens: "10:00",
              closes: "18:00",
            },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Grooming services",
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              price: service.price,
              priceCurrency: "GBP",
              itemOffered: {
                "@type": "Service",
                name: service.name,
                description: service.description,
              },
            })),
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        Noir &amp; Form — premium men&apos;s grooming studio in London
      </h1>
      <Hero />
      <StudioIntro />
      <BarberSection />
      <Services />
      <CraftSection />
      <Gallery />
      <BeforeAfter />
      <WhyUs />
      <Testimonials />
      <BookingCta />
      <Contact />
    </>
  );
}
