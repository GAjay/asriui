import {
  Children,
  forwardRef,
  useMemo,
  useRef,
  type CSSProperties,
  type MutableRefObject,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Tooltip } from "../Tooltip/Tooltip";
import { TimelineProvider, useTimelineContextOptional } from "./TimelineContext";
import type { TimelineItemConfig, TimelineItemProps, TimelineProps } from "./Timeline.types";
import {
  DEFAULT_TIMELINE_TRACK_COLORS,
  mergeTimelineStatusColors,
  timelineItemColorStyle,
} from "./timelineStatusColors";
import styles from "./Timeline.module.css";

function resolveHorizontalProgress(items: TimelineItemConfig[]) {
  const activeIndex = items.findIndex((item) => item.status === "active");
  const lastCompleteIndex = items.reduce(
    (last, item, index) => (item.status === "complete" ? index : last),
    -1,
  );
  const progressIndex = activeIndex >= 0 ? activeIndex : lastCompleteIndex;
  if (items.length <= 1) return 100;
  return Math.max(0, (progressIndex / (items.length - 1)) * 100);
}

function renderConfiguredItems(items: TimelineItemConfig[], alternate?: boolean) {
  return items.map((item, index) => (
    <TimelineItem
      key={item.id ?? `${item.title}-${index}`}
      title={item.title}
      date={item.date}
      status={item.status}
      description={item.description}
      className={item.className}
      style={item.style}
      position={alternate ? (index % 2 === 0 ? "bottom" : "top") : undefined}
    />
  ));
}

const TimelineRoot = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  {
    className,
    children,
    orientation = "vertical",
    items,
    statusColors,
    trackColors,
    animateOnView = true,
    alternate = false,
    descriptionMode = "inline",
    style,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const innerRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(innerRef, { once: true, margin: "-60px" });
  const mergedStatusColors = useMemo(() => mergeTimelineStatusColors(statusColors), [statusColors]);
  const stepCount = items?.length ?? Children.count(children);
  const horizontalProgress = orientation === "horizontal" && items ? resolveHorizontalProgress(items) : 0;
  const shouldAnimate =
    orientation === "horizontal" && animateOnView && inView && !reducedMotion && Boolean(items?.length);
  const isAlternateHorizontal = alternate && orientation === "horizontal";

  const rootStyle = {
    ...style,
    "--timeline-steps": stepCount,
    "--timeline-track-bg": trackColors?.background ?? DEFAULT_TIMELINE_TRACK_COLORS.background,
    "--timeline-track-fill": trackColors?.fill ?? DEFAULT_TIMELINE_TRACK_COLORS.fill,
  } as CSSProperties;

  const setRef = (node: HTMLOListElement | null) => {
    (innerRef as MutableRefObject<HTMLOListElement | null>).current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as MutableRefObject<HTMLOListElement | null>).current = node;
  };

  const content = items ? renderConfiguredItems(items, isAlternateHorizontal) : children;

  const track =
    orientation === "horizontal" && items && items.length > 1 ? (
      <div className={styles.track} aria-hidden="true">
        <motion.span
          className={styles.trackFill}
          initial={{ scaleX: reducedMotion ? 1 : 0 }}
          animate={{
            scaleX: shouldAnimate || reducedMotion || !animateOnView ? horizontalProgress / 100 : 0,
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    ) : null;

  const list = (
    <ol
      ref={setRef}
      data-orientation={orientation}
      data-layout={isAlternateHorizontal ? "alternate" : undefined}
      className={cn(styles.root, className)}
      style={rootStyle}
      aria-label={ariaLabel}
      {...rest}
    >
      {content}
    </ol>
  );

  return (
    <TimelineProvider
      value={{ orientation, statusColors: mergedStatusColors, descriptionMode }}
    >
      {orientation === "horizontal" ? (
        <div
          className={styles.frame}
          data-layout={isAlternateHorizontal ? "alternate" : undefined}
        >
          {track}
          {list}
        </div>
      ) : (
        list
      )}
    </TimelineProvider>
  );
});
TimelineRoot.displayName = "Timeline";

const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(function TimelineItem(
  { title, date, status = "default", description, position, className, style, children, ...rest },
  ref,
) {
  const context = useTimelineContextOptional();
  const orientation = context?.orientation ?? "vertical";
  const descriptionMode = context?.descriptionMode ?? "inline";
  const colors = (context?.statusColors ?? mergeTimelineStatusColors())[status];
  const itemStyle = {
    ...timelineItemColorStyle(colors ?? {}),
    ...style,
  } as CSSProperties;
  const showDescriptionInline = Boolean(description) && descriptionMode === "inline";
  const showDescriptionTooltip = Boolean(description) && descriptionMode === "tooltip";
  const tooltipPlacement = position === "top" ? "bottom" : "top";
  const isAlternate = orientation === "horizontal" && position != null;

  const header = (
    <div className={styles.header}>
      {orientation === "horizontal" && date ? <time className={styles.date}>{date}</time> : null}
      <h3 className={styles.title}>{title}</h3>
      {orientation === "vertical" && date ? <time className={styles.date}>{date}</time> : null}
    </div>
  );

  const content = (
    <div className={styles.content}>
      {showDescriptionTooltip ? (
        <Tooltip delayDuration={120}>
          <Tooltip.Trigger className={styles.contentTrigger}>
            {header}
          </Tooltip.Trigger>
          <Tooltip.Content placement={tooltipPlacement} sideOffset={10}>
            {description}
          </Tooltip.Content>
        </Tooltip>
      ) : (
        header
      )}
      {showDescriptionInline ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );

  const indicator = (
    <span className={styles.indicator} aria-hidden="true">
      <span className={styles.dot} />
    </span>
  );

  if (isAlternate) {
    return (
      <li
        ref={ref}
        data-orientation={orientation}
        data-status={status}
        data-position={position}
        data-has-tooltip={showDescriptionTooltip ? "true" : undefined}
        className={cn(styles.item, styles.itemAlternate, className)}
        style={itemStyle}
        {...rest}
      >
        <div className={styles.slotTop}>{position === "top" ? content : null}</div>
        <div className={styles.node}>{indicator}</div>
        <div className={styles.slotBottom}>{position === "bottom" ? content : null}</div>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      data-orientation={orientation}
      data-status={status}
      data-position={position}
      data-has-tooltip={showDescriptionTooltip ? "true" : undefined}
      className={cn(styles.item, className)}
      style={itemStyle}
      {...rest}
    >
      {indicator}
      {content}
    </li>
  );
});
TimelineItem.displayName = "Timeline.Item";

/**
 * Timeline for roadmaps, changelogs, and step progress — vertical or horizontal.
 *
 * @example Config-driven
 * ```tsx
 * <Timeline
 *   orientation="horizontal"
 *   items={[
 *     { id: "1", title: "Install", status: "complete", date: "Step 1" },
 *     { id: "2", title: "Ship", status: "active", date: "Step 2" },
 *   ]}
 *   statusColors={{
 *     complete: { dot: "#059669", dotBorder: "#059669" },
 *     active: { dot: "#0284c7", dotBorder: "#0284c7" },
 *   }}
 * />
 * ```
 *
 * @example Compound
 * ```tsx
 * <Timeline>
 *   <Timeline.Item title="Shipped" date="Q1" status="complete" />
 * </Timeline>
 * ```
 */
export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
});
