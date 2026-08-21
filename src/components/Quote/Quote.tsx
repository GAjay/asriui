import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import type { QuoteProps } from "./Quote.types";
import styles from "./Quote.module.css";

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(function Quote(
  { className, variant = "default", cite, footer, children, motion: motionEnabled = true, ...rest },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion;

  return (
    <motion.blockquote
      ref={ref}
      className={cn(styles.root, variant === "large" && styles.large, className)}
      variants={pack.fadeUp}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      transition={pack.reveal}
      cite={cite}
      {...rest}
    >
      <p className={styles.content}>{children}</p>
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      {cite && !footer ? <cite className={styles.cite}>{cite}</cite> : null}
    </motion.blockquote>
  );
});

Quote.displayName = "Quote";
