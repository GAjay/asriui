import type { CSSProperties } from "react";
import type { TimelineItemStatus, TimelineStatusColor, TimelineStatusColors } from "./Timeline.types";

export const DEFAULT_TIMELINE_STATUS_COLORS: Record<TimelineItemStatus, TimelineStatusColor> = {
  default: {
    dot: "var(--axiom-color-background)",
    dotBorder: "var(--axiom-color-border)",
    connector: "var(--axiom-color-border)",
    title: "var(--axiom-color-foreground)",
  },
  active: {
    dot: "var(--axiom-color-foreground)",
    dotBorder: "var(--axiom-color-foreground)",
    connector: "var(--axiom-color-border)",
    title: "var(--axiom-color-foreground)",
    glow: "color-mix(in srgb, var(--axiom-color-foreground) 15%, transparent)",
  },
  complete: {
    dot: "var(--axiom-color-foreground)",
    dotBorder: "var(--axiom-color-foreground)",
    connector: "var(--axiom-color-foreground)",
    title: "var(--axiom-color-foreground)",
  },
};

export const DEFAULT_TIMELINE_TRACK_COLORS = {
  background: "var(--axiom-color-border)",
  fill: "var(--axiom-color-foreground)",
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
