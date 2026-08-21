import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { ContainerPadding, ContainerProps, ContainerSize } from "./Container.types";
import styles from "./Container.module.css";

const SIZE_CLASS: Record<ContainerSize, string | undefined> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  full: styles.sizeFull,
};

const PAD_CLASS: Record<ContainerPadding, string | undefined> = {
  none: styles.padNone,
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

/**
 * Constrains page content to a readable max width with optional horizontal padding.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  {
    size = "lg",
    padding = "md",
    centered = true,
    as: Comp = "div",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Comp
      ref={ref as never}
      className={cn(styles.root, SIZE_CLASS[size], PAD_CLASS[padding], centered && styles.centered, className)}
      {...(rest as object)}
    >
      {children}
    </Comp>
  );
});

Container.displayName = "Container";
