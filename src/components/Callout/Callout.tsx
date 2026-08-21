import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import type { CalloutProps, CalloutVariant } from "./Callout.types";
import styles from "./Callout.module.css";

const defaultIcons: Record<CalloutVariant, string> = {
  info: "i",
  success: "✓",
  warning: "!",
  danger: "×",
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  {
    className,
    variant = "info",
    title,
    icon,
    children,
    motion: motionEnabled = true,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion;

  return (
    <motion.div
      ref={ref}
      className={cn(styles.root, styles[variant], className)}
      variants={pack.fadeUp}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      transition={pack.reveal}
      role="note"
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon ?? defaultIcons[variant]}
      </span>
      <div className={styles.body}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.content}>{children}</div> : null}
      </div>
    </motion.div>
  );
});

Callout.displayName = "Callout";
