import type { HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipClassNames = SlotClassNames<"root" | "trigger" | "content">;

export interface TooltipProps {
  /** Delay before showing the tooltip (ms). @default 200 */
  delayDuration?: number;
  /** Delay before hiding after pointer leaves (ms). @default 0 */
  skipDelayDuration?: number;
  /** Override class names for tooltip slots. */
  classNames?: TooltipClassNames;
  children?: ReactNode;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Preferred side relative to the trigger. @default "top" */
  placement?: TooltipPlacement;
  /** Offset from the trigger in pixels. @default 8 */
  sideOffset?: number;
}
