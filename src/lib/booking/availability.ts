import {
  barbers,
  bookingSettings,
  getBarber,
  getService,
  type Barber,
  type Weekday,
} from "@/data/site";

export interface DayOption {
  /** YYYY-MM-DD */
  date: string;
  weekdayShort: string;
  dayNumber: string;
  monthShort: string;
  isToday: boolean;
  available: boolean;
}

export interface SlotOption {
  time: string;
  label: string;
  available: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const toISODate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Parse a YYYY-MM-DD string as a local date without timezone drift. */
export const fromISODate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0, 0);
};

const minutesOf = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Stable pseudo-random hash so SSR and client agree on demo availability. */
const hash = (input: string) => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

export const worksOnDate = (barber: Barber, iso: string) =>
  barber.workingDays.includes(fromISODate(iso).getDay() as Weekday);

export function getDayOptions(barberId: string | null, today = new Date()): DayOption[] {
  const barber = getBarber(barberId);
  const todayISO = toISODate(today);
  const options: DayOption[] = [];

  for (let i = 0; i < bookingSettings.daysAhead; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const iso = toISODate(d);
    const candidates = barber ? [barber] : barbers;
    options.push({
      date: iso,
      weekdayShort: d.toLocaleDateString("en-GB", { weekday: "short" }),
      dayNumber: pad(d.getDate()),
      monthShort: d.toLocaleDateString("en-GB", { month: "short" }),
      isToday: iso === todayISO,
      available: candidates.some((b) => worksOnDate(b, iso)),
    });
  }
  return options;
}

export function getSlots(
  barberId: string | null,
  serviceId: string | null,
  iso: string | null,
  now = new Date(),
): SlotOption[] {
  const barber = getBarber(barberId);
  if (!barber || !iso || !worksOnDate(barber, iso)) return [];

  const service = getService(serviceId);
  const duration = service?.duration ?? bookingSettings.slotIntervalMinutes;
  const open = minutesOf(barber.workingHours.start);
  const close = minutesOf(barber.workingHours.end);
  const step = bookingSettings.slotIntervalMinutes;

  const isToday = iso === toISODate(now);
  const earliest = isToday
    ? now.getHours() * 60 + now.getMinutes() + bookingSettings.leadTimeHours * 60
    : -1;

  const slots: SlotOption[] = [];
  for (let t = open; t + duration <= close; t += step) {
    const time = `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
    const seeded = hash(`${barber.id}|${iso}|${time}`) % 10;
    const booked = seeded < 3;
    slots.push({
      time,
      label: time,
      available: !booked && t >= earliest,
    });
  }
  return slots;
}

export const formatLongDate = (iso: string) =>
  fromISODate(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const makeReference = () => {
  const now = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.floor(Math.random() * 36 ** 3)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `${bookingSettings.referencePrefix}-${now}${rand}`;
};
