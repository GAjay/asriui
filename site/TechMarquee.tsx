import styles from "./TechMarquee.module.css";
import type { LandingBand } from "./landingBandTypes";
import { SectionContextMenu } from "./SectionContextMenu";
import { SECTION_LAYOUTS } from "./sectionLayouts";

const TECH = [
  "React 18",
  "TypeScript",
  "Framer Motion",
  "Vite",
  "Vitest",
  "Storybook",
  "CSS Modules",
  "Tree-shaking",
  "SSR",
  "GTM",
  "Monaco",
  "React Flow",
  "Work Sans",
  "AxiomUI",
] as const;

export type { LandingBand } from "./landingBandTypes";

type TechMarqueeProps = {
  band?: LandingBand;
};

function MarqueeItems({ suffix }: { suffix: string }) {
  return (
    <>
      {TECH.map((item) => (
        <span key={`${item}-${suffix}`} className={styles.item}>
          {item}
        </span>
      ))}
    </>
  );
}

export function TechMarquee({ band = "white" }: TechMarqueeProps) {
  return (
    <section className={styles.section} data-band={band} aria-label="Technologies">
      <SectionContextMenu layoutCode={SECTION_LAYOUTS.marquee} />
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />
      <div className={styles.viewport}>
        <div className={styles.track}>
          <div className={styles.group}>
            <MarqueeItems suffix="a" />
          </div>
          <div className={styles.group} aria-hidden="true">
            <MarqueeItems suffix="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
