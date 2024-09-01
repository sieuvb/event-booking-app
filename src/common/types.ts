import { Event } from "@/services/EventService";

export interface Booking {
  bookingId: string;
  eventId: string;
  type: string;
  fullName: string;
  event: Event;
}
