import type { HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

export interface CheckboxCardProps
  extends OmitMotionDomConflicts<Omit<HTMLAttributes<HTMLLabelElement>, "onChange" | "title">> {
  /** Custom class name for the card root. */
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
  motion?: boolean;
}
