import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type {
  FlexAlign,
  FlexDirection,
  FlexGap,
  FlexJustify,
  FlexProps,
  FlexWrap,
} from "./Flex.types";
import styles from "./Flex.module.css";

const DIR_CLASS: Record<FlexDirection, string | undefined> = {
  row: styles.dirRow,
  column: styles.dirColumn,
  "row-reverse": styles.dirRowReverse,
  "column-reverse": styles.dirColumnReverse,
};

const ALIGN_CLASS: Record<FlexAlign, string | undefined> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
  baseline: styles.alignBaseline,
};

const JUSTIFY_CLASS: Record<FlexJustify, string | undefined> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
  evenly: styles.justifyEvenly,
};

const GAP_CLASS: Record<FlexGap, string | undefined> = {
  none: styles.gapNone,
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
};

const WRAP_CLASS: Record<FlexWrap, string | undefined> = {
  nowrap: styles.wrapNowrap,
  wrap: styles.wrapWrap,
  "wrap-reverse": styles.wrapReverse,
};

/**
 * Flexbox layout primitive with direction, alignment, justify, gap, and wrap props.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    direction = "row",
    align = "stretch",
    justify = "start",
    gap = "none",
    wrap = "nowrap",
    inline = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        styles.root,
        inline && styles.inline,
        DIR_CLASS[direction],
        ALIGN_CLASS[align],
        JUSTIFY_CLASS[justify],
        GAP_CLASS[gap],
        WRAP_CLASS[wrap],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Flex.displayName = "Flex";
