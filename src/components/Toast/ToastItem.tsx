import { useEffect, useRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { useToastContextOptional } from "./ToastContext";
import type { ToastItemProps } from "./Toast.types";
import { resolveToastAppearance, toastAppearanceStyle, DEFAULT_TOAST_VARIANTS } from "./toastVariants";
import styles from "./Toast.module.css";

function getMotionOffset(position: ToastItemProps["position"]) {
  if (position.includes("top")) return { y: -16, x: 0 };
  if (position.includes("bottom")) return { y: 16, x: 0 };
  return { y: 0, x: 0 };
}

export function ToastItem({ toast, onDismiss, position, showProgress, classNames }: ToastItemProps) {
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const context = useToastContextOptional();
  const animate = globalMotion && !reducedMotion;
  const timerRef = useRef<number | null>(null);
  const variant = toast.variant ?? "default";
  const duration = toast.duration ?? 5000;
  const offset = getMotionOffset(position);
  const progressVisible = showProgress && duration > 0;
  const appearance = resolveToastAppearance(
    toast,
    context?.variants ?? DEFAULT_TOAST_VARIANTS,
    styles.icon,
  );
  const slotClassNames = classNames ?? context?.classNames;
  const surfaceStyle = toastAppearanceStyle(appearance);

  useEffect(() => {
    if (duration <= 0) return undefined;

    timerRef.current = window.setTimeout(() => onDismiss(toast.id), duration);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [duration, onDismiss, toast.id]);

  const handleAction = () => {
    toast.action?.onClick();
    if (toast.action?.dismissOnClick !== false) {
      onDismiss(toast.id);
    }
  };

  return (
    <motion.div
      layout={animate}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(styles.toast, styles[variant], slotClassNames?.toast)}
      style={
        progressVisible
          ? ({ ...surfaceStyle, "--toast-duration": `${duration}ms` } as CSSProperties)
          : surfaceStyle
      }
      initial={animate ? { opacity: 0, scale: 0.96, ...offset } : undefined}
      animate={animate ? { opacity: 1, scale: 1, x: 0, y: 0 } : undefined}
      exit={
        animate
          ? {
              opacity: 0,
              scale: 0.95,
              ...offset,
              transition: { duration: 0.18, ease: "easeIn" },
            }
          : undefined
      }
      transition={pack.reveal}
      drag={animate ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 72 || Math.abs(info.velocity.x) > 420) {
          onDismiss(toast.id);
        }
      }}
    >
      <span className={cn(styles.iconWrap, slotClassNames?.icon)}>{appearance.icon}</span>
      <div className={cn(styles.body, slotClassNames?.body)}>
        {toast.title ? <p className={cn(styles.title, slotClassNames?.title)}>{toast.title}</p> : null}
        {toast.description ? <p className={cn(styles.description, slotClassNames?.description)}>{toast.description}</p> : null}
        {toast.action ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className={styles.actionButton}
            onClick={handleAction}
          >
            {toast.action.label}
          </Button>
        ) : null}
      </div>
      <button
        type="button"
        className={styles.closeButton}
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      {progressVisible ? <span className={cn(styles.progress, slotClassNames?.progress)} aria-hidden="true" /> : null}
    </motion.div>
  );
}
