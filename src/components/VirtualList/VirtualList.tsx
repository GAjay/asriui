import { forwardRef, useCallback, useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import type { VirtualListProps } from "./VirtualList.types";
import styles from "./VirtualList.module.css";

const IS_BROWSER = typeof window !== "undefined";

/**
 * High-performance virtualized list with fixed row height, overscan, and SSR-safe rendering.
 */
export const VirtualList = forwardRef(function VirtualList<T>(
  {
    items,
    itemHeight,
    height,
    overscan = 4,
    renderItem,
    getItemKey,
    ssrCount = 10,
    className,
    listStyle,
    style,
    ...rest
  }: VirtualListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  const { start, end } = useMemo(() => {
    if (!IS_BROWSER) {
      const count = Math.min(ssrCount, items.length);
      return { start: 0, end: count };
    }
    const visible = Math.ceil(height / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(items.length, startIndex + visible + overscan * 2);
    return { start: startIndex, end: endIndex };
  }, [height, itemHeight, items.length, overscan, scrollTop, ssrCount]);

  const visibleItems = useMemo(
    () => items.slice(start, end).map((item, i) => ({ item, index: start + i })),
    [end, items, start],
  );

  const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.list, className)}
      style={{ height, ...style }}
      onScroll={IS_BROWSER ? onScroll : undefined}
      role="list"
      {...rest}
    >
      {items.length === 0 ? (
        <div className={styles.empty}>No items</div>
      ) : (
        <div className={styles.inner} style={{ height: totalHeight, ...listStyle }}>
          {visibleItems.map(({ item, index }) => (
            <div
              key={getItemKey ? getItemKey(item, index) : index}
              className={styles.row}
              style={{ height: itemHeight, transform: `translateY(${index * itemHeight}px)` }}
              role="listitem"
            >
              <div className={styles.rowContent}>{renderItem(item, index)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}) as <T>(
  props: VirtualListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement | null;

(VirtualList as { displayName?: string }).displayName = "VirtualList";
