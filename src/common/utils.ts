import dayjs from "dayjs";
import { DATA_DATE_FORMAT } from "./constants";

export const count = (fn: Function, items: any[]) => items.reduce((acc, item) => acc + fn(item), 0);

export const checkSameDate = (currDate: string) => (date: string) => date === currDate;
export const checkSameMonth = (currMonth: string, format: string) => (date: string) => {
  const month = dayjs(date, DATA_DATE_FORMAT).format(format);
  return month === currMonth;
};

export const notImplemented = () => {
  throw new Error("Not implemented");
};

export const safelyParseJson = (json: string) => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));