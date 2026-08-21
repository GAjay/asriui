import { forwardRef, useState } from "react";
import { cn } from "../../utils/cn";
import type { SwitchProps } from "./Switch.types";
import styles from "./Switch.module.css";

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isChecked = checked ?? uncontrolled;

  function toggle() {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) setUncontrolled(next);
    onCheckedChange?.(next);
  }

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      className={cn(styles.switch, isChecked && styles.checked, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
      {...rest}
    >
      <span className={styles.thumb} aria-hidden="true" />
    </button>
  );
});

Switch.displayName = "Switch";
