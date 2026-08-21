import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { Transition } from "framer-motion";

/** Grid layout preset. */
export type GridVariant = "fixed" | "auto";

/** Gap size token. */
export type GridGap = "none" | "sm" | "md" | "lg";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Layout preset.
   * - fixed: explicit column count
   * - auto: responsive auto-fill columns
   * @default "auto"
   */
  variant?: GridVariant;
  /**
   * Column count for `fixed` variant.
   * @default 2
   */
  columns?: number;
  /**
   * Minimum column width for `auto` variant.
   * @default "16rem"
   */
  minColumnWidth?: number | string;
  /** Gap between items. @default "md" */
  gap?: GridGap;
  /**
   * Animate card repositioning when the auto-fill layout reflows on resize.
   * Enabled by default for `auto` variant. Respects `prefers-reduced-motion`.
   */
  motion?: boolean;
  /** Override the layout transition spring. */
  layoutTransition?: Transition;
  children?: ReactNode;
}

export type GridStyleVars = CSSProperties & {
  "--grid-columns"?: string;
  "--grid-min-col"?: string;
};
