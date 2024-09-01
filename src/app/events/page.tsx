import { fetchUpcomingEvents, fetchLocations } from "@/services/EventService";
import EventList from "./components/EventList";
import { EventProvider } from "./contexts/EventContext";

const EventsPage = async () => {
  const events = await fetchUpcomingEvents();
  const locations = await fetchLocations();

  return (
    <EventProvider events={events}>
      <EventList locations={locations} />
    </EventProvider>
  );
};

export default EventsPage;
