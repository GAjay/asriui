import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "../../utils/cn";
import type { ScrollAreaOrientation, ScrollAreaProps } from "./ScrollArea.types";
import styles from "./ScrollArea.module.css";
import { ScrollAreaContext } from "./ScrollAreaContext";
import { ScrollAreaSentinel } from "./ScrollAreaSentinel";
import { useScrollMetrics } from "./useScrollMetrics";

type Axis = "vertical" | "horizontal";

type AxisScrollbarProps = {
  axis: Axis;
  page: boolean;
  metrics: ReturnType<typeof useScrollMetrics>["metrics"];
  scrollTo: ReturnType<typeof useScrollMetrics>["scrollTo"];
  update: () => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getThumbMetrics(
  axis: Axis,
  metrics: AxisScrollbarProps["metrics"],
) {
  const isVertical = axis === "vertical";
  const scrollSize = isVertical ? metrics.scrollHeight : metrics.scrollWidth;
  const clientSize = isVertical ? metrics.clientHeight : metrics.clientWidth;
  const scrollOffset = isVertical ? metrics.scrollTop : metrics.scrollLeft;

  if (scrollSize <= clientSize || clientSize <= 0) {
    return { visible: false, size: 0, offset: 0, maxOffset: 0, maxScroll: 0 };
  }

  const trackSize = clientSize - 8;
  const thumbSize = Math.max((clientSize / scrollSize) * trackSize, 24);
  const maxOffset = trackSize - thumbSize;
  const maxScroll = scrollSize - clientSize;
  const offset = maxScroll > 0 ? (scrollOffset / maxScroll) * maxOffset : 0;

  return {
    visible: true,
    size: thumbSize,
    offset,
    maxOffset,
    maxScroll,
    clientSize,
    scrollOffset,
  };
}

function ScrollbarAxis({ axis, page, metrics, scrollTo, update }: AxisScrollbarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<{ startPointer: number; startScroll: number; maxOffset: number; maxScroll: number } | null>(
    null,
  );

  const thumb = useMemo(() => getThumbMetrics(axis, metrics), [axis, metrics]);
  const isVertical = axis === "vertical";

  const handleTrackPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!trackRef.current || !thumb.visible) return;
      if (event.target !== trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const pointer = isVertical ? event.clientY - rect.top : event.clientX - rect.left;
      const nextOffset = clamp(pointer - thumb.size / 2, 0, thumb.maxOffset);
      const ratio = thumb.maxOffset > 0 ? nextOffset / thumb.maxOffset : 0;
      const nextScroll = ratio * thumb.maxScroll;

      scrollTo(isVertical ? { scrollTop: nextScroll } : { scrollLeft: nextScroll });
      update();
    },
    [isVertical, scrollTo, thumb.maxOffset, thumb.maxScroll, thumb.size, thumb.visible, update],
  );

  const handleThumbPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!thumb.visible) return;
      event.preventDefault();
      event.stopPropagation();

      dragState.current = {
        startPointer: isVertical ? event.clientY : event.clientX,
        startScroll: thumb.scrollOffset ?? 0,
        maxOffset: thumb.maxOffset,
        maxScroll: thumb.maxScroll,
      };
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [isVertical, thumb.maxOffset, thumb.maxScroll, thumb.scrollOffset, thumb.visible],
  );

  const handleThumbPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const state = dragState.current;
      if (!state) return;

      const pointer = isVertical ? event.clientY : event.clientX;
      const delta = pointer - state.startPointer;
      const scrollDelta = state.maxOffset > 0 ? (delta / state.maxOffset) * state.maxScroll : 0;
      const nextScroll = clamp(state.startScroll + scrollDelta, 0, state.maxScroll);

      scrollTo(isVertical ? { scrollTop: nextScroll } : { scrollLeft: nextScroll });
      update();
    },
    [isVertical, scrollTo, update],
  );

  const handleThumbPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = null;
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  if (!thumb.visible) return null;

  const thumbStyle: CSSProperties = isVertical
    ? { height: thumb.size, transform: `translateY(${thumb.offset}px)` }
    : { width: thumb.size, transform: `translateX(${thumb.offset}px)` };

  return (
    <div
      className={cn(
        styles.scrollbar,
        isVertical ? styles.vertical : styles.horizontal,
        page && isVertical ? styles.pageVertical : undefined,
      )}
      data-orientation={axis}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handleTrackPointerDown}
      >
        <div
          className={styles.thumb}
          data-dragging={dragging ? "true" : undefined}
          style={thumbStyle}
          onPointerDown={handleThumbPointerDown}
          onPointerMove={handleThumbPointerMove}
          onPointerUp={handleThumbPointerUp}
          onPointerCancel={handleThumbPointerUp}
        />
      </div>
    </div>
  );
}

function showsAxis(orientation: ScrollAreaOrientation, axis: Axis) {
  return orientation === "both" || orientation === axis;
}

/** Custom scrollbar for containers and full-page scrolling. */
const ScrollAreaRoot = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  {
    children,
    page = false,
    height,
    maxHeight,
    type = "auto",
    orientation = "vertical",
    label,
    className,
    viewportClassName,
    style,
    ...rest
  },
  ref,
) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const { metrics, update, scrollTo } = useScrollMetrics(viewportRef, page);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      setViewport(node);
      if (typeof ref === "function") ref(node);
      else if (ref) {
        (ref as MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const viewportStyle: CSSProperties = page
    ? {}
    : {
        height: typeof height === "number" ? `${height}px` : height,
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      };

  const showVertical = showsAxis(orientation, "vertical");
  const showHorizontal = showsAxis(orientation, "horizontal");

  const verticalThumb = useMemo(
    () => (showVertical ? getThumbMetrics("vertical", metrics) : { visible: false }),
    [metrics, showVertical],
  );
  const horizontalThumb = useMemo(
    () => (showHorizontal ? getThumbMetrics("horizontal", metrics) : { visible: false }),
    [metrics, showHorizontal],
  );
  const hasOverflow = verticalThumb.visible || horizontalThumb.visible;

  const contextValue = useMemo(
    () => ({
      viewportRef,
      viewport,
      page,
    }),
    [page, viewport],
  );

  return (
    <ScrollAreaContext.Provider value={contextValue}>
      <div
        className={cn(styles.root, page && styles.page, className)}
        data-type={type}
        data-page={page ? "true" : undefined}
        data-overflow={hasOverflow ? "true" : undefined}
        style={style}
        {...rest}
      >
        <div
          ref={setRefs}
          className={cn(styles.viewport, page && styles.pageViewport, viewportClassName)}
          style={viewportStyle}
          role={label ? "region" : undefined}
          aria-label={label}
          tabIndex={page ? undefined : 0}
        >
          {children}
        </div>

        {showVertical ? (
          <ScrollbarAxis
            axis="vertical"
            page={page}
            metrics={metrics}
            scrollTo={scrollTo}
            update={update}
          />
        ) : null}

        {showHorizontal && !page ? (
          <ScrollbarAxis
            axis="horizontal"
            page={page}
            metrics={metrics}
            scrollTo={scrollTo}
            update={update}
          />
        ) : null}
      </div>
    </ScrollAreaContext.Provider>
  );
});

ScrollAreaRoot.displayName = "ScrollArea";

export const ScrollArea = Object.assign(ScrollAreaRoot, {
  Sentinel: ScrollAreaSentinel,
});
