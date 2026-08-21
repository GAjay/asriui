import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useMotionPresetsOptional } from "../../motion/MotionContext";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import { formatMetricChange, formatMetricValue, resolveMetricTrend } from "./formatMetric";
import { MetricProvider, useMetricContext } from "./MetricContext";
import type {
  MetricChangeProps,
  MetricExtraProps,
  MetricHintProps,
  MetricLabelProps,
  MetricProps,
  MetricSymbolProps,
  MetricTrend,
  MetricValueProps,
} from "./Metric.types";
import styles from "./Metric.module.css";

function trendClassName(trend?: MetricTrend) {
  if (trend === "up") return styles.trendUp;
  if (trend === "down") return styles.trendDown;
  return styles.trendNeutral;
}

const MetricRoot = forwardRef<HTMLDivElement, MetricProps>(function Metric(
  {
    className,
    classNames,
    variant = "tile",
    trend,
    live = false,
    motion: motionEnabled = true,
    children,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const { pack, enabled: globalMotion } = useMotionPresetsOptional();
  const animate = motionEnabled && globalMotion && !reducedMotion;

  const contextValue = useMemo(() => ({ trend, live }), [live, trend]);

  return (
    <MetricProvider value={contextValue}>
      <motion.div
        ref={ref}
        className={cn(
          styles.root,
          variant === "compact" && styles.compact,
          variant === "quote" && styles.quote,
          classNames?.root,
          className,
        )}
        variants={pack.fadeUp}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        transition={pack.reveal}
        data-live={live || undefined}
        {...rest}
      >
        {children}
      </motion.div>
    </MetricProvider>
  );
});
MetricRoot.displayName = "Metric";

const MetricSymbol = forwardRef<HTMLSpanElement, MetricSymbolProps>(function MetricSymbol(
  { className, children, ...rest },
  ref,
) {
  const { live } = useMetricContext();

  return (
    <span className={styles.symbolRow}>
      {live ? <span className={styles.live} aria-hidden="true" /> : null}
      <span ref={ref} className={cn(styles.symbol, className)} {...rest}>
        {children}
      </span>
    </span>
  );
});
MetricSymbol.displayName = "Metric.Symbol";

const MetricLabel = forwardRef<HTMLParagraphElement, MetricLabelProps>(function MetricLabel(
  { className, children, ...rest },
  ref,
) {
  return (
    <p ref={ref} className={cn(styles.label, className)} {...rest}>
      {children}
    </p>
  );
});
MetricLabel.displayName = "Metric.Label";

const MetricValue = forwardRef<HTMLParagraphElement, MetricValueProps>(function MetricValue(
  {
    className,
    value,
    format,
    currency,
    locale,
    minimumFractionDigits,
    maximumFractionDigits,
    children,
    ...rest
  },
  ref,
) {
  const context = useMetricContext();
  const resolvedFormat = format ?? context.format ?? "number";
  const resolvedCurrency = currency ?? context.currency ?? "USD";
  const resolvedLocale = locale ?? context.locale ?? "en-US";
  const content =
    children ??
    (value !== undefined
      ? formatMetricValue(value, {
          format: resolvedFormat,
          currency: resolvedCurrency,
          locale: resolvedLocale,
          minimumFractionDigits,
          maximumFractionDigits,
        })
      : null);

  return (
    <p
      ref={ref}
      className={cn(styles.value, trendClassName(context.trend), className)}
      {...rest}
    >
      {content}
    </p>
  );
});
MetricValue.displayName = "Metric.Value";

const MetricChange = forwardRef<HTMLSpanElement, MetricChangeProps>(function MetricChange(
  {
    className,
    value,
    format = "percent",
    currency,
    locale,
    trend,
    showSign = true,
    minimumFractionDigits,
    maximumFractionDigits,
    children,
    ...rest
  },
  ref,
) {
  const context = useMetricContext();
  const resolvedTrend = trend ?? (value !== undefined ? resolveMetricTrend(value) : context.trend);
  const resolvedCurrency = currency ?? context.currency ?? "USD";
  const resolvedLocale = locale ?? context.locale ?? "en-US";
  const content =
    children ??
    (value !== undefined
      ? formatMetricChange(value, {
          format,
          currency: resolvedCurrency,
          locale: resolvedLocale,
          showSign,
          minimumFractionDigits,
          maximumFractionDigits,
        })
      : null);

  return (
    <span ref={ref} className={cn(styles.change, trendClassName(resolvedTrend), className)} {...rest}>
      {content}
    </span>
  );
});
MetricChange.displayName = "Metric.Change";

const MetricHint = forwardRef<HTMLParagraphElement, MetricHintProps>(function MetricHint(
  { className, children, ...rest },
  ref,
) {
  return (
    <p ref={ref} className={cn(styles.hint, className)} {...rest}>
      {children}
    </p>
  );
});
MetricHint.displayName = "Metric.Hint";

const MetricExtra = forwardRef<HTMLDivElement, MetricExtraProps>(function MetricExtra(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.extra, className)} {...rest}>
      {children}
    </div>
  );
});
MetricExtra.displayName = "Metric.Extra";

export const Metric = Object.assign(MetricRoot, {
  Symbol: MetricSymbol,
  Label: MetricLabel,
  Value: MetricValue,
  Change: MetricChange,
  Hint: MetricHint,
  Extra: MetricExtra,
});
