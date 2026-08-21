import { createContext, useContext } from "react";
import type { TimelineItemStatus, TimelineOrientation, TimelineStatusColor } from "./Timeline.types";

export type TimelineContextValue = {
  orientation: TimelineOrientation;
  statusColors: Record<TimelineItemStatus, TimelineStatusColor>;
  descriptionMode: "inline" | "tooltip";
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

export function TimelineProvider({
  value,
  children,
}: {
  value: TimelineContextValue;
  children: React.ReactNode;
}) {
  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

export function useTimelineContext() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("Timeline compound components must be used within <Timeline>.");
  }
  return context;
}

export function useTimelineContextOptional() {
  return useContext(TimelineContext);
}
