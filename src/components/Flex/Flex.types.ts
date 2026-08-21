import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
export type FlexGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex direction. @default "row" */
  direction?: FlexDirection;
  /** Align items on the cross axis. @default "stretch" */
  align?: FlexAlign;
  /** Justify content on the main axis. @default "start" */
  justify?: FlexJustify;
  /** Gap between children. @default "none" */
  gap?: FlexGap;
  /** Flex wrap behavior. @default "nowrap" */
  wrap?: FlexWrap;
  /** Grow to fill available width. @default false */
  inline?: boolean;
  children?: ReactNode;
}

export type FlexStyleVars = CSSProperties;
