import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useAxiomId } from "../../hooks/useAxiomId";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { DatePickerCalendar } from "./DatePickerCalendar";
import type { DatePickerProps, DatePickerRangeValue } from "./DatePicker.types";
import {
  formatDateValue,
  formatRangeValue,
  getFormatPlaceholder,
  normalizeRange,
  parseDateInput,
  parseRangeInput,
  parseTimeInput,
  setTimeOnDate,
  startOfDay,
} from "./datePicker.utils";
import styles from "./DatePicker.module.css";

const { SlotClassNamesProvider } = createSlotClassNames<
  "root" | "control" | "input" | "trigger" | "popover" | "calendar" | "day" | "time"
>();

const EMPTY_RANGE: DatePickerRangeValue = { from: null, to: null };

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M5.75 3a.75.75 0 00-.75.75V5H4a2 2 0 00-2 2v8.5A2.5 2.5 0 004.5 18h11a2.5 2.5 0 002.5-2.5V7a2 2 0 00-2-2h-1V3.75a.75.75 0 00-1.5 0V5H6.5V3.75A.75.75 0 005.75 3zM4 7.5h12V15.5a1 1 0 01-1 1h-10a1 1 0 01-1-1V7.5z" />
    </svg>
  );
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    mode = "single",
    precision = "date",
    value,
    defaultValue = null,
    onValueChange,
    rangeValue,
    defaultRangeValue = EMPTY_RANGE,
    onRangeValueChange,
    disablePast = false,
    minDate,
    maxDate,
    isDateDisabled,
    dateFormat = "us",
    allowTyping = true,
    label,
    placeholder,
    helperText,
    error,
    disabled = false,
    required = false,
    weekStartsOn = 0,
    locale = "en-US",
    className,
    classNames,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = useAxiomId(`datepicker-${reactId.replace(/:/g, "")}`);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [singleState, setSingleState] = useState<Date | null>(defaultValue);
  const [rangeState, setRangeState] = useState<DatePickerRangeValue>(defaultRangeValue);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [pendingRangeStart, setPendingRangeStart] = useState<Date | null>(null);
  const [month, setMonth] = useState(() => startOfDay(value ?? defaultValue ?? new Date()));
  const [timeValue, setTimeValue] = useState("09:00");
  const [rangeEndTimeValue, setRangeEndTimeValue] = useState("17:00");

  const selectedDate = value ?? singleState;
  const selectedRange = rangeValue ?? rangeState;
  const formatPlaceholder = placeholder ?? getFormatPlaceholder(dateFormat, precision);
  const use12Hour = dateFormat === "us" && precision === "datetime";

  const setSingleValue = useCallback(
    (next: Date | null) => {
      if (value === undefined) setSingleState(next);
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  const setRangeValueInternal = useCallback(
    (next: DatePickerRangeValue) => {
      const normalized = normalizeRange(next);
      if (rangeValue === undefined) setRangeState(normalized);
      onRangeValueChange?.(normalized);
    },
    [onRangeValueChange, rangeValue],
  );

  const syncInputFromValue = useCallback(() => {
    if (mode === "range") {
      setInputValue(formatRangeValue(selectedRange, dateFormat, precision));
      return;
    }
    setInputValue(selectedDate ? formatDateValue(selectedDate, dateFormat, precision) : "");
  }, [dateFormat, mode, precision, selectedDate, selectedRange]);

  useEffect(() => {
    syncInputFromValue();
  }, [syncInputFromValue]);

  useEffect(() => {
    if (mode === "single" && selectedDate) {
      setMonth(startOfDay(selectedDate));
      if (precision === "datetime") {
        setTimeValue(formatDateValue(selectedDate, dateFormat, "datetime").split(" ").slice(1).join(" "));
      }
    }
    if (mode === "range" && selectedRange.from) {
      setMonth(startOfDay(selectedRange.from));
    }
  }, [dateFormat, mode, precision, selectedDate, selectedRange.from]);

  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (fieldRef.current?.contains(target) || popoverRef.current?.contains(target)) return;
      setOpen(false);
      setPendingRangeStart(null);
      setHoverDate(null);
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const applyTime = useCallback(
    (date: Date, timeText: string) => {
      if (precision !== "datetime") return startOfDay(date);
      const parsed = parseTimeInput(timeText, use12Hour);
      if (!parsed) return date;
      return setTimeOnDate(date, parsed.hours, parsed.minutes);
    },
    [precision, use12Hour],
  );

  const handleSelectDate = useCallback(
    (date: Date) => {
      if (mode === "single") {
        const next = applyTime(date, timeValue);
        setSingleValue(next);
        setInputValue(formatDateValue(next, dateFormat, precision));
        setInputError(null);
        if (precision === "date") setOpen(false);
        return;
      }

      if (!pendingRangeStart) {
        const nextFrom = applyTime(date, timeValue);
        setPendingRangeStart(nextFrom);
        setRangeValueInternal({ from: nextFrom, to: null });
        setInputValue(formatRangeValue({ from: nextFrom, to: null }, dateFormat, precision));
        return;
      }

      const from = pendingRangeStart;
      const to = applyTime(date, rangeEndTimeValue);
      const normalized = normalizeRange({ from, to });
      setRangeValueInternal(normalized);
      setInputValue(formatRangeValue(normalized, dateFormat, precision));
      setPendingRangeStart(null);
      setHoverDate(null);
      setInputError(null);
      if (precision === "date") setOpen(false);
    },
    [
      applyTime,
      dateFormat,
      mode,
      pendingRangeStart,
      precision,
      rangeEndTimeValue,
      setRangeValueInternal,
      setSingleValue,
      timeValue,
    ],
  );

  const commitInput = useCallback(() => {
    if (!allowTyping) return;
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setInputError(null);
      if (mode === "single") setSingleValue(null);
      else setRangeValueInternal(EMPTY_RANGE);
      return;
    }

    if (mode === "range") {
      const parsed = parseRangeInput(trimmed, dateFormat, precision);
      if (!parsed?.from || !parsed.to) {
        setInputError(`Enter a valid range like ${formatPlaceholder}`);
        return;
      }
      setInputError(null);
      setRangeValueInternal(parsed);
      setPendingRangeStart(null);
      return;
    }

    const parsed = parseDateInput(trimmed, dateFormat, precision);
    if (!parsed) {
      setInputError(`Enter a valid date like ${formatPlaceholder}`);
      return;
    }
    setInputError(null);
    setSingleValue(parsed);
  }, [
    allowTyping,
    dateFormat,
    formatPlaceholder,
    inputValue,
    mode,
    precision,
    setRangeValueInternal,
    setSingleValue,
  ]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (inputError) setInputError(null);
  };

  const handleTimeChange = (nextTime: string, target: "start" | "end" = "start") => {
    if (target === "end") {
      setRangeEndTimeValue(nextTime);
      if (selectedRange.to) {
        const next = applyTime(selectedRange.to, nextTime);
        setRangeValueInternal({ ...selectedRange, to: next });
        setInputValue(formatRangeValue({ ...selectedRange, to: next }, dateFormat, precision));
      }
      return;
    }

    setTimeValue(nextTime);
    if (mode === "single" && selectedDate) {
      const next = applyTime(selectedDate, nextTime);
      setSingleValue(next);
      setInputValue(formatDateValue(next, dateFormat, precision));
      return;
    }

    if (mode === "range" && selectedRange.from) {
      const next = applyTime(selectedRange.from, nextTime);
      setRangeValueInternal({ ...selectedRange, from: next });
      setInputValue(formatRangeValue({ ...selectedRange, from: next }, dateFormat, precision));
    }
  };

  const displayError = error ?? inputError;

  const timePlaceholder = useMemo(
    () => (use12Hour ? "09:00 AM" : "09:00"),
    [use12Hour],
  );

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <div ref={ref} className={cn(styles.root, classNames?.root, className)} {...rest}>
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {required ? (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
        ) : null}

        <div ref={fieldRef} className={styles.field}>
          <div
            className={cn(
              styles.control,
              classNames?.control,
              displayError ? styles.controlError : undefined,
              disabled && styles.controlDisabled,
            )}
          >
            <input
              id={inputId}
              className={cn(styles.input, classNames?.input)}
              value={inputValue}
              placeholder={formatPlaceholder}
              disabled={disabled || !allowTyping}
              readOnly={!allowTyping}
              aria-invalid={displayError ? true : undefined}
              aria-required={required || undefined}
              onChange={handleInputChange}
              onBlur={commitInput}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitInput();
                }
              }}
            />
            <button
              type="button"
              className={cn(styles.trigger, classNames?.trigger)}
              aria-label="Open calendar"
              disabled={disabled}
              onClick={() => setOpen((current) => !current)}
            >
              <CalendarIcon />
            </button>
          </div>

          {open ? (
            <div ref={popoverRef} className={cn(styles.popover, classNames?.popover)}>
              <DatePickerCalendar
                className={classNames?.calendar}
                month={month}
                locale={locale}
                weekStartsOn={weekStartsOn}
                mode={mode}
                selectedDate={selectedDate}
                rangeValue={selectedRange}
                hoverDate={hoverDate}
                disablePast={disablePast}
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                onMonthChange={setMonth}
                onSelectDate={handleSelectDate}
                onHoverDate={setHoverDate}
              />

              {precision === "datetime" ? (
                <div className={cn(styles.timeRow, classNames?.time)}>
                  <div className={styles.timeField}>
                    <span className={styles.timeLabel}>{mode === "range" ? "Start time" : "Time"}</span>
                    <input
                      className={styles.timeInput}
                      value={timeValue}
                      placeholder={timePlaceholder}
                      onChange={(event) => handleTimeChange(event.target.value, "start")}
                      onBlur={() => handleTimeChange(timeValue, "start")}
                    />
                  </div>
                  {mode === "range" ? (
                    <div className={styles.timeField}>
                      <span className={styles.timeLabel}>End time</span>
                      <input
                        className={styles.timeInput}
                        value={rangeEndTimeValue}
                        placeholder={timePlaceholder}
                        onChange={(event) => handleTimeChange(event.target.value, "end")}
                        onBlur={() => handleTimeChange(rangeEndTimeValue, "end")}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {mode === "range" ? (
                <p className={styles.hint}>
                  {pendingRangeStart ? "Select an end date" : "Select a start date, then an end date"}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {displayError ? (
          <p className={cn(styles.message, styles.error)} role="alert">
            {displayError}
          </p>
        ) : helperText ? (
          <p className={styles.message}>{helperText}</p>
        ) : null}
      </div>
    </SlotClassNamesProvider>
  );
});

DatePicker.displayName = "DatePicker";
