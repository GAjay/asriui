import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "../src/utils/cn";
import { useSiteTheme } from "./useSiteTheme";
import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  className?: string;
  /** Pixel size of the mark. @default 26 */
  size?: number;
  /** Accessible name when the mark is used alone. */
  label?: string;
};

export const LETTER =
  "M24 11 14.5 37 18.25 37 21 29.5 24 11 27 29.5 29.75 37 33.5 37Z";

export type MarkPalette = {
  plate: string;
  plateAccent: string;
  letter: string;
};

/** Light surfaces → dark mark. Dark theme / black bands → white mark. */
export function markPalette(theme: "light" | "dark", onBlackBand: boolean): MarkPalette {
  const lightMark = theme === "dark" || onBlackBand;
  if (lightMark) {
    return {
      plate: "#ffffff",
      plateAccent: "#e4e4e7",
      letter: "#09090b",
    };
  }
  return {
    plate: "#09090b",
    plateAccent: "#18181b",
    letter: "#ffffff",
  };
}

export function BrandMark({ className, size = 26, label }: BrandMarkProps) {
  const { theme } = useSiteTheme();
  const markRef = useRef<HTMLSpanElement>(null);
  const [onBlackBand, setOnBlackBand] = useState(false);
  const dimension = Math.max(12, Math.round(size));

  useLayoutEffect(() => {
    const node = markRef.current;
    if (!node) return;
    setOnBlackBand(Boolean(node.closest('[data-band="black"]')));
  }, []);

  const colors = markPalette(theme, onBlackBand);

  return (
    <span
      ref={markRef}
      className={cn(styles.mark, className)}
      style={{ width: dimension, height: dimension, minWidth: dimension, minHeight: dimension } as CSSProperties}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <svg
        viewBox="0 0 48 48"
        width={dimension}
        height={dimension}
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        aria-hidden="true"
      >
        <rect width="24" height="48" fill={colors.plate} />
        <rect x="24" width="24" height="48" fill={colors.plateAccent} />
        <path d={LETTER} fill={colors.letter} shapeRendering="geometricPrecision" />
      </svg>
    </span>
  );
}
