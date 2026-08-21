import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants } from "../src/motion/presets";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
} & Omit<ComponentPropsWithoutRef<typeof motion.section>, "children">;

export function RevealSection({ children, className, id, delay = 0, ...rest }: RevealSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      variants={fadeUpVariants}
      initial={reducedMotion ? undefined : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={SCROLL_REPLAY_VIEWPORT}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
