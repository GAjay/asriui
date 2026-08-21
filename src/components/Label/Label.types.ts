import type { LabelHTMLAttributes, ReactNode } from "react";

/**
 * Props for the {@link Label} form label.
 *
 * Associates with a form control via the native `htmlFor` attribute.
 * Use the `required` prop to display a visual asterisk indicator.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required>Email address</Label>
 * <Input id="email" type="email" />
 * ```
 */
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Displays a red asterisk after the label text.
   * @default false
   */
  required?: boolean;
  /** Label text or child content. */
  children?: ReactNode;
}
