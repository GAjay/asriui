import { lazy, Suspense, type ReactNode } from "react";
import { LandingHeroSection } from "./LandingHeroSection";
import { HeroSection } from "./HeroSection";
import { LandingSeo } from "./seo/LandingSeo";
import { LandingSiteHeader } from "./LandingSiteHeader";
import { LazyMount } from "./LazyMount";
import { useLandingHashScroll } from "./landingHash";
import { SECTION_LAYOUTS } from "./sectionLayouts";
import { useSiteTheme } from "./useSiteTheme";
import styles from "./LandingPage.module.css";

const FeaturesShowcase = lazy(() =>
  import("./FeaturesShowcase").then((m) => ({ default: m.FeaturesShowcase })),
);
const TechMarquee = lazy(() =>
  import("./TechMarquee").then((m) => ({ default: m.TechMarquee })),
);
const LandingFooter = lazy(() =>
  import("./LandingFooter").then((m) => ({ default: m.LandingFooter })),
);
const DesignSystemSection = lazy(() =>
  import("./DesignSystemSection").then((m) => ({ default: m.DesignSystemSection })),
);
const ShipFasterSection = lazy(() =>
  import("./ShipFasterSection").then((m) => ({ default: m.ShipFasterSection })),
);
const ExploreSection = lazy(() =>
  import("./ExploreSection").then((m) => ({ default: m.ExploreSection })),
);
const AsriUICircuitSection = lazy(() =>
  import("./AsriUICircuitSection").then((m) => ({ default: m.AsriUICircuitSection })),
);
const LandingMilestones = lazy(() =>
  import("./LandingMilestones").then((m) => ({ default: m.LandingMilestones })),
);
const LandingFaqSection = lazy(() =>
  import("./LandingFaqSection").then((m) => ({ default: m.LandingFaqSection })),
);
const SupportSection = lazy(() =>
  import("./SupportSection").then((m) => ({ default: m.SupportSection })),
);

const FEATURES = [
  {
    title: "Accessible by default",
    description:
      "Every component ships with ARIA roles, keyboard support, and focus management — so your team ships inclusive UI without extra work.",
    tag: "WCAG-ready",
    icon: "accessibility" as const,
    highlight: "Dialog traps focus · Switch uses WAI-ARIA · Forms wire labels automatically",
  },
  {
    title: "Motion-ready",
    description:
      "Framer Motion preset packs — apple, snappy, soft, playful, and minimal — with stagger, fade-up, and prefers-reduced-motion baked in.",
    tag: "Framer Motion",
    icon: "sparkles" as const,
    highlight: "motion config on AsriUIProvider · useMotionPresets() · MotionProvider for local overrides",
  },
  {
    title: "Installable PWA",
    description:
      "Ship the docs site (or your app shell) as an installable progressive web app with manifest icons, theme colors, and offline caching via vite-plugin-pwa.",
    tag: "PWA",
    icon: "rocket" as const,
    highlight: "site/pwa.config.ts · auto-updating service worker · install on mobile and desktop",
  },
  {
    title: "Tree-shakable exports",
    description:
      "Import only what you need via subpath exports like asriui/button. CSS Modules keep styles colocated — zero runtime CSS-in-JS.",
    tag: "Small bundles",
    icon: "package" as const,
  },
  {
    title: "Compound components",
    description:
      "Card, Tabs, Dialog, SideNav, and PageLayout use flexible slots that compose naturally without prop drilling.",
    tag: "Composable",
    icon: "puzzle" as const,
  },
  {
    title: "Server-driven pages",
    description:
      "ServerQuery fetches API data with loading, error, and retry built in — pass a URL or query function and render children with typed results.",
    tag: "Async data",
    icon: "code" as const,
    highlight: "URL or fetch fn · Loader + retry · useServerQuery hook for headless usage",
  },
  {
    title: "Production tooling",
    description:
      "AsriUIProvider bundles theme, GTM analytics, and error monitoring. Optional Monaco editor and React Flow included.",
    tag: "Enterprise-ready",
    icon: "rocket" as const,
  },
] as const;

function DeferredSection({
  minHeight,
  children,
}: {
  minHeight: number | string;
  children: ReactNode;
}) {
  return (
    <LazyMount minHeight={minHeight}>
      <Suspense fallback={null}>{children}</Suspense>
    </LazyMount>
  );
}

export function LandingPage() {
  const { theme } = useSiteTheme();
  useLandingHashScroll();

  return (
    <div className={styles.page} data-theme={theme} data-landing-page>
      <LandingSeo />

      <LandingSiteHeader animated />

      <main className={styles.main}>
        <div className={styles.heroBand}>
          <HeroSection />
        </div>

        <DeferredSection minHeight="3.5rem">
          <TechMarquee band="black" />
        </DeferredSection>

        <LandingHeroSection
          id="features"
          kicker="Why AsriUI"
          accent="emerald"
          title="Everything you need to ship polished interfaces"
          lead="Primitives, layouts, docs tooling, and AI-ready shells — a complete toolkit for teams who care about craft, accessibility, and small bundles."
          tone="white"
          layoutCode={SECTION_LAYOUTS.features}
        >
          <DeferredSection minHeight="28rem">
            <FeaturesShowcase features={FEATURES} />
          </DeferredSection>
        </LandingHeroSection>

        <LandingHeroSection
          id="design-system"
          kicker="Token system"
          accent="cyan"
          title="Design tokens that scale with your product"
          lead="Monochrome zinc defaults, light and dark themes, and CSS variables you can copy from docs or override in one place."
          tone="black"
          align="start"
          layoutCode={SECTION_LAYOUTS["design-system"]}
        >
          <DeferredSection minHeight="28rem">
            <DesignSystemSection />
          </DeferredSection>
        </LandingHeroSection>

        <LandingHeroSection
          id="ship-faster"
          kicker="Ship faster"
          accent="cyan"
          title="Auth and installable shells out of the box"
          lead="LoginForm with OAuth, plus PWA config for offline docs — configure once and reuse both in your product."
          tone="white"
          align="start"
          layoutCode={SECTION_LAYOUTS["ship-faster"]}
        >
          <DeferredSection minHeight="36rem">
            <ShipFasterSection />
          </DeferredSection>
        </LandingHeroSection>

        <LandingHeroSection
          id="explore"
          kicker="Explore"
          accent="emerald"
          title="Components and page templates"
          lead="Filter the component catalog or browse production page layouts — every entry links to live docs and demos."
          tone="black"
          align="start"
          layoutCode={SECTION_LAYOUTS.explore}
        >
          <DeferredSection minHeight="24rem">
            <ExploreSection />
          </DeferredSection>
        </LandingHeroSection>

        <DeferredSection minHeight="32rem">
          <AsriUICircuitSection band="white" />
        </DeferredSection>

        <LandingHeroSection
          id="milestones"
          kicker="Milestones"
          accent="cyan"
          title="What we've shipped — and what's next"
          lead="A living release board — what's shipping now, what's next, and what already landed."
          tone="black"
          layoutCode={SECTION_LAYOUTS.milestones}
        >
          <DeferredSection minHeight="20rem">
            <LandingMilestones />
          </DeferredSection>
        </LandingHeroSection>

        <LandingHeroSection
          id="faq"
          kicker="FAQ"
          accent="emerald"
          title="Frequently asked questions"
          lead="Straight answers for teams evaluating AsriUI — install, licensing, frameworks, and accessibility."
          tone="white"
          layoutCode={SECTION_LAYOUTS.faq}
        >
          <DeferredSection minHeight="18rem">
            <LandingFaqSection />
          </DeferredSection>
        </LandingHeroSection>

        <LandingHeroSection
          id="support"
          kicker="Open source"
          accent="amber"
          title="Enjoying AsriUI?"
          lead="Your support keeps the library, docs, and templates moving forward."
          tone="black"
          align="start"
          layoutCode={SECTION_LAYOUTS.support}
        >
          <DeferredSection minHeight="16rem">
            <SupportSection />
          </DeferredSection>
        </LandingHeroSection>
      </main>

      <DeferredSection minHeight="12rem">
        <LandingFooter band="white" />
      </DeferredSection>
    </div>
  );
}
