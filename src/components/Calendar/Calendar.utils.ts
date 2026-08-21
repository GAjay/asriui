import type { CalendarSlotSelection, CalendarTimeSlot, CalendarWeekStartsOn } from "./Calendar.types";

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year!, month! - 1, day);
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function getMonthMatrix(month: Date, weekStartsOn: CalendarWeekStartsOn) {
  const first = startOfMonth(month);
  const startOffset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

export function formatMonthLabel(month: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month);
}

export function getWeekdayLabels(locale: string, weekStartsOn: CalendarWeekStartsOn) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const baseSunday = new Date(2024, 0, 7); // known Sunday
  const labels: string[] = [];

  for (let index = 0; index < 7; index += 1) {
    const day = new Date(baseSunday);
    day.setDate(baseSunday.getDate() + ((weekStartsOn + index) % 7));
    labels.push(formatter.format(day));
  }

  return labels;
}

export function selectionKey(date: string, slotId: string) {
  return `${date}::${slotId}`;
}

export function normalizeSelection(selection: CalendarSlotSelection[]) {
  const map = new Map<string, CalendarSlotSelection>();
  for (const entry of selection) {
    map.set(selectionKey(entry.date, entry.slotId), entry);
  }
  return Array.from(map.values());
}

export function toggleSelection(
  selection: CalendarSlotSelection[],
  date: string,
  slotId: string,
  maxSelections?: number,
) {
  const key = selectionKey(date, slotId);
  const exists = selection.some((entry) => selectionKey(entry.date, entry.slotId) === key);

  if (exists) {
    return selection.filter((entry) => selectionKey(entry.date, entry.slotId) !== key);
  }

  if (maxSelections != null && selection.length >= maxSelections) {
    return selection;
  }

  return [...selection, { date, slotId }];
}

export function getSlotsForDay(
  dateKey: string,
  defaultSlots: CalendarTimeSlot[],
  daySlots?: Record<string, CalendarTimeSlot[]>,
) {
  return daySlots?.[dateKey] ?? defaultSlots;
}

export const DEFAULT_TIME_SLOTS: CalendarTimeSlot[] = [
  { id: "09:00", label: "09:00 AM", start: "09:00", end: "09:30" },
  { id: "09:30", label: "09:30 AM", start: "09:30", end: "10:00" },
  { id: "10:00", label: "10:00 AM", start: "10:00", end: "10:30" },
  { id: "10:30", label: "10:30 AM", start: "10:30", end: "11:00" },
  { id: "11:00", label: "11:00 AM", start: "11:00", end: "11:30" },
  { id: "13:00", label: "01:00 PM", start: "13:00", end: "13:30" },
  { id: "13:30", label: "01:30 PM", start: "13:30", end: "14:00" },
  { id: "14:00", label: "02:00 PM", start: "14:00", end: "14:30" },
  { id: "14:30", label: "02:30 PM", start: "14:30", end: "15:00" },
  { id: "15:00", label: "03:00 PM", start: "15:00", end: "15:30" },
];
