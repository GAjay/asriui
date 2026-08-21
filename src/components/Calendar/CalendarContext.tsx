import { createContext, useContext } from "react";
import type { CalendarContextValue } from "./Calendar.types";

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendarContext(component: string): CalendarContextValue {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(`${component} must be used within Calendar`);
  }
  return context;
}
