import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import type { SideNavVirtualListProps } from "./SideNav.types";
import { useVirtualWindow } from "./useVirtualWindow";
import styles from "./SideNav.module.css";

const IS_BROWSER = typeof window !== "undefined";

export const SideNavVirtualList = forwardRef(function SideNavVirtualList<T>(
  {
    className,
    nested = false,
    items,
    itemHeight,
    height,
    overscan = 4,
    ssrCount = 10,
    getItemKey,
    renderItem,
    emptyMessage = "No items",
    style,
    ...rest
  }: SideNavVirtualListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [scrollTop, setScrollTop] = useState(0);

  const { start, end, totalHeight } = useVirtualWindow({
    itemCount: items.length,
    itemHeight,
    height,
    overscan,
    scrollTop,
    ssrCount,
  });

  const visibleItems = useMemo(
    () => items.slice(start, end).map((item, index) => ({ item, index: start + index })),
    [end, items, start],
  );

  const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.virtualList, className)}
      style={{ height, ...style }}
      onScroll={IS_BROWSER ? onScroll : undefined}
      {...rest}
    >
      {items.length === 0 ? (
        <p className={styles.virtualListEmpty}>{emptyMessage}</p>
      ) : (
        <ul
          className={cn(styles.list, nested && styles.nestedList, styles.virtualListInner)}
          style={{ height: totalHeight }}
        >
          {visibleItems.map(({ item, index }) => (
            <li
              key={getItemKey ? getItemKey(item, index) : index}
              className={styles.virtualRow}
              style={{
                height: itemHeight,
                transform: `translateY(${index * itemHeight}px)`,
              }}
            >
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}) as <T>(
  props: SideNavVirtualListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReactElement | null;

(SideNavVirtualList as { displayName?: string }).displayName = "SideNav.VirtualList";
