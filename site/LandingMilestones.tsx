import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Icon, Timeline } from "../src";
import { AnimatedNumber } from "./AnimatedNumber";
import { ROADMAP_MILESTONES } from "./docs/roadmapData";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";
import styles from "./LandingMilestones.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const TIMELINE_ITEMS = ROADMAP_MILESTONES.map((item) => ({
  id: item.id,
  title: item.title,
  date: item.date,
  status: item.status,
  description: item.description,
}));

function statusLabel(status: string) {
  if (status === "complete") return "Shipped";
  if (status === "active") return "In progress";
  return "Planned";
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const itemMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export function LandingMilestones() {
  const reducedMotion = useReducedMotion();
  const active = ROADMAP_MILESTONES.find((item) => item.status === "active") ?? ROADMAP_MILESTONES[0]!;
  const upcoming = ROADMAP_MILESTONES.filter((item) => item.status === "default");
  const shipped = ROADMAP_MILESTONES.filter((item) => item.status === "complete");

  const shippedCount = shipped.length;
  const progress = Math.round((shippedCount / ROADMAP_MILESTONES.length) * 100);

  return (
    <div className={styles.root}>
      <motion.div
        className={styles.summary}
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={SCROLL_REPLAY_VIEWPORT}
        transition={{ duration: 0.45, ease }}
      >
        <div className={styles.summaryCopy}>
          <p className={styles.summaryKicker}>Release velocity</p>
          <p className={styles.summaryLead}>
            {shippedCount} milestones shipped · {progress}% of the public roadmap complete.
          </p>
        </div>
        <div className={styles.summaryActions}>
          <div className={styles.summaryMetric} aria-hidden="true">
            <span className={styles.summaryValue}>
              <AnimatedNumber value={progress} suffix="%" />
            </span>
            <span className={styles.summaryLabel}>complete</span>
          </div>
          <Link to="/docs/roadmap" className={styles.roadmapLink}>
            Full roadmap
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>
      </motion.div>

      <div className={styles.timelineWrap}>
        <Timeline
          orientation="horizontal"
          alternate
          descriptionMode="tooltip"
          items={TIMELINE_ITEMS}
          animateOnView
          aria-label="Product roadmap milestones"
          className={styles.timeline}
        />
      </div>

      <div className={styles.focusGrid}>
        <motion.article
          className={styles.spotlight}
          data-status={active.status}
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.5, ease }}
        >
          <div className={styles.spotlightHead}>
            <Badge variant="secondary">{statusLabel(active.status)}</Badge>
            <span className={styles.spotlightDate}>{active.date}</span>
          </div>
          <h3 className={styles.spotlightTitle}>{active.title}</h3>
          <p className={styles.spotlightDesc}>{active.description}</p>
          <ul className={styles.spotlightList}>
            {active.highlights.map((highlight) => (
              <li key={highlight}>
                <Icon name="check" size="sm" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.div
          className={styles.queue}
          variants={container}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={SCROLL_REPLAY_VIEWPORT}
        >
          <p className={styles.queueLabel}>On deck</p>
          {upcoming.map((milestone) => (
            <motion.article key={milestone.id} className={styles.queueCard} variants={itemMotion}>
              <div className={styles.queueHead}>
                <h4>{milestone.title}</h4>
                <span>{milestone.date}</span>
              </div>
              <p>{milestone.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
