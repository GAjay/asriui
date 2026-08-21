import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useCalendarContext } from "./CalendarContext";
import { fromDateKey } from "./Calendar.utils";
import styles from "./Calendar.module.css";

export const CalendarSlotPanel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CalendarSlotPanel({ className, ...rest }, ref) {
    const {
      activeDate,
      locale,
      getSlotsForDate,
      toggleSlot,
      isSlotSelected,
      isSlotBooked,
      maxSelections,
      selection,
    } = useCalendarContext("Calendar.SlotPanel");

    if (!activeDate) {
      return (
        <div ref={ref} className={cn(styles.slotPanel, className)} {...rest}>
          <p className={styles.slotPanelHint}>Select a day to choose booking slots.</p>
        </div>
      );
    }

    const slots = getSlotsForDate(activeDate);
    const dayLabel = fromDateKey(activeDate).toLocaleDateString(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return (
      <div ref={ref} className={cn(styles.slotPanel, className)} {...rest}>
        <div>
          <h3 className={styles.slotPanelTitle}>{dayLabel}</h3>
          <p className={styles.slotPanelHint}>
            Select multiple time slots{maxSelections ? ` (max ${maxSelections} total)` : ""}.{" "}
            {selection.length > 0 ? `${selection.length} selected.` : ""}
          </p>
        </div>
        <div className={styles.slotGrid} role="group" aria-label={`Time slots for ${dayLabel}`}>
          {slots.length === 0 ? (
            <p className={styles.slotPanelHint}>No slots available for this day.</p>
          ) : (
            slots.map((slot) => {
              const selected = isSlotSelected(activeDate, slot.id);
              const booked = isSlotBooked(activeDate, slot.id);
              const unavailable = booked || slot.disabled;

              return (
                <button
                  key={slot.id}
                  type="button"
                  className={cn(
                    styles.slotButton,
                    selected && styles.slotSelected,
                    booked && styles.slotBooked,
                    slot.disabled && styles.slotDisabled,
                  )}
                  aria-pressed={selected}
                  disabled={unavailable}
                  onClick={() => toggleSlot(activeDate, slot.id)}
                >
                  <span>{slot.label}</span>
                  {slot.start && slot.end ? (
                    <span className={styles.slotMeta}>
                      {slot.start} – {slot.end}
                    </span>
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  },
);

CalendarSlotPanel.displayName = "Calendar.SlotPanel";
