import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Button, PageLayout, Typography } from "axiom-ui";
import { SCROLL_REPLAY_VIEWPORT } from "../scrollReplay";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./WatchLandingPage.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const COLLECTION = [
  { name: "Axiom Chrono", price: "$2,480", material: "Grade-5 titanium", size: "42mm", featured: true },
  { name: "Midnight GMT", price: "$3,120", material: "Ceramic bezel", size: "40mm", featured: false },
  { name: "Heritage Auto", price: "$1,890", material: "Brushed steel", size: "38mm", featured: false },
  { name: "Summit Diver", price: "$2,650", material: "Sapphire crystal", size: "41mm", featured: false },
] as const;

const FEATURES = [
  { title: "In-house movement", detail: "72-hour power reserve with COSC-level accuracy." },
  { title: "Sapphire crystal", detail: "Double-sided anti-reflective coating on every dial." },
  { title: "5 ATM resistance", detail: "Engineered for daily wear in any climate." },
  { title: "Quick-release strap", detail: "Swap leather, steel, or rubber in seconds." },
] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease } },
};

function WatchDial({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="60"
          y1="14"
          x2="60"
          y2={deg % 90 === 0 ? "20" : "17"}
          stroke="currentColor"
          strokeWidth={deg % 90 === 0 ? "2" : "1"}
          transform={`rotate(${deg} 60 60)`}
          opacity={deg % 90 === 0 ? 1 : 0.5}
        />
      ))}
      <line x1="60" y1="60" x2="60" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="60" x2="78" y2="68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="60" x2="52" y2="78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function WatchLandingPage() {
  const reducedMotion = useReducedMotion();

  return (
    <PageLayout variant="centered" contentMaxWidth="72rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Watches landing page">
            <div className={styles.page}>
              <motion.header
                className={styles.hero}
                variants={container}
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
              >
                <motion.div className={styles.heroCopy} variants={item}>
                  <Badge variant="secondary">Ecommerce · Landing</Badge>
                  <h1 className={styles.heroTitle}>Precision, measured in seconds.</h1>
                  <p className={styles.heroLead}>
                    A monochrome collection of automatic timepieces — engineered for teams who care about craft as
                    much as code.
                  </p>
                  <div className={styles.heroCtas}>
                    <Button size="lg">Shop collection</Button>
                    <Button size="lg" variant="outline">
                      Book a boutique visit
                    </Button>
                  </div>
                </motion.div>

                <motion.div className={styles.heroVisual} variants={item}>
                  <motion.div
                    className={styles.heroDialRing}
                    animate={reducedMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
                  >
                    <WatchDial className={styles.heroDial} />
                  </motion.div>
                  <div className={styles.heroBadge}>Limited · 500 pieces</div>
                </motion.div>
              </motion.header>

              <motion.section
                className={styles.collection}
                aria-labelledby="collection-title"
                variants={container}
                initial={reducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={SCROLL_REPLAY_VIEWPORT}
              >
                <motion.div className={styles.sectionHead} variants={item}>
                  <p className={styles.sectionKicker}>Collection</p>
                  <h2 id="collection-title" className={styles.sectionTitle}>
                    Built for every wrist
                  </h2>
                </motion.div>

                <ul className={styles.collectionGrid}>
                  {COLLECTION.map((watch) => (
                    <motion.li
                      key={watch.name}
                      variants={item}
                      className={watch.featured ? `${styles.watchCard} ${styles.watchCardFeatured}` : styles.watchCard}
                      whileHover={reducedMotion ? undefined : { y: -4 }}
                      transition={{ duration: 0.22, ease }}
                    >
                      <div className={styles.watchDialWrap}>
                        <WatchDial className={styles.watchDial} />
                      </div>
                      <div className={styles.watchMeta}>
                        <Typography variant="h3">{watch.name}</Typography>
                        <p>{watch.material} · {watch.size}</p>
                        <strong>{watch.price}</strong>
                      </div>
                      <Button variant="outline" size="sm" className={styles.watchBtn}>
                        View details
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                className={styles.features}
                aria-labelledby="features-title"
                variants={container}
                initial={reducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={SCROLL_REPLAY_VIEWPORT}
              >
                <motion.div className={styles.sectionHead} variants={item}>
                  <p className={styles.sectionKicker}>Craft</p>
                  <h2 id="features-title" className={styles.sectionTitle}>
                    Details that outlast trends
                  </h2>
                </motion.div>

                <ul className={styles.featureGrid}>
                  {FEATURES.map((feature) => (
                    <motion.li key={feature.title} variants={item} className={styles.featureCard}>
                      <h3>{feature.title}</h3>
                      <p>{feature.detail}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                className={styles.ctaBand}
                variants={item}
                initial={reducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={SCROLL_REPLAY_VIEWPORT}
              >
                <div>
                  <h2 className={styles.ctaTitle}>Ready to ship your storefront?</h2>
                  <p className={styles.ctaLead}>
                    Copy this template from docs, swap product data, and wire your checkout in an afternoon.
                  </p>
                </div>
                <div className={styles.ctaActions}>
                  <Link to="/docs/templates">
                    <Button size="lg">Copy template source</Button>
                  </Link>
                  <Link to="/templates">
                    <Button size="lg" variant="outline">
                      Browse all templates
                    </Button>
                  </Link>
                </div>
              </motion.section>
            </div>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
