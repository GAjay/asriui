import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ForwardedRef,
} from "react";
import { cn } from "../../utils/cn";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarContext } from "./CalendarContext";
import { CalendarSlotPanel } from "./CalendarSlotPanel";
import type { CalendarContextValue, CalendarProps, CalendarSlotSelection } from "./Calendar.types";
import {
  DEFAULT_TIME_SLOTS,
  addMonths,
  getSlotsForDay,
  normalizeSelection,
  selectionKey,
  toDateKey,
  toggleSelection,
} from "./Calendar.utils";
import styles from "./Calendar.module.css";

function CalendarRoot(
  {
    value,
    defaultValue = [],
    onValueChange,
    month,
    defaultMonth = new Date(),
    onMonthChange,
    activeDate,
    defaultActiveDate,
    onActiveDateChange,
    slots = DEFAULT_TIME_SLOTS,
    daySlots,
    booked = [],
    disabledDates = [],
    minDate,
    maxDate,
    maxSelections,
    locale = "en-US",
    weekStartsOn = 0,
    showSlotPanel = true,
    renderSelectionSummary,
    className,
    children,
    ...rest
  }: CalendarProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [monthState, setMonthState] = useState(startOfMonth(defaultMonth));
  const [selectionState, setSelectionState] = useState<CalendarSlotSelection[]>(defaultValue);
  const [activeDateState, setActiveDateState] = useState<string | null>(defaultActiveDate ?? null);

  const visibleMonth = month ?? monthState;
  const selection = value ?? selectionState;
  const focusedDate = activeDate ?? activeDateState;

  const bookedSet = useMemo(
    () => new Set(booked.map((entry) => selectionKey(entry.date, entry.slotId))),
    [booked],
  );

  const disabledDateSet = useMemo(() => new Set(disabledDates), [disabledDates]);

  const setSelection = useCallback(
    (next: CalendarSlotSelection[]) => {
      const normalized = normalizeSelection(next);
      if (value === undefined) setSelectionState(normalized);
      onValueChange?.(normalized);
    },
    [onValueChange, value],
  );

  const setMonthVisible = useCallback(
    (next: Date) => {
      const normalized = startOfMonth(next);
      if (month === undefined) setMonthState(normalized);
      onMonthChange?.(normalized);
    },
    [month, onMonthChange],
  );

  const setActiveDate = useCallback(
    (next: string | null) => {
      if (activeDate === undefined) setActiveDateState(next);
      onActiveDateChange?.(next);
    },
    [activeDate, onActiveDateChange],
  );

  const isDateDisabled = useCallback(
    (date: Date) => {
      const key = toDateKey(date);
      if (disabledDateSet.has(key)) return true;
      if (minDate && date < stripTime(minDate)) return true;
      if (maxDate && date > stripTime(maxDate)) return true;
      return false;
    },
    [disabledDateSet, maxDate, minDate],
  );

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      locale,
      weekStartsOn,
      month: visibleMonth,
      activeDate: focusedDate,
      setActiveDate,
      goToPreviousMonth: () => setMonthVisible(addMonths(visibleMonth, -1)),
      goToNextMonth: () => setMonthVisible(addMonths(visibleMonth, 1)),
      selection,
      toggleSlot: (date, slotId) => {
        if (bookedSet.has(selectionKey(date, slotId))) return;
        const slot = getSlotsForDay(date, slots, daySlots).find((entry) => entry.id === slotId);
        if (!slot || slot.disabled) return;
        setSelection(toggleSelection(selection, date, slotId, maxSelections));
      },
      isSlotSelected: (date, slotId) =>
        selection.some((entry) => entry.date === date && entry.slotId === slotId),
      isSlotBooked: (date, slotId) => bookedSet.has(selectionKey(date, slotId)),
      isDateDisabled,
      getSlotsForDate: (dateKey) => getSlotsForDay(dateKey, slots, daySlots),
      getSelectionCountForDate: (dateKey) =>
        selection.filter((entry) => entry.date === dateKey).length,
      maxSelections,
    }),
    [
      bookedSet,
      daySlots,
      focusedDate,
      isDateDisabled,
      locale,
      maxSelections,
      selection,
      setActiveDate,
      setMonthVisible,
      setSelection,
      slots,
      visibleMonth,
      weekStartsOn,
    ],
  );

  const defaultSummary = selection.length > 0 && (
    <div className={styles.summary}>
      <p className={styles.summaryTitle}>Your bookings ({selection.length})</p>
      <ul className={styles.summaryList}>
        {selection.map((entry) => {
          const slot = getSlotsForDay(entry.date, slots, daySlots).find((item) => item.id === entry.slotId);
          return (
            <li key={selectionKey(entry.date, entry.slotId)}>
              {entry.date} · {slot?.label ?? entry.slotId}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {children ?? (
          <>
            <div className={cn(styles.shell, showSlotPanel && styles.shellWithPanel)}>
              <div>
                <CalendarHeader />
                <CalendarGrid />
              </div>
              {showSlotPanel ? <CalendarSlotPanel /> : null}
            </div>
            {renderSelectionSummary
              ? renderSelectionSummary(selection)
              : defaultSummary}
          </>
        )}
      </div>
    </CalendarContext.Provider>
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const CalendarBase = forwardRef(CalendarRoot);

export const Calendar = Object.assign(CalendarBase, {
  Header: CalendarHeader,
  Grid: CalendarGrid,
  SlotPanel: CalendarSlotPanel,
});

Calendar.displayName = "Calendar";
