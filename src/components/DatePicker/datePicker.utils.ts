import type { DatePickerFormat, DatePickerPrecision, DatePickerRangeValue } from "./DatePicker.types";

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMinute(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
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

export function isBeforeDay(left: Date, right: Date) {
  return startOfDay(left).getTime() < startOfDay(right).getTime();
}

export function isAfterDay(left: Date, right: Date) {
  return startOfDay(left).getTime() > startOfDay(right).getTime();
}

export function isBetweenDaysInclusive(date: Date, from: Date, to: Date) {
  const value = startOfDay(date).getTime();
  const start = startOfDay(from).getTime();
  const end = startOfDay(to).getTime();
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  return value >= min && value <= max;
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthMatrix(month: Date, weekStartsOn: 0 | 1) {
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

export function getWeekdayLabels(locale: string, weekStartsOn: 0 | 1) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const baseSunday = new Date(2024, 0, 7);
  const labels: string[] = [];

  for (let index = 0; index < 7; index += 1) {
    const day = new Date(baseSunday);
    day.setDate(baseSunday.getDate() + ((weekStartsOn + index) % 7));
    labels.push(formatter.format(day));
  }

  return labels;
}

export function getFormatPlaceholder(format: DatePickerFormat, precision: DatePickerPrecision) {
  if (format === "iso") {
    return precision === "datetime" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
  }
  if (format === "eu") {
    return precision === "datetime" ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy";
  }
  return precision === "datetime" ? "MM/dd/yyyy h:mm a" : "MM/dd/yyyy";
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function format12Hour(date: Date) {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = pad(date.getMinutes());
  const meridiem = hours24 >= 12 ? "PM" : "AM";
  return `${hours12}:${minutes} ${meridiem}`;
}

export function formatDateValue(
  date: Date,
  format: DatePickerFormat,
  precision: DatePickerPrecision,
): string {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  if (format === "iso") {
    const base = `${year}-${month}-${day}`;
    return precision === "datetime" ? `${base} ${hours}:${minutes}` : base;
  }

  if (format === "eu") {
    const base = `${day}/${month}/${year}`;
    return precision === "datetime" ? `${base} ${hours}:${minutes}` : base;
  }

  const base = `${month}/${day}/${year}`;
  return precision === "datetime" ? `${base} ${format12Hour(date)}` : base;
}

export function formatRangeValue(
  range: DatePickerRangeValue,
  format: DatePickerFormat,
  precision: DatePickerPrecision,
) {
  if (!range.from && !range.to) return "";
  const fromText = range.from ? formatDateValue(range.from, format, precision) : "";
  const toText = range.to ? formatDateValue(range.to, format, precision) : "";
  if (fromText && toText) return `${fromText} - ${toText}`;
  return fromText || toText;
}

function parseMeridiemTime(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]!.toUpperCase();
  if (hours < 1 || hours > 12 || minutes > 59) return null;
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
}

function parse24HourTime(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

function buildDate(
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
) {
  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function parseDateInput(
  input: string,
  format: DatePickerFormat,
  precision: DatePickerPrecision,
): Date | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (format === "iso") {
    const match =
      precision === "datetime"
        ? trimmed.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})$/)
        : trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const hours = precision === "datetime" ? Number(match[4]) : 0;
    const minutes = precision === "datetime" ? Number(match[5]) : 0;
    return buildDate(Number(match[1]), Number(match[2]), Number(match[3]), hours, minutes);
  }

  if (format === "eu") {
    const match =
      precision === "datetime"
        ? trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/)
        : trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return null;
    const hours = precision === "datetime" ? Number(match[4]) : 0;
    const minutes = precision === "datetime" ? Number(match[5]) : 0;
    return buildDate(Number(match[3]), Number(match[2]), Number(match[1]), hours, minutes);
  }

  const match =
    precision === "datetime"
      ? trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(.+)$/)
      : trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;

  let hours = 0;
  let minutes = 0;
  if (precision === "datetime") {
    const time = parseMeridiemTime(match[4]!);
    if (!time) return null;
    hours = time.hours;
    minutes = time.minutes;
  }

  return buildDate(Number(match[3]), Number(match[1]), Number(match[2]), hours, minutes);
}

export function parseRangeInput(
  input: string,
  format: DatePickerFormat,
  precision: DatePickerPrecision,
): DatePickerRangeValue | null {
  const trimmed = input.trim();
  if (!trimmed) return { from: null, to: null };

  const parts = trimmed.split(/\s+-\s+/);
  if (parts.length !== 2) return null;

  const from = parseDateInput(parts[0]!, format, precision);
  const to = parseDateInput(parts[1]!, format, precision);
  if (!from || !to) return null;

  return from.getTime() <= to.getTime() ? { from, to } : { from: to, to: from };
}

export function isDateDisabled(
  date: Date,
  {
    disablePast,
    minDate,
    maxDate,
    isDateDisabled: customDisabled,
  }: {
    disablePast?: boolean;
    minDate?: Date;
    maxDate?: Date;
    isDateDisabled?: (date: Date) => boolean;
  },
) {
  const today = startOfDay(new Date());
  const effectiveMin = disablePast
    ? minDate
      ? new Date(Math.max(startOfDay(minDate).getTime(), today.getTime()))
      : today
    : minDate
      ? startOfDay(minDate)
      : undefined;

  if (effectiveMin && isBeforeDay(date, effectiveMin)) return true;
  if (maxDate && isAfterDay(date, maxDate)) return true;
  if (customDisabled?.(date)) return true;
  return false;
}

export function parseTimeInput(value: string, use12Hour: boolean) {
  if (use12Hour) return parseMeridiemTime(value);
  return parse24HourTime(value);
}

export function setTimeOnDate(date: Date, hours: number, minutes: number) {
  const next = new Date(date);
  next.setHours(hours, minutes, 0, 0);
  return next;
}

export function normalizeRange(range: DatePickerRangeValue): DatePickerRangeValue {
  if (!range.from || !range.to) return range;
  if (range.from.getTime() <= range.to.getTime()) return range;
  return { from: range.to, to: range.from };
}
