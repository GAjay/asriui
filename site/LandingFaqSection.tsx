import { motion, useReducedMotion } from "framer-motion";
import { LANDING_FAQ } from "./seo/landingFaq";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";
import styles from "./LandingFaqSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function LandingFaqSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className={styles.root} aria-label="Frequently asked questions">
      <motion.div
        className={styles.list}
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={SCROLL_REPLAY_VIEWPORT}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reducedMotion ? 0 : 0.07, delayChildren: 0.04 },
          },
        }}
      >
        {LANDING_FAQ.map((item, index) => (
          <motion.details
            key={item.question}
            className={styles.item}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
            }}
          >
            <summary className={styles.question}>
              <span className={styles.qIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.qText}>{item.question}</h3>
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </motion.details>
        ))}
      </motion.div>
    </section>
  );
}
