import type { HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

export type MetricVariant = "tile" | "compact" | "quote";
export type MetricTrend = "up" | "down" | "neutral";
export type MetricFormat = "number" | "currency" | "percent" | "compact";

export type MetricClassNames = {
  root?: string;
  header?: string;
  symbol?: string;
  label?: string;
  value?: string;
  change?: string;
  hint?: string;
  extra?: string;
  live?: string;
};

export interface MetricProps extends OmitMotionDomConflicts<HTMLAttributes<HTMLDivElement>> {
  /** Layout preset for trading tiles, ticker rows, or hero quotes. @default "tile" */
  variant?: MetricVariant;
  /** Directional styling for value and change slots. */
  trend?: MetricTrend;
  /** Shows a pulsing live indicator beside the symbol row. */
  live?: boolean;
  /** Fade-up entrance animation. @default true */
  motion?: boolean;
  /** Slot class name overrides. */
  classNames?: MetricClassNames;
  children?: ReactNode;
}

export interface MetricSymbolProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export interface MetricLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface MetricValueProps extends HTMLAttributes<HTMLParagraphElement> {
  value?: number;
  format?: MetricFormat;
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  children?: ReactNode;
}

export interface MetricChangeProps extends HTMLAttributes<HTMLSpanElement> {
  value?: number;
  format?: MetricFormat;
  currency?: string;
  locale?: string;
  trend?: MetricTrend;
  showSign?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  children?: ReactNode;
}

export interface MetricHintProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface MetricExtraProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
