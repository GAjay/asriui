import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";
import type { ResetContextValue } from "./ResetContext";

export type ResetRootProps<T extends Record<string, unknown>> = {
  defaults: T;
  /** Custom class name for the reset scope wrapper. */
  className?: string;
  children: ReactNode | ((context: ResetContextValue<T>) => ReactNode);
};

export interface ResetTriggerProps
  extends OmitMotionDomConflicts<ButtonHTMLAttributes<HTMLButtonElement>> {
  /** Custom class name for the reset trigger button. */
  className?: string;
  children?: ReactNode;
}

export interface ResetTargetProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom class name for the reset target wrapper. */
  className?: string;
  children?: ReactNode;
}
