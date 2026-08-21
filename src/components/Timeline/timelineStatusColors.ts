import type { CSSProperties } from "react";
import type { TimelineItemStatus, TimelineStatusColor, TimelineStatusColors } from "./Timeline.types";

export const DEFAULT_TIMELINE_STATUS_COLORS: Record<TimelineItemStatus, TimelineStatusColor> = {
  default: {
    dot: "var(--asriui-color-background)",
    dotBorder: "var(--asriui-color-border)",
    connector: "var(--asriui-color-border)",
    title: "var(--asriui-color-foreground)",
  },
  active: {
    dot: "var(--asriui-color-foreground)",
    dotBorder: "var(--asriui-color-foreground)",
    connector: "var(--asriui-color-border)",
    title: "var(--asriui-color-foreground)",
    glow: "color-mix(in srgb, var(--asriui-color-foreground) 15%, transparent)",
  },
  complete: {
    dot: "var(--asriui-color-foreground)",
    dotBorder: "var(--asriui-color-foreground)",
    connector: "var(--asriui-color-foreground)",
    title: "var(--asriui-color-foreground)",
  },
};

export const DEFAULT_TIMELINE_TRACK_COLORS = {
  background: "var(--asriui-color-border)",
  fill: "var(--asriui-color-foreground)",
};

export function mergeTimelineStatusColors(
  overrides?: TimelineStatusColors,
): Record<TimelineItemStatus, TimelineStatusColor> {
  return {
    default: { ...DEFAULT_TIMELINE_STATUS_COLORS.default, ...overrides?.default },
    active: { ...DEFAULT_TIMELINE_STATUS_COLORS.active, ...overrides?.active },
    complete: { ...DEFAULT_TIMELINE_STATUS_COLORS.complete, ...overrides?.complete },
  };
}

export function timelineItemColorStyle(colors: TimelineStatusColor): CSSProperties {
  return {
    "--timeline-dot": colors.dot,
    "--timeline-dot-border": colors.dotBorder,
    "--timeline-connector": colors.connector,
    "--timeline-title": colors.title,
    "--timeline-glow": colors.glow,
  } as CSSProperties;
}
