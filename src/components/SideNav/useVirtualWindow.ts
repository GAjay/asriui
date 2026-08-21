import { useMemo } from "react";

const IS_BROWSER = typeof window !== "undefined";

export function useVirtualWindow({
  itemCount,
  itemHeight,
  height,
  overscan = 4,
  scrollTop,
  ssrCount = 10,
}: {
  itemCount: number;
  itemHeight: number;
  height: number;
  overscan?: number;
  scrollTop: number;
  ssrCount?: number;
}) {
  return useMemo(() => {
    if (!IS_BROWSER) {
      const count = Math.min(ssrCount, itemCount);
      return { start: 0, end: count, totalHeight: itemCount * itemHeight };
    }

    const visible = Math.ceil(height / itemHeight);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(itemCount, start + visible + overscan * 2);

    return { start, end, totalHeight: itemCount * itemHeight };
  }, [height, itemCount, itemHeight, overscan, scrollTop, ssrCount]);
}
