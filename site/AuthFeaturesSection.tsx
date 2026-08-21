import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Icon, LoginForm, toast, type OAuthProvider, type IconName } from "../src";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";
import styles from "./AuthFeaturesSection.module.css";

import type { LandingBand } from "./landingBandTypes";

const FEATURES: Array<{
  title: string;
  body: string;
  icon: IconName;
}> = [
  {
    title: "OAuth for every provider",
    body: "Microsoft, Google, GitHub, and Apple with one LoginForm API.",
    icon: "sparkles",
  },
  {
    title: "Email + password ready",
    body: "Accessible inputs, validation, and loading states built in.",
    icon: "form",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

type AuthShowcaseProps = {
  /** Skip scroll-reveal motion when rendered inside landing tabs. */
  embedded?: boolean;
};

/**
 * Auth showcase block — copy, features, and tilted LoginForm preview.
 * Used inside ShipFasterSection on the landing page.
 */
export function AuthShowcase({ embedded = false }: AuthShowcaseProps) {
  const reducedMotion = useReducedMotion();
  const animate = !embedded && !reducedMotion;

  const handleOAuth = (provider: OAuthProvider) => {
    toast.info(`Redirecting to ${provider}`, {
      description: "Wire onOAuth to your identity provider in production.",
    });
  };

  const CopyWrap = animate ? motion.div : "div";
  const ListWrap = animate ? motion.ul : "ul";
  const ListItemWrap = animate ? motion.li : "li";
  const PreviewWrap = animate ? motion.div : "div";

  const copyMotion = animate
    ? {
        initial: { opacity: 0, y: 16 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: SCROLL_REPLAY_VIEWPORT,
        transition: { duration: 0.45, ease },
      }
    : {};

  const listMotion = animate
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: SCROLL_REPLAY_VIEWPORT,
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
        },
      }
    : {};

  const previewMotion = animate
    ? {
        initial: { opacity: 0, y: 24 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: SCROLL_REPLAY_VIEWPORT,
        transition: { duration: 0.5, ease, delay: 0.06 },
      }
    : {};

  return (
    <div className={embedded ? `${styles.hero} ${styles.heroEmbedded}` : styles.hero}>
      <div className={styles.left}>
        <CopyWrap className={styles.copy} {...copyMotion}>
          <p className={styles.lead}>
            LoginForm and OAuth buttons that match your product — accessible inputs, loading
            states, and a single API for social providers.
          </p>
          <div className={styles.actions}>
            <Link to="/templates/login" className={styles.primaryAction}>
              Open login demo
            </Link>
            <Link to="/docs/components/auth" className={styles.ghostAction}>
              Auth docs →
            </Link>
          </div>
        </CopyWrap>

        <ListWrap className={styles.featureList} aria-label="Auth capabilities" {...listMotion}>
          {FEATURES.map((feature) => (
            <ListItemWrap
              key={feature.title}
              className={styles.feature}
              {...(animate
                ? {
                    variants: {
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                    },
                  }
                : {})}
            >
              <span className={styles.featureIcon} aria-hidden="true">
                <Icon name={feature.icon} size="sm" />
              </span>
              <div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureBody}>{feature.body}</p>
              </div>
            </ListItemWrap>
          ))}
        </ListWrap>
      </div>

      <PreviewWrap className={styles.previewWrap} {...previewMotion}>
        <div className={styles.previewTilt}>
          <div className={styles.previewCard}>
            <LoginForm
              className={styles.compactLogin}
              title="Sign in"
              description={undefined}
              providers={["google", "github"]}
              showRemember={false}
              onOAuth={handleOAuth}
              onSubmit={async () => {
                toast.success("Signed in", { description: "Demo credentials accepted." });
              }}
            />
          </div>
        </div>
      </PreviewWrap>
    </div>
  );
}

/** @deprecated Use ShipFasterSection on the landing page. */
export function AuthFeaturesSection({ band = "white" }: { band?: LandingBand }) {
  return (
    <section id="auth" className={styles.section} data-band={band}>
      <div className={styles.inner}>
        <header className={styles.copy}>
          <p className={styles.kicker}>The all-in-one auth surface</p>
          <h2 className={styles.title}>Sign-in that ships with your design system</h2>
        </header>
        <AuthShowcase />
      </div>
    </section>
  );
}
