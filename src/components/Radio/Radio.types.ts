import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom class name for the radio group container. */
  className?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "checked" | "defaultChecked"> {
  /** Custom class name for the radio label wrapper. */
  className?: string;
  value: string;
  label?: ReactNode;
  description?: ReactNode;
}
