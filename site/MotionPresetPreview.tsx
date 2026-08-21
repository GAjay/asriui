import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../src";
import { useMotionPresets } from "../src/motion/MotionContext";
import styles from "./MotionPresetPreview.module.css";

export function MotionPresetPreview() {
  const { preset, pack } = useMotionPresets();
  const [pulse, setPulse] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
        <p className={styles.label}>{pack.label}</p>
        <p className={styles.desc}>{pack.description}</p>
      </div>

      <motion.div
        className={styles.demoCard}
        variants={pack.scaleIn}
        initial="hidden"
        animate="visible"
        key={`card-${preset}-${pulse}`}
      >
        <motion.div
          className={styles.demoRow}
          variants={pack.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.demoChip} variants={pack.staggerItem}>
            Entrance
          </motion.span>
          <motion.span className={styles.demoChip} variants={pack.staggerItem}>
            Stagger
          </motion.span>
        </motion.div>
        <div className={styles.demoActions}>
          <Button size="sm">Press me</Button>
          <Button size="sm" variant="outline" onClick={() => setPulse((value) => value + 1)}>
            Replay
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
