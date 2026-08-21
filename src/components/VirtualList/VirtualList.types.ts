import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/**
 * Props for the {@link VirtualList} component.
 *
 * Renders only visible rows for performant scrolling over large datasets.
 * Uses fixed row height for predictable layout. SSR-safe via `ssrCount`.
 *
 * @typeParam T - Item type in the data array.
 *
 * @example
 * ```tsx
 * <VirtualList
 *   items={transactions}
 *   itemHeight={44}
 *   height={400}
 *   getItemKey={(item) => item.id}
 *   renderItem={(item) => item.label}
 * />
 * ```
 */
export interface VirtualListProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Full array of data items to virtualize. */
  items: T[];
  /** Fixed height of each row in pixels. */
  itemHeight: number;
  /** Viewport (scroll container) height in pixels. */
  height: number;
  /**
   * Number of extra rows rendered above and below the visible viewport
   * to reduce flicker during fast scrolling.
   * @default 4
   */
  overscan?: number;
  /**
   * Render function called for each visible row.
   * @param item - The data item at this index.
   * @param index - Zero-based index in the full array.
   */
  renderItem: (item: T, index: number) => ReactNode;
  /**
   * Stable React key extractor. Falls back to array index when omitted.
   * @param item - The data item.
   * @param index - Zero-based index.
   */
  getItemKey?: (item: T, index: number) => string | number;
  /**
   * Number of items to render during server-side rendering when
   * scroll position is unknown. Prevents hydration mismatch.
   * @default 10
   */
  ssrCount?: number;
  /** Inline style overrides for the inner scrollable list container. */
  listStyle?: CSSProperties;
}
