import type { CSSProperties, HTMLAttributes } from "react";

/** Shape preset for {@link Skeleton}. */
export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

/**
 * Props for the {@link Skeleton} loading placeholder.
 *
 * Renders an animated pulse placeholder while content loads.
 * Compose multiple skeletons to build card, list, or profile layouts.
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width="60%" />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rounded" height={120} />
 * ```
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Shape preset controlling border-radius.
   * @default "text"
   */
  variant?: SkeletonVariant;
  /**
   * Width as number (px) or CSS string.
   * @default "100%"
   */
  width?: number | string;
  /**
   * Height as number (px) or CSS string.
   * @default variant-dependent
   */
  height?: number | string;
  /**
   * Disables the pulse animation (e.g. when prefers-reduced-motion).
   * @default false
   */
  disableAnimation?: boolean;
  /** Inline style overrides. */
  style?: CSSProperties;
}
