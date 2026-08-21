import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useAsriUIConfigOptional } from "../../config/AsriUIContext";
import { trackButtonClick } from "../../config/analytics";
import { resolveMotionProps } from "../../motion/presets";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

/**
 * Accessible button with variants, sizes, loading state, and Apple-style spring motion.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    radius = "md",
    loading = false,
    disabled = false,
    motion: motionEnabled = true,
    type = "button",
    className,
    children,
    onClick,
    track,
    trackEvent,
    trackLabel,
    trackPayload,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion && !isDisabled;
  const asriuiConfig = useAsriUIConfigOptional();

  const handleClick: ButtonProps["onClick"] = (event) => {
    if (isDisabled) return;
    onClick?.(event);
    if (!event.defaultPrevented && asriuiConfig) {
      trackButtonClick(
        asriuiConfig.analytics,
        {
          label: trackLabel ?? (typeof children === "string" ? children : undefined),
          variant,
          id: rest.id,
        },
        { track, trackEvent, trackLabel, trackPayload },
      );
    }
  };

  const radiusClass =
    radius === "none"
      ? styles.radiusNone
      : radius === "sm"
        ? styles.radiusSm
        : radius === "lg"
          ? styles.radiusLg
          : radius === "full"
            ? styles.radiusFull
            : styles.radiusMd;

  return (
    <motion.button
      ref={ref}
      type={type}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        radiusClass,
        loading && styles.loading,
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      onClick={handleClick}
      {...resolveMotionProps(animate, {
        whileHover: pack.hover,
        whileTap: pack.tap,
        transition: pack.spring,
      })}
      {...rest}
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true">
            <motion.span
              className={styles.spinnerIcon}
              animate={animate ? { rotate: 360 } : undefined}
              transition={
                animate
                  ? { duration: 0.8, repeat: Infinity, ease: "linear" }
                  : undefined
              }
            />
          </span>
          <span className={styles.labelHidden}>{children}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = "Button";
