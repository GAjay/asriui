import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** Max-width token for centered page content. */
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/** Horizontal padding token. */
export type ContainerPadding = "none" | "sm" | "md" | "lg";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Max width of the content column.
   * @default "lg"
   */
  size?: ContainerSize;
  /**
   * Horizontal padding inside the container.
   * @default "md"
   */
  padding?: ContainerPadding;
  /**
   * Center the container in its parent.
   * @default true
   */
  centered?: boolean;
  /** Render as a different element. @default "div" */
  as?: "div" | "section" | "main" | "article" | "aside" | "header" | "footer";
  children?: ReactNode;
}

export type ContainerStyleVars = CSSProperties;
