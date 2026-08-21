import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { LabelProps } from "./Label.types";
import styles from "./Label.module.css";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, children, required = false, ...rest },
  ref,
) {
  return (
    <label ref={ref} className={cn(styles.label, className)} {...rest}>
      {children}
      {required ? (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
});

Label.displayName = "Label";
