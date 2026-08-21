import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollAreaContextOptional } from "./ScrollAreaContext";

export type ScrollIntersectionOptions = {
  /** Fires when the target enters the scroll root. */
  onIntersect?: (entry: IntersectionObserverEntry) => void;
  /** Fires when the target leaves the scroll root. */
  onLeave?: (entry: IntersectionObserverEntry) => void;
  /** Fires on every intersection change. */
  onChange?: (entry: IntersectionObserverEntry, isIntersecting: boolean) => void;
  /** Margin around the scroll root. Useful for prefetching before the sentinel is visible. */
  rootMargin?: string;
  threshold?: number | number[];
  /** Disable observation without unmounting the sentinel. */
  enabled?: boolean;
  /** Override the scroll root. Defaults to the ScrollArea viewport, or the window in page mode. */
  root?: Element | Document | null;
};

/**
 * Observe an element against a ScrollArea viewport (or window in page mode).
 * Must be used inside ScrollArea, or pass `root` explicitly.
 */
export function useScrollIntersection({
  onIntersect,
  onLeave,
  onChange,
  rootMargin = "0px",
  threshold = 0,
  enabled = true,
  root: rootOverride,
}: ScrollIntersectionOptions = {}) {
  const scrollArea = useScrollAreaContextOptional();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const handlersRef = useRef({ onIntersect, onLeave, onChange });
  handlersRef.current = { onIntersect, onLeave, onChange };

  const resolvedRoot =
    rootOverride !== undefined
      ? rootOverride
      : scrollArea
        ? scrollArea.page
          ? null
          : scrollArea.viewport
        : null;

  useEffect(() => {
    if (!enabled || !target || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          handlersRef.current.onChange?.(entry, entry.isIntersecting);
          if (entry.isIntersecting) {
            handlersRef.current.onIntersect?.(entry);
          } else {
            handlersRef.current.onLeave?.(entry);
          }
        }
      },
      { root: resolvedRoot, rootMargin, threshold },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, resolvedRoot, rootMargin, target, threshold]);

  const ref = useCallback((node: HTMLElement | null) => {
    setTarget(node);
  }, []);

  return ref;
}
