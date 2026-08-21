import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon, type IconName } from "../src";
import styles from "./PwaConfigSection.module.css";

type PwaCard = {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: IconName;
  tone: "emerald" | "cyan" | "amber";
};

const PWA_CARDS: PwaCard[] = [
  {
    id: "install",
    title: "Installable anywhere",
    description: "Add to Home Screen on iOS, Android, and desktop — same shell as the docs site.",
    tag: "Manifest",
    icon: "rocket",
    tone: "emerald",
  },
  {
    id: "offline",
    title: "Offline-ready docs",
    description: "Workbox precaches the shell and CacheFirst-stores images and fonts so viewing stays on-device until refetch.",
    tag: "Workbox",
    icon: "package",
    tone: "cyan",
  },
  {
    id: "icons",
    title: "Home-screen icons",
    description: "SVG + PNG maskable icons with theme and background colors you control.",
    tag: "Icons",
    icon: "image",
    tone: "cyan",
  },
  {
    id: "update",
    title: "Auto-updating SW",
    description: "registerType: autoUpdate keeps the service worker fresh without a hard reload dance.",
    tag: "Service worker",
    icon: "sparkles",
    tone: "emerald",
  },
  {
    id: "config",
    title: "One config file",
    description: "Tune everything in site/pwa.config.ts and pass it to VitePWA — copy the same pattern into your app.",
    tag: "Config",
    icon: "code",
    tone: "cyan",
  },
];

const AUTO_MS = 3400;

type PwaConfigSectionProps = {
  /** Hide intro copy when embedded in ShipFasterSection. */
  embedded?: boolean;
};

export function PwaConfigSection({ embedded = false }: PwaConfigSectionProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PWA_CARDS.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const active = PWA_CARDS[index]!;
  const behind = [
    PWA_CARDS[(index + 1) % PWA_CARDS.length]!,
    PWA_CARDS[(index + 2) % PWA_CARDS.length]!,
  ];

  return (
    <div className={styles.root} data-embedded={embedded || undefined}>
      <div className={styles.copy}>
        {embedded ? null : (
          <>
            <p className={styles.kicker}>Ship once · install everywhere</p>
            <p className={styles.lead}>
              Docs ship as a real PWA — configure icons, theme colors, and offline caching in{" "}
              <code>site/pwa.config.ts</code>, then reuse the same <code>VitePWA</code> setup in your app.
            </p>
          </>
        )}

        <div className={styles.stats} aria-label="PWA highlights">
          <div className={styles.stat}>
            <strong>Offline</strong>
            <span>Precached shell</span>
          </div>
          <div className={styles.stat}>
            <strong>Install</strong>
            <span>Mobile · desktop</span>
          </div>
          <div className={styles.stat}>
            <strong>Config</strong>
            <span>One TS file</span>
          </div>
        </div>

        <ul className={styles.list}>
          <li>Auto-updating Workbox service worker</li>
          <li>SVG + PNG maskable home-screen icons</li>
          <li>CacheFirst for images and fonts with a refetch window</li>
        </ul>

        <Link to="/docs/getting-started#pwa" className={styles.link}>
          PWA setup in docs →
        </Link>
      </div>

      <div className={styles.deckWrap} aria-live="polite" aria-atomic="true">
        <div className={styles.deck} aria-label="PWA feature cards">
          {behind
            .map((card, i) => ({ card, depth: behind.length - i }))
            .map(({ card, depth }) => (
              <motion.div
                key={`stack-${depth}-${card.id}`}
                className={styles.stackCard}
                data-tone={card.tone}
                aria-hidden="true"
                initial={false}
                animate={
                  reducedMotion
                    ? { y: depth * 14, scale: 1 - depth * 0.055, opacity: 1 - depth * 0.12 }
                    : {
                        y: depth * 14,
                        scale: 1 - depth * 0.055,
                        opacity: 1 - depth * 0.12,
                        rotate: depth * -1.5,
                      }
                }
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                style={{ zIndex: 3 - depth }}
              />
            ))}

          <AnimatePresence initial={false} mode="popLayout">
            <motion.article
              key={active.id}
              className={styles.card}
              data-tone={active.tone}
              initial={
                reducedMotion ? false : { scale: 0.92, y: 18, opacity: 0.55, rotate: -4 }
              }
              animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      x: 340,
                      y: -36,
                      opacity: 0,
                      rotate: 22,
                      scale: 0.94,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    }
              }
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              style={{ zIndex: 5 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardTag}>{active.tag}</span>
                <span className={styles.cardIndex}>
                  {index + 1}/{PWA_CARDS.length}
                </span>
              </div>
              <div className={styles.cardIcon} aria-hidden="true">
                <Icon name={active.icon} size="lg" />
              </div>
              <h3 className={styles.cardTitle}>{active.title}</h3>
              <p className={styles.cardDesc}>{active.description}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
