import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { AspectRatioProps } from "./AspectRatio.types";
import styles from "./AspectRatio.module.css";

/**
 * Constrains children to a fixed width/height ratio — ideal for images and video.
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
  { ratio, className, style, children, ...rest },
  ref,
) {
  const paddingTop = `${100 / ratio}%`;

  return (
    <div
      ref={ref}
      className={cn(styles.root, className)}
      style={{ paddingTop, ...style }}
      {...rest}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
});

AspectRatio.displayName = "AspectRatio";
