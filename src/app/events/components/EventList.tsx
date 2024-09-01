"use client";

import React from "react";

import FilterHeader from "./FilterHeader";
import EventCard from "./EventCard";
import { useEventContext } from "../contexts/EventContext";

interface EventListProps {
  locations: string[];
}

const EventList: React.FC<EventListProps> = (props) => {
  const { locations } = props;
  const { events, avaiDates } = useEventContext();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 w-full bg-white py-6">
        <h1 className="text-3xl font-bold mb-0">Upcoming Events</h1>
        <FilterHeader locations={locations} avaiDates={avaiDates} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
