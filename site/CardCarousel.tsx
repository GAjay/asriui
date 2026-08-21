import {
  Children,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "../src/utils/cn";
import styles from "./CardCarousel.module.css";

export type CardCarouselProps = {
  children: ReactNode;
  label: string;
  className?: string;
  /** Autoplay interval in ms. Disabled when prefers-reduced-motion. */
  intervalMs?: number;
};

/**
 * Horizontal scroll-snap carousel — autoplay, no indicators. Cards invert on hover.
 */
export function CardCarousel({
  children,
  label,
  className,
  intervalMs = 4200,
}: CardCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const childCount = Children.count(children);

  const advance = useCallback(() => {
    const track = trackRef.current;
    if (!track || childCount <= 1) return;

    const firstItem = track.firstElementChild as HTMLElement | null;
    if (!firstItem) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 12;
    const step = firstItem.offsetWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (maxScroll <= 0) return;

    const next = track.scrollLeft + step;
    const behavior = reducedMotion ? ("auto" as const) : ("smooth" as const);

    if (next >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior });
    } else {
      track.scrollTo({ left: next, behavior });
    }
  }, [childCount, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || paused || childCount <= 1) return;
    const id = window.setInterval(advance, intervalMs);
    return () => window.clearInterval(id);
  }, [advance, intervalMs, paused, reducedMotion, childCount]);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [childCount, children]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const syncHeights = () => {
      const items = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-item]"));
      if (!items.length) return;

      items.forEach((item) => {
        item.style.minHeight = "";
      });

      const maxHeight = items.reduce((max, item) => Math.max(max, item.offsetHeight), 0);
      if (maxHeight <= 0) return;

      items.forEach((item) => {
        item.style.minHeight = `${maxHeight}px`;
      });
    };

    syncHeights();

    const observer = new ResizeObserver(syncHeights);
    observer.observe(track);
    Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-item]")).forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [childCount, children]);

  return (
    <div
      className={cn(styles.wrap, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      {/* Keyboard focus lets users pause/scroll the track without using a mouse. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div ref={trackRef} className={styles.track} role="list" aria-label={label} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}

export function CardCarouselItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(styles.item, className)} role="listitem" data-carousel-item>
      {children}
    </div>
  );
}
