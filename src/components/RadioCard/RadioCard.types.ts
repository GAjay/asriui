import type { HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

export interface RadioCardProps extends OmitMotionDomConflicts<Omit<HTMLAttributes<HTMLLabelElement>, "onChange" | "title">> {
  /** Custom class name for the card root. */
  className?: string;
  value: string;
  title?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  motion?: boolean;
}

export interface RadioCardGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom class name for the radio card group container. */
  className?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}
