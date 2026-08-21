import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useCalendarContext } from "./CalendarContext";
import { formatMonthLabel } from "./Calendar.utils";
import styles from "./Calendar.module.css";

export const CalendarHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CalendarHeader({ className, ...rest }, ref) {
    const { month, locale, goToPreviousMonth, goToNextMonth } = useCalendarContext("Calendar.Header");

    return (
      <div ref={ref} className={cn(styles.header, className)} {...rest}>
        <button
          type="button"
          className={styles.navButton}
          aria-label="Previous month"
          onClick={goToPreviousMonth}
        >
          ‹
        </button>
        <h2 className={styles.monthLabel}>{formatMonthLabel(month, locale)}</h2>
        <button type="button" className={styles.navButton} aria-label="Next month" onClick={goToNextMonth}>
          ›
        </button>
      </div>
    );
  },
);

CalendarHeader.displayName = "Calendar.Header";
