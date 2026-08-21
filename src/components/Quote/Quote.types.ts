import type { HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

export type QuoteVariant = "default" | "large";

export interface QuoteProps extends OmitMotionDomConflicts<HTMLAttributes<HTMLQuoteElement>> {
  /** Custom class name for the quote root. */
  className?: string;
  variant?: QuoteVariant;
  cite?: string;
  footer?: ReactNode;
  children?: ReactNode;
  motion?: boolean;
}
