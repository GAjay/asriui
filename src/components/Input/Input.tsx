import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { useAxiomId } from "../../hooks/useAxiomId";
import { cn } from "../../utils/cn";
import type { InputProps } from "./Input.types";
import styles from "./Input.module.css";

/**
 * Text input with label, helper/error text, optional affixes, and entrance motion.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    helperText,
    error,
    prefix,
    suffix,
    disabled = false,
    required = false,
    motion: motionEnabled = true,
    className,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion;
  const generatedId = useAxiomId("input");
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [error ? errorId : null, !error && helperText ? helperId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <motion.div
      className={cn(styles.root, className)}
      variants={pack.fadeUp}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div
        className={cn(
          styles.control,
          Boolean(error) && styles.controlError,
          disabled && styles.controlDisabled,
        )}
      >
        {prefix ? <span className={styles.affix}>{prefix}</span> : null}
        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {suffix ? <span className={styles.affix}>{suffix}</span> : null}
      </div>

      {error ? (
        <motion.p
          id={errorId}
          className={cn(styles.message, styles.error)}
          role="alert"
          initial={animate ? { opacity: 0, y: -4 } : undefined}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
        >
          {error}
        </motion.p>
      ) : helperText ? (
        <p id={helperId} className={styles.message}>
          {helperText}
        </p>
      ) : null}
    </motion.div>
  );
});

Input.displayName = "Input";
