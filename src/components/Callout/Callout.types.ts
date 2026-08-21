import type { HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

export type CalloutVariant = "info" | "success" | "warning" | "danger";

export interface CalloutProps extends OmitMotionDomConflicts<Omit<HTMLAttributes<HTMLDivElement>, "title">> {
  /** Custom class name for the callout root. */
  className?: string;
  variant?: CalloutVariant;
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  motion?: boolean;
}
