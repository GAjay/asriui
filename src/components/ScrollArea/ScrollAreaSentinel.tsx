import type { HTMLAttributes } from "react";
import { forwardRef, useCallback } from "react";
import { cn } from "../../utils/cn";
import type { ScrollIntersectionOptions } from "./useScrollIntersection";
import { useScrollIntersection } from "./useScrollIntersection";
import styles from "./ScrollArea.module.css";

export type ScrollAreaSentinelProps = ScrollIntersectionOptions &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ScrollIntersectionOptions>;

/**
 * Zero-height sentinel for IntersectionObserver inside ScrollArea.
 * Place at the end of a list to trigger infinite scroll or lazy loading.
 */
export const ScrollAreaSentinel = forwardRef<HTMLDivElement, ScrollAreaSentinelProps>(
  function ScrollAreaSentinel(
    {
      className,
      onIntersect,
      onLeave,
      onChange,
      rootMargin,
      threshold,
      enabled,
      root,
      ...rest
    },
    ref,
  ) {
    const intersectionRef = useScrollIntersection({
      onIntersect,
      onLeave,
      onChange,
      rootMargin,
      threshold,
      enabled,
      root,
    });

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        intersectionRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [intersectionRef, ref],
    );

    return (
      <div
        ref={setRef}
        className={cn(styles.sentinel, className)}
        aria-hidden="true"
        data-scroll-sentinel=""
        {...rest}
      />
    );
  },
);

ScrollAreaSentinel.displayName = "ScrollArea.Sentinel";
