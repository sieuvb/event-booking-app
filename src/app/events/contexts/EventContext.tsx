"use client";

import React from "react";
import { Dayjs } from "dayjs";

import { Event, fetchAvailableDates, fetchUpcomingEvents } from "@/services/EventService";
import { notImplemented } from "@/common/utils";
import { DATA_DATE_FORMAT } from "@/common/constants";

interface EventContextParams {
  events: Event[];
}

interface EventContextProps {
  events: Event[];
  avaiDates: string[];
  hasFilters: boolean;
  selectedLocation?: string;
  selectedDateRange?: [Dayjs, Dayjs];
  onLocationChange: (location: string) => void;
  onDateRangeChange: (dateRange: [Dayjs, Dayjs]) => void;
  clearAllFilter: () => void;
}

const initialValues = {
  events: [],
  avaiDates: [],
  hasFilters: false,
  onLocationChange: notImplemented,
  onDateRangeChange: notImplemented,
  clearAllFilter: notImplemented,
};

const EventContext = React.createContext<EventContextProps>(initialValues);
const useEventContext = () => React.useContext(EventContext);

const normalizeFetchEventsParams = ({ location, from, to }: { location?: string; from?: Dayjs; to?: Dayjs }) => ({
  location,
  from: from?.format(DATA_DATE_FORMAT),
  to: to?.format(DATA_DATE_FORMAT),
});

const EventProvider = (props: React.PropsWithChildren<EventContextParams>) => {
  const { events: initialEvents, children } = props;
  const [events, setEvents] = React.useState(initialEvents);
  const [avaiDates, setAvaiDates] = React.useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<string>();
  const [selectedDateRange, setSelectedDateRange] = React.useState<[Dayjs, Dayjs]>();

  const hasFilters = React.useMemo(
    () => !!(selectedLocation || selectedDateRange),
    [selectedLocation, selectedDateRange]
  );

  React.useEffect(() => {
    fetchAvailableDates().then(setAvaiDates);
  }, []);

  const onLocationChange = React.useCallback(
    (location: string) => {
      setSelectedLocation(location);
      const [from, to] = selectedDateRange || [];
      const params = normalizeFetchEventsParams({ location, from, to });
      fetchUpcomingEvents(params).then(setEvents);
      fetchAvailableDates({ location }).then(setAvaiDates);
    },
    [selectedDateRange]
  );

  const onDateRangeChange = React.useCallback(
    (dateRange: [Dayjs, Dayjs]) => {
      setSelectedDateRange(dateRange);
      const [from, to] = dateRange;
      const params = normalizeFetchEventsParams({ location: selectedLocation, from, to });
      fetchUpcomingEvents(params).then(setEvents);
    },
    [selectedLocation]
  );

  const clearAllFilter = React.useCallback(() => {
    setSelectedLocation(undefined);
    setSelectedDateRange(undefined);
    fetchUpcomingEvents().then(setEvents);
    fetchAvailableDates().then(setAvaiDates);
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        avaiDates,
        hasFilters,
        onLocationChange,
        onDateRangeChange,
        selectedLocation,
        selectedDateRange,
        clearAllFilter,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { EventProvider, useEventContext };
