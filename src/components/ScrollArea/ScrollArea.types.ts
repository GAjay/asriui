import type { HTMLAttributes, ReactNode } from "react";

export type ScrollAreaType = "auto" | "always" | "scroll" | "hover";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export interface ScrollAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  /**
   * Sync the custom scrollbar with window/document scrolling instead of a local viewport.
   * Wrap your page or app shell when you want styled page scrollbars.
   * @default false
   */
  page?: boolean;
  /**
   * Fixed viewport height for container scrolling.
   * Ignored when `page` is true.
   */
  height?: number | string;
  /** Max height for container scrolling. */
  maxHeight?: number | string;
  /**
   * When to show scrollbars.
   * @default "auto"
   */
  type?: ScrollAreaType;
  /**
   * Scroll axes to style.
   * @default "vertical"
   */
  orientation?: ScrollAreaOrientation;
  /** Accessible label for the scroll region. */
  label?: string;
  /** Custom class on the scrollable viewport element. */
  viewportClassName?: string;
}

export type ScrollMetrics = {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
};
