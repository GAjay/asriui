import { useCallback, useEffect, useState, type RefObject } from "react";
import type { ScrollMetrics } from "./ScrollArea.types";

const EMPTY_METRICS: ScrollMetrics = {
  scrollTop: 0,
  scrollLeft: 0,
  scrollHeight: 0,
  scrollWidth: 0,
  clientHeight: 0,
  clientWidth: 0,
};

function readWindowMetrics(): ScrollMetrics {
  const doc = document.documentElement;
  return {
    scrollTop: window.scrollY,
    scrollLeft: window.scrollX,
    scrollHeight: doc.scrollHeight,
    scrollWidth: doc.scrollWidth,
    clientHeight: window.innerHeight,
    clientWidth: window.innerWidth,
  };
}

function readElementMetrics(element: HTMLElement): ScrollMetrics {
  return {
    scrollTop: element.scrollTop,
    scrollLeft: element.scrollLeft,
    scrollHeight: element.scrollHeight,
    scrollWidth: element.scrollWidth,
    clientHeight: element.clientHeight,
    clientWidth: element.clientWidth,
  };
}

export function useScrollMetrics(
  viewportRef: RefObject<HTMLElement | null>,
  page: boolean,
) {
  const [metrics, setMetrics] = useState<ScrollMetrics>(EMPTY_METRICS);

  const update = useCallback(() => {
    if (page) {
      if (typeof window === "undefined") return;
      setMetrics(readWindowMetrics());
      return;
    }

    const element = viewportRef.current;
    if (!element) return;
    setMetrics(readElementMetrics(element));
  }, [page, viewportRef]);

  useEffect(() => {
    update();

    if (page) {
      if (typeof window === "undefined") return undefined;

      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);

      let observer: ResizeObserver | undefined;
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(update);
        observer.observe(document.documentElement);
        if (document.body) observer.observe(document.body);
      }

      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        observer?.disconnect();
      };
    }

    const element = viewportRef.current;
    if (!element) return undefined;

    element.addEventListener("scroll", update, { passive: true });

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update);
      observer.observe(element);
    }

    return () => {
      element.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, [page, update, viewportRef]);

  const scrollTo = useCallback(
    (next: Partial<Pick<ScrollMetrics, "scrollTop" | "scrollLeft">>) => {
      if (page) {
        window.scrollTo({
          top: next.scrollTop ?? window.scrollY,
          left: next.scrollLeft ?? window.scrollX,
          behavior: "auto",
        });
        return;
      }

      const element = viewportRef.current;
      if (!element) return;

      if (next.scrollTop !== undefined) element.scrollTop = next.scrollTop;
      if (next.scrollLeft !== undefined) element.scrollLeft = next.scrollLeft;
    },
    [page, viewportRef],
  );

  return { metrics, update, scrollTo };
}
