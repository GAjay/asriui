import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "../src/components/Icon";
import { HeroShowcase } from "./HeroShowcase";
import styles from "./HeroProduct.module.css";

const FLOATS = [
  { label: "Copy & paste", icon: "copy" as const, className: styles.floatA },
  { label: "WCAG-ready", icon: "accessibility" as const, className: styles.floatB },
  { label: "AI chat shell", icon: "bot" as const, className: styles.floatC },
];

export function HeroProduct() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.root}>
      <div className={styles.frame}>
        <div className={styles.frameGlow} aria-hidden="true" />
        <HeroShowcase />
      </div>

      {FLOATS.map((item, index) => (
        <motion.div
          key={item.label}
          className={`${styles.float} ${item.className}`}
          initial={reducedMotion ? undefined : { opacity: 0, scale: 0.92 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.45 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Icon name={item.icon} size="sm" />
          <span>{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
