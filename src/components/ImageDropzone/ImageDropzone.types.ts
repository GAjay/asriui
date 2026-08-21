import type { HTMLAttributes } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

export interface ImageDropzoneProps
  extends OmitMotionDomConflicts<Omit<HTMLAttributes<HTMLDivElement>, "onChange">> {
  className?: string;
  id?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
}
