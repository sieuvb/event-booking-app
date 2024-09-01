import { STORAGE_KEY } from "@/common/constants";
import eventsData from "./events-data.json"; // the events is fetched from https://www.eventbrite.com/
import { safelyParseJson } from "@/common/utils";
import { Booking } from "@/common/types";

export type Event = (typeof eventsData)[number];
export type EventFilter = {
  location?: string;
  from?: string;
  to?: string;
};

const locationFilter = (location?: string) => (event: Event) =>
  location ? event.primary_venue.address.country === location : true;

const dateFilter = (from?: string, to?: string) => (event: Event) => {
  if (!from && !to) return true;

  const startDate = new Date(event.start_date).getTime();
  const fromTime = from ? new Date(from).getTime() : 0;
  const toTime = to ? new Date(to).getTime() : Infinity;

  return startDate >= fromTime && startDate <= toTime;
};

// query from mock data, can be replaced with a real API call
export const fetchUpcomingEvents = async (params: EventFilter = {}) => {
  const { location, from, to } = params;

  const events = await Promise.resolve(eventsData);
  return events.filter(locationFilter(location)).filter(dateFilter(from, to));
};

// query from mock data, can be replaced with a real API call
export const fetchLocations = async () => {
  const events = await Promise.resolve(eventsData);
  const locations = events.map((event) => event.primary_venue.address.country);
  return Array.from(new Set(locations));
};

// query from mock data, can be replaced with a real API call
export const fetchAvailableDates = async (params: { location?: string } = {}) => {
  const { location } = params;
  const events = await Promise.resolve(eventsData);
  const dates = events.filter(locationFilter(location)).map((event) => event.start_date);
  return dates;
};

// query from mock data, can be replaced with a real API call
export const fetchEventDetail = async (params: { id?: string } = {}) => {
  const events = await Promise.resolve(eventsData);
  const event = events.find(({ id }) => id === params.id);
  if (!event) {
    throw new Error("404: Event not found");
  }
  return event;
};

// store in local storage, can be replaced with a real API call to store in a database
export const submitBooking = async (bookingInfo: any) => {
  const normalizedBooking = {
    ...bookingInfo,
    bookingId: Math.random().toString(36).substring(2, 9),
  };
  const bookings = safelyParseJson(localStorage.getItem(STORAGE_KEY.MY_BOOKINGS) || "[]");
  localStorage.setItem(STORAGE_KEY.MY_BOOKINGS, JSON.stringify([...bookings, normalizedBooking]));
  return Promise.resolve(normalizedBooking);
};

// query from local storage, can be replaced with a real API call
export const fetchMyBookings = async () => {
  const events = await Promise.resolve(eventsData);
  const bookings = safelyParseJson(localStorage.getItem(STORAGE_KEY.MY_BOOKINGS) || "[]");
  const bookingsWithEventDetails: Booking[] = bookings.map((booking: any) => ({
    ...booking,
    event: events.find(({ id }) => id === booking.eventId),
  }));
  return Promise.resolve(bookingsWithEventDetails);
};

export const cancelMyBooking = async (bookingId: string) => {
  const bookings = safelyParseJson(localStorage.getItem(STORAGE_KEY.MY_BOOKINGS) || "[]");
  const updatedBookings = bookings.filter((booking: any) => booking.bookingId !== bookingId);
  localStorage.setItem(STORAGE_KEY.MY_BOOKINGS, JSON.stringify(updatedBookings));
  return Promise.resolve(true);
};