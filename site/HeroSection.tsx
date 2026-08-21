import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../src/components/Button";
import { BrandMark } from "./BrandMark";
import { SectionContextMenu } from "./SectionContextMenu";
import { HeroProduct } from "./HeroProduct";
import { TypewriterText } from "./TypewriterText";
import { SECTION_LAYOUTS } from "./sectionLayouts";
import styles from "./LandingPage.module.css";

const TYPEWRITER_PHRASES = [
  "design systems",
  "dashboards",
  "docs sites",
  "installable PWAs",
  "AI copilots",
] as const;

/**
 * Landing hero — entrance stagger on load, parallax/fade only as you leave the first screen.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Stay fully visible through most of the first viewport; animate only while leaving. */
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0, -56]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [1, 1, 0.45, 0]);
  const productY = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0, -32]);
  const productScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.94]);
  const productOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.4]);

  return (
    <>
      <motion.div
        className={styles.heroGlow}
        aria-hidden="true"
        style={reducedMotion ? undefined : { y: glowY, opacity: glowOpacity }}
      />

      <section ref={sectionRef} className={styles.hero}>
        <SectionContextMenu layoutCode={SECTION_LAYOUTS.hero} />
        {/* Scroll layer (parallax) — separate from entrance opacity so load animation still plays */}
        <motion.div
          className={styles.heroScrollLayer}
          style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <div className={styles.heroInner}>
            <div className={styles.heroTags}>
              <p className={styles.heroBrandTag}>
                <BrandMark size={24} />
                <span>AsriUI</span>
              </p>
              <ul className={styles.heroTagList} aria-label="Product highlights">
                <li>Open source</li>
                <li>React 18+</li>
                <li>MIT licensed</li>
                <li>Accessible</li>
                <li>Tree-shakable</li>
                <li>RN-ready tokens</li>
              </ul>
            </div>

            <h1 className={styles.heroTitle}>
              The React UI kit for
              <br />
              <TypewriterText phrases={[...TYPEWRITER_PHRASES]} />
            </h1>

            <p className={styles.heroSubtitle}>
              Accessible React web components you own — TypeScript, motion, and tree-shakable imports,
              with live docs and templates. Use the same design tokens and typed contracts in React
              Native while shipping the npm UI on web.
            </p>

            <div className={styles.heroCtas}>
              <Link to="/docs">
                <Button size="lg" className={styles.btnPrimary}>
                  Browse documentation
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.heroProduct}
          style={
            reducedMotion
              ? undefined
              : { y: productY, scale: productScale, opacity: productOpacity }
          }
        >
          <HeroProduct />
        </motion.div>
      </section>
    </>
  );
}
