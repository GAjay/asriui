import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import type { HiddenProps, VisibleProps } from "./Visible.types";
import styles from "./Visible.module.css";

export const Visible = forwardRef<HTMLDivElement, VisibleProps>(function Visible(
  { when, keepMounted = false, animate = true, children },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animate && !reducedMotion;

  if (!when && !keepMounted) return null;

  if (!shouldAnimate) {
    return (
      <div ref={ref} className={cn(styles.root, !when && styles.hidden)} hidden={!when} aria-hidden={!when}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(styles.root, !when && styles.collapsed)}
      initial={false}
      animate={{
        opacity: when ? 1 : 0,
        height: when ? "auto" : 0,
        marginTop: when ? undefined : 0,
        marginBottom: when ? undefined : 0,
      }}
      transition={{ duration: 0.2 }}
      aria-hidden={!when}
      style={{ display: when || keepMounted ? undefined : "none" }}
    >
      {when || keepMounted ? children : null}
    </motion.div>
  );
});
Visible.displayName = "Visible";

export const Hidden = forwardRef<HTMLDivElement, HiddenProps>(function Hidden(
  { when, keepMounted = false, animate = true, children },
  ref,
) {
  return (
    <Visible ref={ref} when={!when} keepMounted={keepMounted} animate={animate}>
      {children}
    </Visible>
  );
});
Hidden.displayName = "Hidden";
