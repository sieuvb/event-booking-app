"use client";

import React from "react";
import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

import { DATA_DATE_FORMAT } from "@/common/constants";
import { checkSameDate, checkSameMonth, count } from "@/common/utils";
import Filter from "./Filter";
import CountBadge from "../CountBadge";

const { RangePicker } = DatePicker;

const MONTH_FORMAT = "YYYY-MM";
// don't allow the user to select any dates before today
const disableBeforeToday = (date: Dayjs) => date.isBefore(dayjs().startOf("date"));

interface DateFilterProps {
  placeholder: string;
  availableDates?: string[];
  value?: [Dayjs, Dayjs];
  onChange: ([from, to]: [Dayjs, Dayjs]) => void;
}

const DateFilter: React.FC<React.PropsWithChildren<DateFilterProps>> = (props) => {
  const { availableDates, placeholder, value, onChange } = props;

  const filterText = React.useMemo(() => {
    if (!value) {
      return placeholder;
    }
    const [from, to] = value;
    const displayVal = `From ${from?.format(DATA_DATE_FORMAT)} to ${to?.format(DATA_DATE_FORMAT)}`;
    return displayVal;
  }, [value, placeholder]);

  const getCellRender = React.useCallback<NonNullable<DatePickerProps<Dayjs>["cellRender"]>>(
    (current, info) => {
      const { type } = info;
      if (current instanceof dayjs && availableDates) {
        const currDate = current.format(DATA_DATE_FORMAT);
        const currMonth = current.format(MONTH_FORMAT);
        const currDateEventsNum = count(checkSameDate(currDate), availableDates);
        const currMonthEventsNum = count(checkSameMonth(currMonth, MONTH_FORMAT), availableDates);
        if (type === "date" && currDateEventsNum > 0) {
          return (
            <CountBadge tooltip={`${currDateEventsNum} available event(s)`} count={currDateEventsNum}>
              {info.originNode}
            </CountBadge>
          );
        }
        if (type === "month" && currMonthEventsNum > 0) {
          return (
            <CountBadge tooltip={`${currMonthEventsNum} available event(s)`} count={currMonthEventsNum}>
              {info.originNode}
            </CountBadge>
          );
        }
      }
      return info.originNode;
    },
    [availableDates]
  );

  const onSelectDate = React.useCallback<NonNullable<RangePickerProps["onChange"]>>(
    (dates) => {
      if (dates) {
        const [from, to] = dates;
        if (from && to) {
          const values: [Dayjs, Dayjs] = [from, to];
          onChange(values);
        }
      }
    },
    [onChange]
  );

  return (
    <Filter
      hasValue={!!value}
      destroyPopupOnHide
      component={
        <RangePicker
          open
          allowClear
          className="opacity-0 w-0 h-0 -translate-y-7" // hide the date picker input
          disabledDate={disableBeforeToday}
          cellRender={getCellRender}
          value={value}
          onChange={onSelectDate}
        />
      }
    >
      {filterText}
    </Filter>
  );
};

export type { DateFilterProps };
export default DateFilter;
