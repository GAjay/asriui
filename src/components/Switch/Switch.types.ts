import type { ButtonHTMLAttributes } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

/**
 * Props for the {@link Switch} toggle control.
 *
 * Implements the WAI-ARIA `switch` role with `aria-checked` semantics.
 * Supports both controlled and uncontrolled usage patterns.
 *
 * @example
 * ```tsx
 * <Switch
 *   id="notifications"
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 *   aria-labelledby="notifications-label"
 * />
 * ```
 */
export interface SwitchProps
  extends OmitMotionDomConflicts<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">> {
  /** Controlled checked state. Omit for uncontrolled mode. */
  checked?: boolean;
  /**
   * Initial checked state for uncontrolled usage.
   * @default false
   */
  defaultChecked?: boolean;
  /** Called when the user toggles the switch. */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Prevents toggling and dims the control.
   * @default false
   */
  disabled?: boolean;
}
