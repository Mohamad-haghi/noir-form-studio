/**
 * NOIR & FORM — single source of truth for all business content.
 *
 * Replace the values in this file to rebrand the whole site: nothing here is
 * referenced by design, only by data shape. All content below is fictional
 * demo data.
 */

import heroImage from "@/assets/hero.jpg";
import studioImage from "@/assets/studio.jpg";
import barberAlex from "@/assets/barber-alex.jpg";
import barberDaniel from "@/assets/barber-daniel.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import craft1 from "@/assets/craft-1.jpg";
import craft2 from "@/assets/craft-2.jpg";
import beforeImage from "@/assets/before.jpg";
import afterImage from "@/assets/after.jpg";

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface BusinessInfo {
  name: string;
  tagline: string;
  shortDescription: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  email: string;
  address: { line1: string; city: string; postcode: string; country: string };
  mapQuery: string;
  openingHours: { label: string; value: string }[];
  priceRange: string;
}

export interface Barber {
  id: string;
  order: string;
  name: string;
  firstName: string;
  title: string;
  image: string;
  bio: string;
  specialties: string[];
  experienceYears: number;
  serviceIds: string[];
  workingDays: Weekday[];
  workingHours: { start: string; end: string };
}

export interface Service {
  id: string;
  index: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: GalleryCategory;
  barberIds: string[];
  image: string;
}

export type GalleryCategory = "fade" | "classic" | "beard" | "styling" | "grooming";

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: GalleryCategory;
  barberId: string;
  serviceId: string;
  span: "feature" | "tall" | "wide" | "square";
  width: number;
  height: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  service: string;
  rating: number;
}

export const business: BusinessInfo = {
  name: "Noir & Form",
  tagline: "Your style. Your signature.",
  shortDescription:
    "A modern men's grooming studio in London built around precision, personal style and attention to detail.",
  phone: "+44 20 0000 0000",
  phoneHref: "tel:+442000000000",
  whatsapp: "https://wa.me/442000000000",
  instagram: "@noirandform",
  instagramUrl: "https://instagram.com/noirandform",
  email: "studio@noirandform.com",
  address: {
    line1: "24 West Avenue",
    city: "London",
    postcode: "W1A 0AX",
    country: "United Kingdom",
  },
  mapQuery: "24 West Avenue, London",
  openingHours: [
    { label: "Mon — Fri", value: "09:00 — 20:00" },
    { label: "Saturday", value: "10:00 — 18:00" },
    { label: "Sunday", value: "Closed" },
  ],
  priceRange: "££",
};

export const currency = { symbol: "£", code: "GBP" };

export const formatPrice = (value: number) => `${currency.symbol}${value}`;
export const formatDuration = (minutes: number) =>
  minutes >= 60
    ? `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ""}`
    : `${minutes} min`;

export const services: Service[] = [
  {
    id: "signature-haircut",
    index: "01",
    name: "Signature Haircut",
    description:
      "A consultation-led cut shaped around your hair growth, face structure and the way you actually wear it. Finished with a hot towel and light styling.",
    duration: 45,
    price: 42,
    category: "styling",
    barberIds: ["alex", "daniel"],
    image: work4,
  },
  {
    id: "skin-fade",
    index: "02",
    name: "Skin Fade",
    description:
      "A seamless graduation from skin to length, built with clipper-over-comb work and finished with a razor-clean neckline.",
    duration: 45,
    price: 45,
    category: "fade",
    barberIds: ["alex"],
    image: work1,
  },
  {
    id: "haircut-beard",
    index: "03",
    name: "Haircut + Beard",
    description:
      "The full reset. A tailored cut paired with a sculpted beard line, balanced together so the whole silhouette reads intentional.",
    duration: 75,
    price: 68,
    category: "beard",
    barberIds: ["alex", "daniel"],
    image: work3,
  },
  {
    id: "beard-sculpt",
    index: "04",
    name: "Beard Sculpt",
    description:
      "Shape, line and length refined with trimmer and straight razor, then conditioned with warm oil and a hot towel finish.",
    duration: 30,
    price: 28,
    category: "beard",
    barberIds: ["daniel"],
    image: work3,
  },
  {
    id: "classic-cut",
    index: "05",
    name: "Classic Cut",
    description:
      "Scissor-led tailoring for timeless shapes — side parts, tapers and crops cut with restraint and precision.",
    duration: 45,
    price: 40,
    category: "classic",
    barberIds: ["daniel"],
    image: work2,
  },
  {
    id: "styling",
    index: "06",
    name: "Styling",
    description:
      "A wash, blow-dry and product session with a walkthrough of how to rebuild the look yourself in five minutes.",
    duration: 30,
    price: 24,
    category: "styling",
    barberIds: ["alex", "daniel"],
    image: work4,
  },
  {
    id: "grooming-facial",
    index: "07",
    name: "Grooming Facial",
    description:
      "Deep cleanse, exfoliation and hot towel treatment designed for skin that lives under a beard and a razor.",
    duration: 45,
    price: 55,
    category: "grooming",
    barberIds: ["daniel"],
    image: work6,
  },
];

export const barbers: Barber[] = [
  {
    id: "alex",
    order: "01",
    name: "Alex Morgan",
    firstName: "Alex",
    title: "Senior Barber · Fade Specialist",
    image: barberAlex,
    bio: "Alex builds his work around structure. Twelve years behind the chair have made him one of the most requested fade barbers in the city — precise, fast and completely unhurried in the way he reads a head of hair. He works best with clients who want a sharp, contemporary silhouette they can wear straight out of the studio.",
    specialties: ["Fade", "Modern Cut", "Styling"],
    experienceYears: 12,
    serviceIds: ["signature-haircut", "skin-fade", "haircut-beard", "styling"],
    workingDays: [1, 2, 3, 4, 5, 6],
    workingHours: { start: "09:00", end: "20:00" },
  },
  {
    id: "daniel",
    order: "02",
    name: "Daniel Morgan",
    firstName: "Daniel",
    title: "Master Barber · Beard & Classic",
    image: barberDaniel,
    bio: "Daniel is a traditionalist with a modern eye. Trained in scissor-led classic barbering, he specialises in beard architecture and the kind of quiet, well-tailored cut that gets noticed without announcing itself. Expect a slow consultation, a straight razor and a finish that holds for weeks.",
    specialties: ["Classic Cut", "Beard", "Grooming"],
    experienceYears: 15,
    serviceIds: [
      "signature-haircut",
      "classic-cut",
      "haircut-beard",
      "beard-sculpt",
      "grooming-facial",
      "styling",
    ],
    workingDays: [1, 2, 3, 4, 5],
    workingHours: { start: "10:00", end: "19:00" },
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    image: work1,
    title: "Zero Fade, Textured Crop",
    category: "fade",
    barberId: "alex",
    serviceId: "skin-fade",
    span: "feature",
    width: 1200,
    height: 1504,
  },
  {
    id: "g2",
    image: work2,
    title: "Tailored Side Part",
    category: "classic",
    barberId: "daniel",
    serviceId: "classic-cut",
    span: "wide",
    width: 1408,
    height: 1008,
  },
  {
    id: "g3",
    image: work3,
    title: "Straight Razor Beard Line",
    category: "beard",
    barberId: "daniel",
    serviceId: "beard-sculpt",
    span: "square",
    width: 1200,
    height: 1200,
  },
  {
    id: "g4",
    image: work4,
    title: "Matte Finish Styling",
    category: "styling",
    barberId: "alex",
    serviceId: "styling",
    span: "tall",
    width: 1200,
    height: 1504,
  },
  {
    id: "g5",
    image: work5,
    title: "The Studio Kit",
    category: "grooming",
    barberId: "daniel",
    serviceId: "grooming-facial",
    span: "wide",
    width: 1408,
    height: 1008,
  },
  {
    id: "g6",
    image: work6,
    title: "Hot Towel Ritual",
    category: "grooming",
    barberId: "daniel",
    serviceId: "grooming-facial",
    span: "square",
    width: 1200,
    height: 1200,
  },
  {
    id: "g7",
    image: craft1,
    title: "Clipper Work, Close",
    category: "fade",
    barberId: "alex",
    serviceId: "skin-fade",
    span: "wide",
    width: 1600,
    height: 1008,
  },
  {
    id: "g8",
    image: craft2,
    title: "Scissor Over Comb",
    category: "classic",
    barberId: "daniel",
    serviceId: "signature-haircut",
    span: "wide",
    width: 1600,
    height: 1008,
  },
];

export const galleryCategories: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fade", label: "Fade" },
  { id: "classic", label: "Classic" },
  { id: "beard", label: "Beard" },
  { id: "styling", label: "Styling" },
  { id: "grooming", label: "Grooming" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "First place in London where I didn't have to explain what I wanted twice. Alex read my hair in about thirty seconds and the fade has grown out perfectly for six weeks.",
    name: "James Whitfield",
    service: "Skin Fade",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Daniel completely rebuilt my beard line. It's the first time it has looked deliberate rather than just long. The hot towel finish alone is worth the booking.",
    name: "Marcus Adeyemi",
    service: "Beard Sculpt",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Quiet, considered and genuinely premium without being pretentious. I book the haircut and beard together every month and it's become a non-negotiable.",
    name: "Oliver Reid",
    service: "Haircut + Beard",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "I've had classic cuts for twenty years and this was the sharpest. Scissor work you can actually see in the mirror afterwards.",
    name: "Henry Calloway",
    service: "Classic Cut",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "Booked the grooming facial before a wedding on a whim. My skin looked better in the photos than it has in years. Ridiculously good.",
    name: "Samir Haddad",
    service: "Grooming Facial",
    rating: 4,
  },
];

export const studioStats = [
  { value: "02", label: "Barbers" },
  { value: "10+", label: "Years experience" },
  { value: "1000+", label: "Appointments" },
  { value: "One", label: "Standard" },
];

export const craftChapters = [
  {
    index: "01",
    title: "Precision",
    body: "Every appointment opens with a consultation, not a clipper. We map growth patterns, cowlicks and how you actually wear your hair before anything is cut.",
    image: craft2,
  },
  {
    index: "02",
    title: "The Fade",
    body: "Graduation is built in layers, blade by blade, checked against the light. The line should disappear — that is the entire point of it.",
    image: craft1,
  },
  {
    index: "03",
    title: "The Detail",
    body: "Necklines, temples and beard edges are finished with a straight razor. This is the five minutes most people never see and always notice.",
    image: work3,
  },
  {
    index: "04",
    title: "The Finish",
    body: "Hot towel, matte product, and a walkthrough so the look is repeatable at home on a Tuesday morning without us.",
    image: work4,
  },
];

export const whyUs = [
  {
    index: "01",
    title: "Precision",
    body: "Structured cutting, checked from four angles. Nothing leaves the chair unbalanced.",
  },
  {
    index: "02",
    title: "Personal Style",
    body: "We shape the cut around your life and your routine, not a trend cycle.",
  },
  {
    index: "03",
    title: "Craftsmanship",
    body: "Scissor-led technique, straight razor finishing and tools maintained like instruments.",
  },
  {
    index: "04",
    title: "Consistency",
    body: "The same standard on your tenth visit as your first. Same barber, same result.",
  },
];

export const transformation = {
  title: "The Transformation",
  before: { image: beforeImage, label: "Before" },
  after: { image: afterImage, label: "After" },
  caption: "Signature Haircut + Beard Sculpt · 75 minutes with Daniel",
  disclaimer: "Results shown are representative examples. Individual results may vary.",
};

export const heroMedia = {
  image: heroImage,
  /** Drop a studio film here later — the hero renders it in place of the image. */
  video: null as string | null,
  poster: heroImage,
};

export const studioMedia = { image: studioImage };

export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Barbers", href: "/#barbers" },
  { label: "Services", href: "/#services" },
  { label: "The Craft", href: "/#craft" },
  { label: "About", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
];

export const bookingSettings = {
  slotIntervalMinutes: 30,
  daysAhead: 21,
  leadTimeHours: 2,
  referencePrefix: "NF",
};

export const getBarber = (id?: string | null) => barbers.find((b) => b.id === id);
export const getService = (id?: string | null) => services.find((s) => s.id === id);
export const servicesForBarber = (barberId?: string | null) => {
  const barber = getBarber(barberId);
  if (!barber) return services;
  return services.filter((s) => barber.serviceIds.includes(s.id));
};
export const galleryForBarber = (barberId: string) =>
  gallery.filter((item) => item.barberId === barberId);
export const testimonialsForService = (serviceNames: string[]) =>
  testimonials.filter((t) => serviceNames.includes(t.service));
