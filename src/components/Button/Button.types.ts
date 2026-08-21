import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { AnalyticsTrackProps } from "../../config/analytics.types";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

/** Visual style variants for {@link Button}. */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

/** Size scale for {@link Button}. */
export type ButtonSize = "sm" | "md" | "lg";

/** Border radius preset for {@link Button}. */
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

/**
 * Props for the {@link Button} component.
 *
 * Extends native `<button>` attributes. When wrapped in `AsriUIProvider` with
 * analytics enabled, click events are automatically pushed to GTM dataLayer.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={save}>
 *   Save changes
 * </Button>
 * ```
 */
export interface ButtonProps
  extends OmitMotionDomConflicts<ButtonHTMLAttributes<HTMLButtonElement>>,
    AnalyticsTrackProps {
  /**
   * Visual style of the button.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Size of the button.
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Corner radius preset.
   * @default "md"
   */
  radius?: ButtonRadius;
  /**
   * Shows a loading spinner and disables interaction.
   * Sets `aria-busy` and `aria-disabled`.
   * @default false
   */
  loading?: boolean;
  /**
   * Enables Apple-style spring motion on hover and press.
   * Automatically disabled when `prefers-reduced-motion` is set.
   * @default true
   */
  motion?: boolean;
  /** Button label or child content. */
  children?: ReactNode;
}
