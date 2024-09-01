"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "antd";

import DateFilter from "@/components/filters/DateFilter";
import ValueFilter from "@/components/filters/ValueFilter";
import { useEventContext } from "../contexts/EventContext";

interface FilterHeaderProps {
  locations: string[];
  avaiDates: string[];
}

const FilterHeader: React.FC<PropsWithChildren<FilterHeaderProps>> = (props) => {
  const { locations, avaiDates } = props;
  const { hasFilters, clearAllFilter, onLocationChange, onDateRangeChange, selectedDateRange, selectedLocation } =
    useEventContext();

  return (
    <div className="flex flex-col items-start md:flex-row gap-4 md:items-center">
      <ValueFilter placeholder="Location" options={locations} value={selectedLocation} onChange={onLocationChange} />
      <DateFilter
        placeholder="Availability"
        availableDates={avaiDates}
        value={selectedDateRange}
        onChange={onDateRangeChange}
      />
      {hasFilters && (
        <Button size="large" type="link" onClick={clearAllFilter}>
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterHeader;
