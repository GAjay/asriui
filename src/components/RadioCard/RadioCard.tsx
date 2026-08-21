import { forwardRef, useId, useState } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import { RadioCardGroupProvider, useRadioCardGroup } from "./RadioCardContext";
import type { RadioCardGroupProps, RadioCardProps } from "./RadioCard.types";
import styles from "./RadioCard.module.css";

const RadioCardItem = forwardRef<HTMLLabelElement, RadioCardProps>(function RadioCardItem(
  {
    className,
    value,
    title,
    description,
    badge,
    disabled,
    children,
    motion: motionEnabled = true,
    onClick,
    ...rest
  },
  ref,
) {
  const group = useRadioCardGroup();
  const isChecked = group?.value === value;
  const isDisabled = disabled ?? group?.disabled;
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion;

  return (
    <motion.label
      ref={ref}
      className={cn(
        styles.root,
        isChecked && styles.checked,
        isDisabled && styles.disabled,
        className,
      )}
      variants={pack.scaleIn}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      transition={pack.reveal}
      onClick={(event) => {
        onClick?.(event);
        if (isDisabled || event.defaultPrevented) return;
        group?.onValueChange?.(value);
      }}
      {...rest}
    >
      <input
        type="radio"
        className={styles.input}
        name={group?.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className={styles.header}>
        <div>
          {title ? <p className={styles.title}>{title}</p> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        <span className={styles.indicator} aria-hidden="true" />
      </div>
      {badge ? <div className={styles.badge}>{badge}</div> : null}
      {children ? <div className={styles.content}>{children}</div> : null}
    </motion.label>
  );
});
RadioCardItem.displayName = "RadioCard";

const RadioCardGroupRoot = forwardRef<HTMLDivElement, RadioCardGroupProps>(function RadioCardGroup(
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
    <RadioCardGroupProvider
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
    </RadioCardGroupProvider>
  );
});
RadioCardGroupRoot.displayName = "RadioCard.Group";

export const RadioCard = Object.assign(RadioCardItem, {
  Group: RadioCardGroupRoot,
});

export const RadioCardGroup = RadioCardGroupRoot;
