import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    className,
    label,
    description,
    indeterminate = false,
    id,
    onChange,
    ...rest
  },
  ref,
) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isChecked = checked ?? uncontrolled;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={cn(styles.root, disabled && styles.disabled, className)}>
      <span className={styles.control}>
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          id={id}
          type="checkbox"
          className={styles.input}
          checked={isChecked}
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            const next = event.target.checked;
            if (checked === undefined) setUncontrolled(next);
            onCheckedChange?.(next);
          }}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true">
          <svg className={cn(styles.mark, styles.check)} viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.2 5 8.7 9.5 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={cn(styles.mark, styles.dash)} />
        </span>
      </span>
      {label || description ? (
        <span className={styles.copy}>
          {label ? <span className={styles.label}>{label}</span> : null}
          {description ? <span className={styles.description}>{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
