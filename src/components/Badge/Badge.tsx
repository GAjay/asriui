import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { BadgeProps } from "./Badge.types";
import styles from "./Badge.module.css";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn(styles.badge, styles[variant], className)} {...rest}>
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
