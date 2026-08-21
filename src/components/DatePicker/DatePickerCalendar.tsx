import { useMemo } from "react";
import { cn } from "../../utils/cn";
import {
  formatMonthLabel,
  getMonthMatrix,
  getWeekdayLabels,
  isBetweenDaysInclusive,
  isDateDisabled,
  isSameDay,
  isSameMonth,
} from "./datePicker.utils";
import type { DatePickerRangeValue, DatePickerWeekStartsOn } from "./DatePicker.types";
import styles from "./DatePicker.module.css";

type Props = {
  month: Date;
  locale: string;
  weekStartsOn: DatePickerWeekStartsOn;
  mode: "single" | "range";
  selectedDate: Date | null;
  rangeValue: DatePickerRangeValue;
  hoverDate: Date | null;
  disablePast?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  onMonthChange: (month: Date) => void;
  onSelectDate: (date: Date) => void;
  onHoverDate: (date: Date | null) => void;
  className?: string;
};

export function DatePickerCalendar({
  month,
  locale,
  weekStartsOn,
  mode,
  selectedDate,
  rangeValue,
  hoverDate,
  disablePast,
  minDate,
  maxDate,
  isDateDisabled: customDisabled,
  onMonthChange,
  onSelectDate,
  onHoverDate,
  className,
}: Props) {
  const weekdays = useMemo(() => getWeekdayLabels(locale, weekStartsOn), [locale, weekStartsOn]);
  const days = useMemo(() => getMonthMatrix(month, weekStartsOn), [month, weekStartsOn]);

  const previewRange = useMemo(() => {
    if (mode !== "range" || !rangeValue.from || hoverDate) {
      if (mode === "range" && rangeValue.from && hoverDate) {
        return { from: rangeValue.from, to: hoverDate };
      }
      return rangeValue;
    }
    return rangeValue;
  }, [hoverDate, mode, rangeValue]);

  return (
    <div className={cn(styles.calendar, className)}>
      <div className={styles.calendarHeader}>
        <button
          type="button"
          className={styles.navButton}
          aria-label="Previous month"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
        >
          ‹
        </button>
        <span className={styles.monthLabel}>{formatMonthLabel(month, locale)}</span>
        <button
          type="button"
          className={styles.navButton}
          aria-label="Next month"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>

      <div className={styles.weekdays}>
        {weekdays.map((label) => (
          <span key={label} className={styles.weekday}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((day) => {
          const disabled = isDateDisabled(day, {
            disablePast,
            minDate,
            maxDate,
            isDateDisabled: customDisabled,
          });
          const selected =
            mode === "single" ? Boolean(selectedDate && isSameDay(day, selectedDate)) : false;
          const inRange =
            mode === "range" &&
            previewRange.from &&
            previewRange.to &&
            isBetweenDaysInclusive(day, previewRange.from, previewRange.to);
          const rangeStart =
            mode === "range" && previewRange.from && isSameDay(day, previewRange.from);
          const rangeEnd = mode === "range" && previewRange.to && isSameDay(day, previewRange.to);

          return (
            <button
              key={day.toISOString()}
              type="button"
              className={cn(
                styles.day,
                !isSameMonth(day, month) && styles.dayOutside,
                selected && styles.daySelected,
                inRange && styles.dayInRange,
                rangeStart && styles.dayRangeStart,
                rangeEnd && styles.dayRangeEnd,
                disabled && styles.dayDisabled,
              )}
              disabled={disabled}
              onMouseEnter={() => onHoverDate(day)}
              onMouseLeave={() => onHoverDate(null)}
              onClick={() => onSelectDate(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
