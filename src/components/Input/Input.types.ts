import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the {@link Input} text field component.
 *
 * Automatically wires `label`, `helperText`, and `error` to the input via
 * `aria-describedby` and `aria-invalid` for full accessibility compliance.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   required
 *   helperText="We'll never share your email."
 * />
 * ```
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "size"> {
  /** Visible label rendered above the input and linked via `htmlFor`. */
  label?: ReactNode;
  /** Assistive text shown below the input when there is no error. */
  helperText?: ReactNode;
  /**
   * Error message displayed below the input.
   * Sets `aria-invalid="true"` and replaces helper text.
   */
  error?: ReactNode;
  /** Content rendered before the input field inside the control border. */
  prefix?: ReactNode;
  /** Content rendered after the input field inside the control border. */
  suffix?: ReactNode;
  /**
   * Marks the field as required visually (asterisk) and via `aria-required`.
   * @default false
   */
  required?: boolean;
  /**
   * Enables entrance fade-up motion on mount.
   * @default true
   */
  motion?: boolean;
}
