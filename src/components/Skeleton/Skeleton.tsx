import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import type { SkeletonProps, SkeletonVariant } from "./Skeleton.types";
import styles from "./Skeleton.module.css";

const DEFAULT_HEIGHT: Record<SkeletonVariant, string> = {
  text: "1em",
  circular: "2.5rem",
  rectangular: "6rem",
  rounded: "8rem",
};

const SkeletonRoot = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    variant = "text",
    width = "100%",
    height,
    disableAnimation = false,
    className,
    style,
    "aria-hidden": ariaHidden = true,
    ...rest
  },
  ref,
) {
  const resolvedHeight = height ?? DEFAULT_HEIGHT[variant];
  const resolvedWidth = typeof width === "number" ? `${width}px` : width;
  const resolvedHeightCss =
    typeof resolvedHeight === "number" ? `${resolvedHeight}px` : resolvedHeight;

  return (
    <div
      ref={ref}
      role="status"
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : "Loading"}
      className={cn(
        styles.skeleton,
        styles[variant],
        disableAnimation && styles.static,
        className,
      )}
      style={{ width: resolvedWidth, height: resolvedHeightCss, ...style }}
      {...rest}
    />
  );
});
SkeletonRoot.displayName = "Skeleton";

function SkeletonProfile({ className }: { className?: string }) {
  return (
    <div className={cn(className)} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <SkeletonRoot variant="circular" width={40} height={40} />
      <div style={{ flex: 1, display: "grid", gap: "0.5rem" }}>
        <SkeletonRoot variant="text" width="40%" />
        <SkeletonRoot variant="text" width="70%" />
      </div>
    </div>
  );
}
SkeletonProfile.displayName = "Skeleton.Profile";

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "grid",
        gap: "0.75rem",
        padding: "1rem",
        border: "1px solid var(--asriui-color-border)",
        borderRadius: "var(--asriui-radius-md)",
      }}
    >
      <SkeletonRoot variant="text" width="35%" />
      <SkeletonRoot variant="rounded" height={80} />
      <SkeletonRoot variant="text" width="55%" />
    </div>
  );
}
SkeletonCard.displayName = "Skeleton.Card";

function SkeletonGroup({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
SkeletonGroup.displayName = "Skeleton.Group";

/** Animated loading placeholder with text, circular, rectangular, and rounded variants. */
export const Skeleton = Object.assign(SkeletonRoot, {
  Profile: SkeletonProfile,
  Card: SkeletonCard,
  Group: SkeletonGroup,
});
