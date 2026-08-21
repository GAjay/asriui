import { Timeline, type TimelineItemConfig } from "../src/components/Timeline";

/** @deprecated Use `Timeline` with `orientation="horizontal"` instead. */
export type HorizontalTimelineStep = TimelineItemConfig & { id: string };

type Props = {
  steps: HorizontalTimelineStep[];
  className?: string;
  animateOnView?: boolean;
  "aria-label"?: string;
};

/** @deprecated Use `<Timeline orientation="horizontal" items={...} />` instead. */
export function HorizontalTimeline({
  steps,
  className,
  animateOnView = true,
  "aria-label": ariaLabel = "Progress timeline",
}: Props) {
  return (
    <Timeline
      orientation="horizontal"
      items={steps}
      className={className}
      animateOnView={animateOnView}
      aria-label={ariaLabel}
      statusColors={{
        complete: { dot: "#059669", dotBorder: "#059669" },
        active: {
          dot: "#0284c7",
          dotBorder: "#0284c7",
          glow: "color-mix(in srgb, #0284c7 22%, transparent)",
        },
      }}
      trackColors={{
        fill: "linear-gradient(90deg, #059669 0%, #0284c7 45%, #7c3aed 100%)",
      }}
    />
  );
}
