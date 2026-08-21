import type { HTMLAttributes, ReactNode } from "react";

/** Visual variants for {@link Badge}. */
export type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

/**
 * Props for the {@link Badge} status label.
 *
 * Renders an inline `<span>` suitable for counts, statuses, and tags.
 *
 * @example
 * ```tsx
 * <Badge variant="secondary">Processing</Badge>
 * ```
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style of the badge.
   * @default "default"
   */
  variant?: BadgeVariant;
  /** Badge text or child content. */
  children?: ReactNode;
}
