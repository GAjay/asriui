import { Children, forwardRef, isValidElement } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { appleGentle } from "../../motion/presets";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import type { GridGap, GridProps, GridStyleVars } from "./Grid.types";
import styles from "./Grid.module.css";

const GAP_CLASS: Record<GridGap, string | undefined> = {
  none: styles.gapNone,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
};

function toCssSize(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

function renderLayoutChildren(
  children: GridProps["children"],
  transition: GridProps["layoutTransition"],
) {
  return Children.map(children, (child, index) => {
    if (child == null || child === false) return null;

    const key = isValidElement(child) && child.key != null ? child.key : `grid-item-${index}`;

    return (
      <motion.div
        key={key}
        layout
        transition={transition ?? appleGentle}
        className={styles.item}
        data-layout-item=""
      >
        {child}
      </motion.div>
    );
  });
}

/**
 * Responsive CSS grid with fixed column and auto-fill variants.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    variant = "auto",
    columns = 2,
    minColumnWidth = "16rem",
    gap = "md",
    motion: motionProp,
    layoutTransition,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const motionEnabled = motionProp ?? variant === "auto";
  const animateLayout = motionEnabled && !reducedMotion;

  const cssVars: GridStyleVars = {
    "--grid-columns": String(columns),
    "--grid-min-col": toCssSize(minColumnWidth),
    ...style,
  };

  const content = animateLayout ? renderLayoutChildren(children, layoutTransition) : children;

  return (
    <LayoutGroup>
      <div
        ref={ref}
        className={cn(
          styles.root,
          variant === "fixed" ? styles.fixed : styles.auto,
          GAP_CLASS[gap],
          className,
        )}
        style={cssVars}
        data-layout={animateLayout ? "true" : undefined}
        {...rest}
      >
        {content}
      </div>
    </LayoutGroup>
  );
});

Grid.displayName = "Grid";
