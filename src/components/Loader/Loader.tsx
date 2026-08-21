import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { LoaderProps } from "./Loader.types";
import styles from "./Loader.module.css";

/**
 * Accessible loading indicator with spinner, dots, and ring variants.
 */
export const Loader = forwardRef<HTMLDivElement, LoaderProps>(function Loader(
  {
    variant = "spinner",
    size = "md",
    label = "Loading",
    showLabel = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const indicator =
    variant === "dots" ? (
      <span className={styles.dots} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </span>
    ) : (
      <span
        className={cn(variant === "ring" ? styles.ring : styles.spinner)}
        aria-hidden="true"
      />
    );

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className={cn(styles.root, styles[size], className)}
      {...rest}
    >
      <span className={styles.indicator}>{indicator}</span>
      {showLabel ? <p className={styles.label}>{label}</p> : null}
      {children}
    </div>
  );
});

Loader.displayName = "Loader";
