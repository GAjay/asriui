import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** Time slot available for booking on a given day. */
export type CalendarTimeSlot = {
  /** Unique slot id within a day. */
  id: string;
  /** Display label, e.g. "09:00 AM". */
  label: string;
  /** Optional start time (HH:mm or ISO). */
  start?: string;
  /** Optional end time (HH:mm or ISO). */
  end?: string;
  /** Mark slot unavailable without booking it. */
  disabled?: boolean;
};

/** A selected booking = date + slot id. */
export type CalendarSlotSelection = {
  /** Date key in YYYY-MM-DD format. */
  date: string;
  slotId: string;
};

export type CalendarWeekStartsOn = 0 | 1;

export type CalendarProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  /** Controlled selected slots. */
  value?: CalendarSlotSelection[];
  /** Initial selected slots. */
  defaultValue?: CalendarSlotSelection[];
  /** Called when selection changes. */
  onValueChange?: (selection: CalendarSlotSelection[]) => void;
  /** Controlled visible month. */
  month?: Date;
  /** Initial month. @default today */
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** Active/focused day for the slot panel (YYYY-MM-DD). */
  activeDate?: string;
  defaultActiveDate?: string;
  onActiveDateChange?: (date: string | null) => void;
  /** Default slots shown for every day unless overridden in `daySlots`. */
  slots?: CalendarTimeSlot[];
  /** Per-day slot overrides keyed by YYYY-MM-DD. */
  daySlots?: Record<string, CalendarTimeSlot[]>;
  /** Slots already booked by others — rendered unavailable. */
  booked?: CalendarSlotSelection[];
  /** Fully disabled dates (YYYY-MM-DD). */
  disabledDates?: string[];
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
  /** Maximum number of slots the user can select. */
  maxSelections?: number;
  /** BCP 47 locale for month/weekday labels. @default "en-US" */
  locale?: string;
  /** First day of the week. 0 = Sunday, 1 = Monday. @default 0 */
  weekStartsOn?: CalendarWeekStartsOn;
  /** Show slot picker panel when a day is active. @default true */
  showSlotPanel?: boolean;
  /** Optional summary renderer below the calendar. */
  renderSelectionSummary?: (selection: CalendarSlotSelection[]) => ReactNode;
  className?: string;
  style?: CSSProperties;
};

export type CalendarContextValue = {
  locale: string;
  weekStartsOn: CalendarWeekStartsOn;
  month: Date;
  activeDate: string | null;
  setActiveDate: (date: string | null) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  selection: CalendarSlotSelection[];
  toggleSlot: (date: string, slotId: string) => void;
  isSlotSelected: (date: string, slotId: string) => boolean;
  isSlotBooked: (date: string, slotId: string) => boolean;
  isDateDisabled: (date: Date) => boolean;
  getSlotsForDate: (dateKey: string) => CalendarTimeSlot[];
  getSelectionCountForDate: (dateKey: string) => number;
  maxSelections?: number;
};
