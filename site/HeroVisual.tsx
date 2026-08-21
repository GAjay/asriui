import { motion, useReducedMotion } from "framer-motion";
import { AspectRatio, Badge, Image } from "../src";
import { appleGentle } from "../src/motion/presets";
import { HeroShowcase } from "./HeroShowcase";
import styles from "./HeroVisual.module.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80";

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.root}>
      <motion.div
        className={styles.backdrop}
        initial={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
        animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ ...appleGentle, delay: 0.1 }}
      >
        <AspectRatio ratio={5 / 4}>
          <Image
            src={HERO_IMAGE}
            alt="Developer workspace with code on screen"
            widths={[640, 960, 1400]}
            srcPattern="query"
            sizes="(max-width: 900px) 100vw, 560px"
          />
        </AspectRatio>
        <div className={styles.backdropOverlay} aria-hidden="true" />
      </motion.div>

      <motion.div
        className={styles.dashboard}
        initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ ...appleGentle, delay: 0.22 }}
      >
        <HeroShowcase />
      </motion.div>

      <motion.div
        className={styles.floatCard}
        initial={reducedMotion ? undefined : { opacity: 0, y: 16, x: 16 }}
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: 1,
                y: [0, -6, 0],
                x: 0,
              }
        }
        transition={{
          opacity: { ...appleGentle, delay: 0.35 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.35 },
          x: { ...appleGentle, delay: 0.35 },
        }}
      >
        <div className={styles.floatInner}>
          <AspectRatio ratio={16 / 10}>
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              alt="Analytics dashboard preview"
              widths={[320, 640]}
              srcPattern="query"
              sizes="220px"
            />
          </AspectRatio>
          <div className={styles.floatMeta}>
            <Badge>Image</Badge>
            <p>Lazy-loaded srcSet</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
