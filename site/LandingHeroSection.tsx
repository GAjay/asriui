import type { ReactNode } from "react";
import { cn } from "../src/utils/cn";
import { SectionContextMenu } from "./SectionContextMenu";
import { RevealSection } from "./RevealSection";
import { SectionKicker, type SectionAccent } from "./SectionKicker";
import styles from "./LandingHeroSection.module.css";

export type LandingHeroSectionProps = {
  id?: string;
  kicker?: string;
  title?: string;
  lead?: string;
  headerExtras?: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: "white" | "black";
  align?: "center" | "start";
  /** Kicker dot accent — alternate across sections for visual rhythm. */
  accent?: SectionAccent;
  /** Full viewport height sections. Use compact for short bands. */
  size?: "hero" | "compact";
  delay?: number;
  /** AsriUI snippet copied from this section. */
  layoutCode?: string;
};

const TONE_CLASS = {
  white: styles.toneWhite ?? "",
  black: styles.toneBlack ?? "",
} satisfies Record<NonNullable<LandingHeroSectionProps["tone"]>, string>;

export function LandingHeroSection({
  id,
  kicker,
  title,
  lead,
  headerExtras,
  children,
  className,
  tone = "white",
  align = "center",
  accent = "emerald",
  size = "hero",
  delay,
  layoutCode,
}: LandingHeroSectionProps) {
  const hasHeader = Boolean(kicker || title || lead || headerExtras);

  return (
    <RevealSection
      id={id}
      delay={delay}
      data-band={tone}
      className={cn(
        styles.section,
        TONE_CLASS[tone],
        size === "hero" ? styles.sizeHero : styles.sizeCompact,
        className,
      )}
    >
      {layoutCode ? <SectionContextMenu layoutCode={layoutCode} /> : null}
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        {hasHeader ? (
          <header
            className={cn(styles.header, align === "center" ? styles.headerCenter : styles.headerStart)}
          >
            {kicker ? (
              <SectionKicker accent={accent} className={styles.sectionKicker}>
                {kicker}
              </SectionKicker>
            ) : null}
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {lead ? <p className={styles.lead}>{lead}</p> : null}
            {headerExtras ? (
              <div className={align === "center" ? styles.headerExtrasCenter : styles.headerExtrasStart}>
                {headerExtras}
              </div>
            ) : null}
          </header>
        ) : null}
        {children ? <div className={styles.body}>{children}</div> : null}
      </div>
    </RevealSection>
  );
}
