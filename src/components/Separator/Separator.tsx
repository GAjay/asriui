import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { SeparatorProps } from "./Separator.types";
import styles from "./Separator.module.css";

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { className, orientation = "horizontal", decorative = true, label, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-label={decorative ? undefined : label}
      className={cn(
        styles.root,
        orientation === "vertical" ? styles.vertical : styles.horizontal,
        className,
      )}
      {...rest}
    />
  );
});

Separator.displayName = "Separator";
