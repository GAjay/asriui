import type { HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type DropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export type DropdownSize = "sm" | "md";

export type DropdownOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type DropdownClassNames = SlotClassNames<
  "root" | "trigger" | "content" | "item" | "separator" | "label" | "group" | "search" | "list"
>;

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /**
   * Allow selecting more than one option. When true, `value` / `defaultValue` /
   * `onValueChange` use `string[]`.
   * @default false
   */
  multiple?: boolean;
  /** Controlled selected value (`string` for single, `string[]` for multiple). */
  value?: string | string[];
  /** Initial value for uncontrolled usage. */
  defaultValue?: string | string[];
  /** Called when the selected value changes. */
  onValueChange?: (value: string | string[]) => void;
  /** Shortcut option list — alternative to Dropdown.Item children. */
  options?: DropdownOption[];
  /** Shown when no value is selected. */
  placeholder?: string;
  /** Visible label above the trigger. */
  label?: ReactNode;
  /** Assistive text below the control. */
  helperText?: ReactNode;
  /** Error message — sets aria-invalid on the trigger. */
  error?: ReactNode;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Marks the field as required. */
  required?: boolean;
  /** Trigger control size. @default "md" */
  size?: DropdownSize;
  /** Panel placement relative to the trigger. @default "bottom-start" */
  placement?: DropdownPlacement;
  /**
   * Allow typing in the trigger to filter options.
   * @default false
   */
  searchable?: boolean;
  /** Placeholder for the searchable trigger input. Falls back to `placeholder`. */
  searchPlaceholder?: string;
  /**
   * Max height of the scrollable options list.
   * @default "16rem"
   */
  listMaxHeight?: number | string;
  /**
   * Render the options panel in a portal to avoid clipping in overflow containers.
   * @default true
   */
  portal?: boolean;
  /** Per-slot class overrides. */
  classNames?: DropdownClassNames;
  children?: ReactNode;
}

export interface DropdownTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Accessible name for the listbox. @default "Options" */
  "aria-label"?: string;
}

export interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  /** Text used for searchable filtering when label is not plain text. */
  searchText?: string;
  children?: ReactNode;
}

export type DropdownSeparatorProps = HTMLAttributes<HTMLHRElement>;

export interface DropdownLabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DropdownGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: ReactNode;
}
