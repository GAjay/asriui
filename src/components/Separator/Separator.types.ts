import type { HTMLAttributes } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom class name for the separator element. */
  className?: string;
  /** Divider direction. @default "horizontal" */
  orientation?: SeparatorOrientation;
  /** When true, removes separator semantics for purely visual dividers. @default true */
  decorative?: boolean;
  /** Accessible label when the separator is meaningful. */
  label?: string;
}
