import type { HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type DatePickerMode = "single" | "range";
export type DatePickerPrecision = "date" | "datetime";
export type DatePickerFormat = "iso" | "us" | "eu";
export type DatePickerWeekStartsOn = 0 | 1;

export type DatePickerRangeValue = {
  from: Date | null;
  to: Date | null;
};

export type DatePickerClassNames = SlotClassNames<
  "root" | "control" | "input" | "trigger" | "popover" | "calendar" | "day" | "time"
>;

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** Single date or date range selection. @default "single" */
  mode?: DatePickerMode;
  /** Date-only or date + time. @default "date" */
  precision?: DatePickerPrecision;
  /** Controlled single value. */
  value?: Date | null;
  /** Initial single value. */
  defaultValue?: Date | null;
  /** Called when the single value changes. */
  onValueChange?: (value: Date | null) => void;
  /** Controlled range value. */
  rangeValue?: DatePickerRangeValue;
  /** Initial range value. */
  defaultRangeValue?: DatePickerRangeValue;
  /** Called when the range value changes. */
  onRangeValueChange?: (value: DatePickerRangeValue) => void;
  /** Block selecting dates before today. */
  disablePast?: boolean;
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
  /** Custom disabled-date predicate. */
  isDateDisabled?: (date: Date) => boolean;
  /** Input display format. @default "us" */
  dateFormat?: DatePickerFormat;
  /** Allow typing dates directly into the input. @default true */
  allowTyping?: boolean;
  /** Visible label above the field. */
  label?: ReactNode;
  /** Placeholder when empty — defaults to the active format pattern. */
  placeholder?: string;
  /** Assistive text below the field. */
  helperText?: ReactNode;
  /** Validation error message. */
  error?: ReactNode;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Marks the field as required. */
  required?: boolean;
  /** First day of the week. @default 0 */
  weekStartsOn?: DatePickerWeekStartsOn;
  /** Locale for month and weekday labels. @default "en-US" */
  locale?: string;
  /** Per-slot class overrides. */
  classNames?: DatePickerClassNames;
}
