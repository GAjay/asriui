import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../src";
import { AnimatedNumber } from "./AnimatedNumber";
import { SITE_AUTHOR } from "./author";
import { COMPONENT_COUNT } from "./landingNavData";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";
import { PAGE_TEMPLATES } from "./templates/templateMeta";
import styles from "./SupportSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const CONNECT_LINKS = [
  {
    id: "coffee",
    title: "Buy me a coffee",
    href: SITE_AUTHOR.buyMeACoffee,
    icon: "sparkles" as const,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    href: SITE_AUTHOR.linkedIn,
    icon: "bot" as const,
  },
  {
    id: "email",
    title: "Email",
    href: `mailto:${SITE_AUTHOR.email}`,
    icon: "send" as const,
  },
] as const;

const FUNDING = [
  "New primitives and data patterns",
  "Docs, guides, and live examples",
  "Page templates and MIT releases",
] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease } },
};

export function SupportSection() {
  const reducedMotion = useReducedMotion();
  const componentCount = COMPONENT_COUNT;
  const templateCount = PAGE_TEMPLATES.length;

  return (
    <motion.div
      className={styles.root}
      variants={container}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={SCROLL_REPLAY_VIEWPORT}
    >
      <motion.article className={styles.panel} variants={item}>
        <header className={styles.header}>
          <div className={styles.identity}>
            <span className={styles.licensePill}>MIT License</span>
            <p className={styles.byline}>
              Built and maintained by{" "}
              <Link to="/about">
                <strong>{SITE_AUTHOR.name}</strong>
              </Link>
            </p>
          </div>

          <ul className={styles.stats} aria-label="Project scale">
            <li>
              <AnimatedNumber value={componentCount} suffix="+" className={styles.statValue} />
              <span>Components</span>
            </li>
            <li>
              <AnimatedNumber value={templateCount} className={styles.statValue} />
              <span>Templates</span>
            </li>
            <li>
              <span className={styles.statValue}>100%</span>
              <span>Open source</span>
            </li>
          </ul>
        </header>

        <p className={styles.lead}>
          Star the repo to follow releases, open issues for bugs, or send a PR. Community signals
          help prioritize what ships next.
        </p>

        <div className={styles.actions}>
          <a
            className={styles.githubCta}
            href={SITE_AUTHOR.github}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="code" size="md" />
            <span className={styles.githubCopy}>
              <strong>Star on GitHub</strong>
              <span>Track releases and contribute</span>
            </span>
            <Icon name="chevron-right" size="sm" />
          </a>

          <ul className={styles.connect} aria-label="Other ways to connect">
            {CONNECT_LINKS.map((channel) => (
              <li key={channel.id}>
                <a
                  className={styles.connectLink}
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  title={channel.title}
                >
                  <Icon name={channel.icon} size="sm" />
                  <span>{channel.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.article>

      <motion.ul className={styles.funding} aria-label="What community support enables" variants={item}>
        {FUNDING.map((line) => (
          <li key={line}>
            <Icon name="check" size="sm" />
            <span>{line}</span>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
