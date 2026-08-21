import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Card, Icon, type IconName } from "../src";
import { appleGentle } from "../src/motion/presets";
import styles from "./FeatureCarousel.module.css";

export type FeatureSlide = {
  title: string;
  description: string;
  tag: string;
  icon: IconName;
};

type Props = {
  features: readonly FeatureSlide[];
};

export function FeatureCarousel({ features }: Props) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = features[index % features.length];

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + features.length) % features.length);
    },
    [features.length],
  );

  useEffect(() => {
    if (reducedMotion || paused || features.length <= 1) return;
    const timer = window.setInterval(() => goTo(index + 1), 5200);
    return () => window.clearInterval(timer);
  }, [features.length, goTo, index, paused, reducedMotion]);

  if (!active) return null;

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <motion.article
            key={active.title}
            className={styles.slide}
            initial={reducedMotion ? false : { opacity: 0, x: 36 }}
            animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -36 }}
            transition={appleGentle}
          >
            <Card className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={active.icon} size="md" />
                </span>
                <span className={styles.tag}>{active.tag}</span>
              </div>
              <Card.Header>
                <Card.Title>{active.title}</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className={styles.description}>{active.description}</p>
              </Card.Content>
            </Card>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(index - 1)}
          aria-label="Previous feature"
        >
          <Icon name="chevron-left" size="sm" />
        </button>

        <div className={styles.dots} role="tablist" aria-label="Features">
          {features.map((feature, i) => (
            <button
              key={feature.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={feature.title}
              className={i === index ? styles.dotActive : styles.dot}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(index + 1)}
          aria-label="Next feature"
        >
          <Icon name="chevron-right" size="sm" />
        </button>
      </div>

      <div className={styles.strip}>
        {features.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            className={i === index ? styles.stripItemActive : styles.stripItem}
            onClick={() => goTo(i)}
          >
            <span className={styles.stripIcon} aria-hidden="true">
              <Icon name={feature.icon} size="sm" />
            </span>
            <span>{feature.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
