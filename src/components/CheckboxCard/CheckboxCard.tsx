import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import type { CheckboxCardProps } from "./CheckboxCard.types";
import styles from "./CheckboxCard.module.css";

export const CheckboxCard = forwardRef<HTMLLabelElement, CheckboxCardProps>(function CheckboxCard(
  {
    className,
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    title,
    description,
    badge,
    children,
    motion: motionEnabled = true,
    onClick,
    ...rest
  },
  ref,
) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isChecked = checked ?? uncontrolled;
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion;

  return (
    <motion.label
      ref={ref}
      className={cn(
        styles.root,
        isChecked && styles.checked,
        disabled && styles.disabled,
        className,
      )}
      variants={pack.scaleIn}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      transition={pack.reveal}
      onClick={(event) => {
        onClick?.(event);
        if (disabled || event.defaultPrevented) return;
        const next = !isChecked;
        if (checked === undefined) setUncontrolled(next);
        onCheckedChange?.(next);
      }}
      {...rest}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={isChecked}
        disabled={disabled}
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

CheckboxCard.displayName = "CheckboxCard";
