import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useAsriUIId } from "../../hooks/useAsriUIId";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { Icon } from "../Icon";
import { SliderContext, SliderSlideContext, useSliderContext, useSliderSlideContext } from "./SliderContext";
import type {
  SliderControlsProps,
  SliderDotsProps,
  SliderNextProps,
  SliderPrevProps,
  SliderProps,
  SliderSlideProps,
  SliderTrackProps,
} from "./Slider.types";
import styles from "./Slider.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "track" | "slide" | "controls" | "prev" | "next" | "dots" | "dot"
>();

const SliderRoot = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    index,
    defaultIndex = 0,
    onIndexChange,
    loop = true,
    autoplay = 0,
    drag = true,
    label = "Slideshow",
    className,
    classNames,
    children,
    onMouseEnter,
    onMouseLeave,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const idPrefix = useAsriUIId(`slider-${reactId.replace(/:/g, "")}`);
  const reducedMotion = useReducedMotion();
  const [uncontrolled, setUncontrolled] = useState(defaultIndex);
  const [count, setCount] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [dragPaused, setDragPaused] = useState(false);
  const paused = hoverPaused || dragPaused;
  const current = index ?? uncontrolled;

  const goTo = useCallback(
    (next: number) => {
      if (count <= 0) return;
      const max = count - 1;
      let resolved = next;
      if (loop) {
        resolved = ((next % count) + count) % count;
      } else {
        resolved = Math.min(Math.max(next, 0), max);
      }
      if (index === undefined) setUncontrolled(resolved);
      onIndexChange?.(resolved);
    },
    [count, index, loop, onIndexChange],
  );

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (count === 0) return;
    if (current > count - 1) goTo(count - 1);
  }, [count, current, goTo]);

  const interval = typeof autoplay === "number" ? autoplay : 0;

  useEffect(() => {
    if (paused || reducedMotion || interval <= 0 || count < 2) return undefined;
    const timer = window.setInterval(goNext, interval);
    return () => window.clearInterval(timer);
  }, [count, goNext, interval, paused, reducedMotion]);

  const value = useMemo(
    () => ({
      index: current,
      count,
      setCount,
      goTo,
      goPrev,
      goNext,
      loop,
      idPrefix,
      animated: !reducedMotion,
      drag,
      setDragPaused,
    }),
    [count, current, drag, goNext, goPrev, goTo, idPrefix, loop, reducedMotion],
  );

  return (
    <SliderContext.Provider value={value}>
      <SlotClassNamesProvider classNames={classNames}>
        <div
          ref={ref}
          className={cn(styles.root, classNames?.root, className)}
          role="region"
          aria-roledescription="carousel"
          aria-label={label}
          onMouseEnter={(event) => {
            setHoverPaused(true);
            onMouseEnter?.(event);
          }}
          onMouseLeave={(event) => {
            setHoverPaused(false);
            onMouseLeave?.(event);
          }}
          {...rest}
        >
          {children}
        </div>
      </SlotClassNamesProvider>
    </SliderContext.Provider>
  );
});
SliderRoot.displayName = "Slider";

const DRAG_MIN_PX = 48;

function assignRef<T>(ref: ForwardedRef<T>, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
}

const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(function SliderTrack(
  { className, children, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, ...rest },
  ref,
) {
  const { index, setCount, animated, drag, loop, count, goNext, goPrev, setDragPaused } =
    useSliderContext("Slider.Track");
  const slides = Children.toArray(children).filter(isValidElement);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ active: false, startX: 0, pointerId: 0 });
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  useLayoutEffect(() => {
    setCount(slides.length);
  }, [setCount, slides.length]);

  const endDrag = useCallback(
    (clientX: number) => {
      if (!pointer.current.active) return;
      const dx = clientX - pointer.current.startX;
      const width = viewportRef.current?.offsetWidth ?? 1;
      const threshold = Math.max(DRAG_MIN_PX, width * 0.18);
      pointer.current.active = false;
      setDragging(false);
      setDragX(0);
      setDragPaused(false);
      if (dx <= -threshold) goNext();
      else if (dx >= threshold) goPrev();
    },
    [goNext, goPrev, setDragPaused],
  );

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    onPointerDown?.(event);
    if (event.defaultPrevented || !drag || event.button !== 0) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button, a, input, textarea, select, [data-slider-ignore-drag]")) return;
    pointer.current = { active: true, startX: event.clientX, pointerId: event.pointerId };
    viewportRef.current?.setPointerCapture?.(event.pointerId);
    setDragPaused(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    onPointerMove?.(event);
    if (!pointer.current.active) return;
    let dx = event.clientX - pointer.current.startX;
    if (!loop) {
      if (index === 0 && dx > 0) dx *= 0.35;
      if (count > 0 && index >= count - 1 && dx < 0) dx *= 0.35;
    }
    if (Math.abs(dx) > 8) setDragging(true);
    setDragX(dx);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    onPointerUp?.(event);
    endDrag(event.clientX);
  }

  function handlePointerCancel(event: ReactPointerEvent<HTMLDivElement>) {
    onPointerCancel?.(event);
    endDrag(event.clientX);
  }

  return (
    <div
      ref={(node) => {
        viewportRef.current = node;
        assignRef(ref, node);
      }}
      className={cn(
        styles.viewport,
        drag ? styles.draggable : undefined,
        dragging ? styles.dragging : undefined,
        useSlotClassName("track"),
        className,
      )}
      data-slider-track=""
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      {...rest}
    >
      <div
        className={cn(styles.track, animated && !dragging ? styles.animated : undefined)}
        style={{ transform: `translateX(calc(-${index * 100}% + ${dragX}px))` }}
      >
        {slides.map((child, slideIndex) => (
          <SliderSlideContext.Provider
            key={child.key ?? slideIndex}
            value={{ index: slideIndex, active: slideIndex === index }}
          >
            {child}
          </SliderSlideContext.Provider>
        ))}
      </div>
    </div>
  );
});
SliderTrack.displayName = "Slider.Track";

const SliderSlide = forwardRef<HTMLDivElement, SliderSlideProps>(function SliderSlide(
  { className, children, ...rest },
  ref,
) {
  const { idPrefix } = useSliderContext("Slider.Slide");
  const { index, active } = useSliderSlideContext("Slider.Slide");

  return (
    <div
      ref={ref}
      id={`${idPrefix}-slide-${index}`}
      className={cn(styles.slide, useSlotClassName("slide"), className)}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1}`}
      aria-hidden={active ? undefined : true}
      {...rest}
    >
      {children}
    </div>
  );
});
SliderSlide.displayName = "Slider.Slide";

const SliderControls = forwardRef<HTMLDivElement, SliderControlsProps>(function SliderControls(
  { className, children, ...rest },
  ref,
) {
  useSliderContext("Slider.Controls");
  return (
    <div ref={ref} className={cn(styles.controls, useSlotClassName("controls"), className)} {...rest}>
      {children}
    </div>
  );
});
SliderControls.displayName = "Slider.Controls";

const SliderPrev = forwardRef<HTMLButtonElement, SliderPrevProps>(function SliderPrev(
  { className, children, disabled, onClick, ...rest },
  ref,
) {
  const { goPrev, loop, index } = useSliderContext("Slider.Prev");
  const isDisabled = disabled || (!loop && index === 0);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.nav, useSlotClassName("prev"), className)}
      aria-label="Previous slide"
      disabled={isDisabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) goPrev();
      }}
      {...rest}
    >
      {children ?? <Icon name="chevron-left" size="sm" aria-hidden />}
    </button>
  );
});
SliderPrev.displayName = "Slider.Prev";

const SliderNext = forwardRef<HTMLButtonElement, SliderNextProps>(function SliderNext(
  { className, children, disabled, onClick, ...rest },
  ref,
) {
  const { goNext, loop, index, count } = useSliderContext("Slider.Next");
  const isDisabled = disabled || (!loop && count > 0 && index >= count - 1);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.nav, useSlotClassName("next"), className)}
      aria-label="Next slide"
      disabled={isDisabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) goNext();
      }}
      {...rest}
    >
      {children ?? <Icon name="chevron-right" size="sm" aria-hidden />}
    </button>
  );
});
SliderNext.displayName = "Slider.Next";

const SliderDots = forwardRef<HTMLDivElement, SliderDotsProps>(function SliderDots(
  { className, ...rest },
  ref,
) {
  const { count, index, goTo } = useSliderContext("Slider.Dots");
  const dotsClass = useSlotClassName("dots");
  const dotClass = useSlotClassName("dot");

  return (
    <div
      ref={ref}
      className={cn(styles.dots, dotsClass, className)}
      role="group"
      aria-label="Choose slide"
      {...rest}
    >
      {Array.from({ length: count }, (_, slideIndex) => (
        <button
          key={slideIndex}
          type="button"
          className={cn(styles.dot, slideIndex === index ? styles.dotActive : undefined, dotClass)}
          aria-label={`Go to slide ${slideIndex + 1}`}
          aria-current={slideIndex === index ? "true" : undefined}
          onClick={() => goTo(slideIndex)}
        />
      ))}
    </div>
  );
});
SliderDots.displayName = "Slider.Dots";

export const Slider = Object.assign(SliderRoot, {
  Track: SliderTrack,
  Slide: SliderSlide,
  Controls: SliderControls,
  Prev: SliderPrev,
  Next: SliderNext,
  Dots: SliderDots,
});
