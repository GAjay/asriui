import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useCalendarContext } from "./CalendarContext";
import { getMonthMatrix, getWeekdayLabels, isSameMonth, toDateKey, formatMonthLabel } from "./Calendar.utils";
import styles from "./Calendar.module.css";

export const CalendarGrid = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CalendarGrid({ className, ...rest }, ref) {
    const {
      month,
      locale,
      weekStartsOn,
      activeDate,
      setActiveDate,
      isDateDisabled,
      getSelectionCountForDate,
    } = useCalendarContext("Calendar.Grid");

    const weekdays = getWeekdayLabels(locale, weekStartsOn);
    const days = getMonthMatrix(month, weekStartsOn);
    const todayKey = toDateKey(new Date());

    return (
      <div ref={ref} className={cn(styles.gridWrap, className)} {...rest}>
        <div className={styles.weekdays} aria-hidden="true">
          {weekdays.map((label) => (
            <div key={label} className={styles.weekday}>
              {label}
            </div>
          ))}
        </div>
        <div className={styles.grid} role="grid" aria-label={formatMonthLabel(month, locale)}>
          {days.map((day) => {
            const dateKey = toDateKey(day);
            const outside = !isSameMonth(day, month);
            const disabled = isDateDisabled(day);
            const isToday = dateKey === todayKey;
            const isActive = activeDate === dateKey;
            const count = getSelectionCountForDate(dateKey);

            return (
              <button
                key={dateKey}
                type="button"
                role="gridcell"
                className={cn(
                  styles.dayButton,
                  outside && styles.dayOutside,
                  isToday && styles.dayToday,
                  isActive && styles.dayActive,
                  disabled && styles.dayDisabled,
                )}
                aria-label={`${day.toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric" })}${count ? `, ${count} slots selected` : ""}`}
                aria-selected={isActive}
                disabled={disabled}
                onClick={() => setActiveDate(dateKey)}
              >
                <span>{day.getDate()}</span>
                {count > 0 ? <span className={styles.dayCount}>{count}</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

CalendarGrid.displayName = "Calendar.Grid";
