import type { BookingDraft, BookingTransport, ConfirmedBooking } from "./types";
import { makeReference } from "./availability";

/**
 * Demo transport: resolves client-side after a short delay.
 *
 * To go live, implement the same `BookingTransport` interface against a server
 * function / booking API / calendar and pass it to `BookingProvider`.
 */
export const localTransport: BookingTransport = {
  async submit(draft: BookingDraft): Promise<ConfirmedBooking> {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {
      ...draft,
      reference: makeReference(),
      createdAt: new Date().toISOString(),
    };
  },
};
