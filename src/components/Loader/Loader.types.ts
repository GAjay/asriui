import type { HTMLAttributes, ReactNode } from "react";

/** Loader visual style. */
export type LoaderVariant = "spinner" | "dots" | "ring";

/** Loader size preset. */
export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual loader style.
   * @default "spinner"
   */
  variant?: LoaderVariant;
  /**
   * Size preset.
   * @default "md"
   */
  size?: LoaderSize;
  /** Accessible loading label. @default "Loading" */
  label?: string;
  /** Show the label below the indicator. @default false */
  showLabel?: boolean;
  children?: ReactNode;
}
