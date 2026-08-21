import type { CSSProperties, HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";

/** Visual state for a timeline step. */
export type TimelineItemStatus = "default" | "active" | "complete";

/** Layout direction for the timeline. */
export type TimelineOrientation = "vertical" | "horizontal";

/** Per-status color tokens applied to dots, connectors, and titles. */
export type TimelineStatusColor = {
  /** Dot fill color. */
  dot?: string;
  /** Dot border color. */
  dotBorder?: string;
  /** Connector line color (vertical item line or horizontal track segment). */
  connector?: string;
  /** Step title color. */
  title?: string;
  /** Optional glow or ring around the active dot. */
  glow?: string;
};

/** Override default colors per status — merged with library defaults. */
export type TimelineStatusColors = Partial<Record<TimelineItemStatus, TimelineStatusColor>>;

/** Horizontal progress track colors. */
export type TimelineTrackColors = {
  background?: string;
  fill?: string;
};

/** Config entry for automatic timeline rendering via the `items` prop. */
export type TimelineItemConfig = {
  /** Stable key — falls back to index when omitted. */
  id?: string;
  title: string;
  date?: string;
  status?: TimelineItemStatus;
  description?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  /**
   * Layout direction.
   * @default "vertical"
   */
  orientation?: TimelineOrientation;
  /** Render steps from config instead of composing `Timeline.Item` children. */
  items?: TimelineItemConfig[];
  /** Override colors per status — merged with defaults. */
  statusColors?: TimelineStatusColors;
  /** Horizontal track bar colors. */
  trackColors?: TimelineTrackColors;
  /**
   * Animate horizontal progress when scrolled into view.
   * Only applies when `orientation="horizontal"`.
   * @default true
   */
  animateOnView?: boolean;
  /**
   * Alternate step labels above and below the track (horizontal only).
   * @default false
   */
  alternate?: boolean;
  /**
   * How step descriptions are shown.
   * `tooltip` shows description on hover/focus (recommended for compact horizontal timelines).
   * @default "inline"
   */
  descriptionMode?: "inline" | "tooltip";
  children?: ReactNode;
}

export interface TimelineItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Step title. */
  title: string;
  /** Optional date or label shown opposite the title. */
  date?: string;
  /**
   * Visual state of the step.
   * @default "default"
   */
  status?: TimelineItemStatus;
  /** Supporting description text. */
  description?: ReactNode;
  /**
   * Vertical placement for alternate horizontal layouts.
   * Set automatically when `Timeline` uses `alternate`.
   */
  position?: "top" | "bottom";
  children?: ReactNode;
}
