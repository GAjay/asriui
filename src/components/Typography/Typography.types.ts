import type { HTMLAttributes, ReactNode } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "lead"
  | "small"
  | "muted"
  | "code";

export type TypographyAlign = "left" | "center" | "right";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /**
   * Typography preset.
   * @default "p"
   */
  variant?: TypographyVariant;
  /** Render as a different HTML element while keeping styles. */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "label" | "small" | "code";
  /** Text alignment. @default "left" */
  align?: TypographyAlign;
  /** Truncate with ellipsis. @default false */
  truncate?: boolean;
  children?: ReactNode;
}
