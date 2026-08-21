import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Icon, type IconName } from "../src/components/Icon";
import { AnimatedNumber } from "./AnimatedNumber";
import { COMPONENT_COUNT } from "./landingNavData";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";
import styles from "./FeaturesShowcase.module.css";

export type FeatureItem = {
  title: string;
  description: string;
  tag: string;
  icon: IconName;
  highlight?: string;
};

type Props = {
  features: readonly FeatureItem[];
};

const ease = [0.22, 1, 0.36, 1] as const;

const ACCESSIBILITY_POINTS = [
  "ARIA roles on every component",
  "Keyboard navigation & focus traps",
  "Screen reader labels built in",
  "Respects prefers-reduced-motion",
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
};

export function FeaturesShowcase({ features }: Props) {
  const reducedMotion = useReducedMotion();
  const [hero, ...rest] = features;

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.stats} aria-label="AxiomUI highlights">
          <div className={styles.stat}>
            <strong>
              <AnimatedNumber value={features.length} />
            </strong>
            <span>pillars</span>
          </div>
          <div className={styles.stat}>
            <strong>
              <AnimatedNumber value={COMPONENT_COUNT} suffix="+" />
            </strong>
            <span>components</span>
          </div>
          <div className={styles.stat}>
            <strong>WCAG</strong>
            <span>accessible</span>
          </div>
          <div className={styles.stat}>
            <strong>MIT</strong>
            <span>licensed</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/docs/getting-started" className={styles.primaryLink}>
            Get started
          </Link>
          <Link to="/docs/components/button" className={styles.ghostLink}>
            Component index
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>
      </div>

      <motion.div
        className={styles.bento}
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={SCROLL_REPLAY_VIEWPORT}
        variants={containerVariants}
      >
        {hero ? (
          <motion.article className={`${styles.card} ${styles.heroCard}`} variants={itemVariants}>
            <div className={styles.cardInner}>
              <div className={styles.cardHead}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon name={hero.icon} size="lg" />
                </span>
                <span className={styles.tag}>{hero.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{hero.title}</h3>
              <p className={styles.cardDesc}>{hero.description}</p>
              {hero.highlight ? <p className={styles.cardHighlight}>{hero.highlight}</p> : null}
              <ul className={styles.checkList} aria-label="Accessibility features">
                {ACCESSIBILITY_POINTS.map((point) => (
                  <li key={point}>
                    <Icon name="check" size="sm" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ) : null}

        {rest.map((feature) => (
          <motion.article key={feature.title} className={styles.card} variants={itemVariants}>
            <div className={styles.cardInner}>
              <div className={styles.cardHead}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon name={feature.icon} size="md" />
                </span>
                <span className={styles.tag}>{feature.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
              {feature.highlight ? <p className={styles.cardHighlight}>{feature.highlight}</p> : null}
            </div>
          </motion.article>
        ))}

        <motion.div className={styles.ctaWrap} variants={itemVariants}>
          <Link to="/docs" className={styles.ctaCard}>
            <span className={styles.ctaIcon} aria-hidden="true">
              <Icon name="chevron-right" size="lg" />
            </span>
            <span className={styles.ctaTitle}>Explore all components</span>
            <span className={styles.ctaMeta}>Docs, live examples & API reference</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
