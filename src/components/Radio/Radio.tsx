import { forwardRef, useId, useState } from "react";
import { cn } from "../../utils/cn";
import { RadioGroupProvider, useRadioGroup } from "./RadioContext";
import type { RadioGroupProps, RadioProps } from "./Radio.types";
import styles from "./Radio.module.css";

const RadioControl = forwardRef<HTMLInputElement, RadioProps>(function RadioControl(
  { className, value, label, description, disabled, id, onChange, ...rest },
  ref,
) {
  const group = useRadioGroup();
  const [standaloneChecked, setStandaloneChecked] = useState(false);
  const checked = group ? group.value === value : standaloneChecked;
  const isDisabled = disabled ?? group?.disabled;

  return (
    <label className={cn(styles.root, isDisabled && styles.disabled, className)}>
      <span className={styles.control}>
        <input
          ref={ref}
          id={id}
          type="radio"
          className={styles.input}
          name={group?.name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={(event) => {
            onChange?.(event);
            if (group) {
              group.onValueChange?.(value);
              return;
            }
            setStandaloneChecked(true);
          }}
          {...rest}
        />
        <span className={styles.circle} aria-hidden="true" />
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
RadioControl.displayName = "Radio";

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    className,
    name,
    value,
    defaultValue = "",
    onValueChange,
    disabled = false,
    children,
    ...rest
  },
  ref,
) {
  const generatedName = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const currentValue = value ?? uncontrolled;

  return (
    <RadioGroupProvider
      value={{
        name: name ?? generatedName,
        value: currentValue,
        disabled,
        onValueChange: (next) => {
          if (value === undefined) setUncontrolled(next);
          onValueChange?.(next);
        },
      }}
    >
      <div ref={ref} role="radiogroup" className={cn(styles.group, className)} {...rest}>
        {children}
      </div>
    </RadioGroupProvider>
  );
});
RadioGroupRoot.displayName = "RadioGroup";

export const Radio = Object.assign(RadioControl, {
  Group: RadioGroupRoot,
});

export const RadioGroup = RadioGroupRoot;
