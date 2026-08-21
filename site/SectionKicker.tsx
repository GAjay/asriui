import type { ReactNode } from "react";
import { cn } from "../src/utils/cn";
import styles from "./SectionKicker.module.css";

export type SectionAccent = "emerald" | "sky" | "amber" | "violet" | "rose" | "cyan";

const ACCENT_CLASS = {
  emerald: styles.accentEmerald ?? "",
  sky: styles.accentSky ?? "",
  amber: styles.accentAmber ?? "",
  violet: styles.accentViolet ?? "",
  rose: styles.accentRose ?? "",
  cyan: styles.accentCyan ?? "",
} satisfies Record<SectionAccent, string>;

type Props = {
  accent?: SectionAccent;
  children: ReactNode;
  className?: string;
  /** Uppercase kicker label. @default true */
  caps?: boolean;
};

export function SectionKicker({ accent = "emerald", children, className, caps = true }: Props) {
  return (
    <p className={cn(styles.kicker, ACCENT_CLASS[accent], className)}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={cn(styles.label, !caps && styles.labelNormal)}>{children}</span>
    </p>
  );
}
