import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Tooltip } from "../src";
import { BrandMark } from "./BrandMark";
import { SectionContextMenu } from "./SectionContextMenu";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";
import { SECTION_LAYOUTS } from "./sectionLayouts";
import styles from "./AxiomCircuitSection.module.css";

import type { LandingBand } from "./landingBandTypes";

const VIEWBOX = { w: 960, h: 500 };
const HUB = { x: 418, y: 222, w: 124, h: 56 };
const CYCLE = 3.4;
const CHIP_H = 30;

type Leaf = {
  id: string;
  label: string;
  hint: string;
  detail: string;
  x: number;
  y: number;
  side: "left" | "right";
  tone: "stack" | "ship";
  href?: string;
};

const STACK_LEAVES: Leaf[] = [
  {
    id: "react",
    label: "React",
    hint: "UI runtime",
    detail: "Hooks and components power every AxiomUI primitive.",
    x: 112,
    y: 72,
    side: "left",
    tone: "stack",
  },
  {
    id: "ts",
    label: "TypeScript",
    hint: "Type safety",
    detail: "Strict props and tokens catch regressions before ship.",
    x: 126,
    y: 148,
    side: "left",
    tone: "stack",
  },
  {
    id: "vite",
    label: "Vite",
    hint: "Build tool",
    detail: "Fast dev server and optimized production bundles.",
    x: 104,
    y: 224,
    side: "left",
    tone: "stack",
  },
  {
    id: "motion",
    label: "Framer Motion",
    hint: "Animation",
    detail: "Preset motion packs wired into components out of the box.",
    x: 130,
    y: 300,
    side: "left",
    tone: "stack",
  },
  {
    id: "vitest",
    label: "Vitest",
    hint: "Testing",
    detail: "Unit and accessibility tests ship with the library.",
    x: 108,
    y: 376,
    side: "left",
    tone: "stack",
  },
  {
    id: "storybook",
    label: "Storybook",
    hint: "Component docs",
    detail: "Live playground for visual QA and design review.",
    x: 118,
    y: 448,
    side: "left",
    tone: "stack",
  },
];

const SHIP_LEAVES: Leaf[] = [
  {
    id: "login",
    label: "Login",
    hint: "Auth page",
    detail: "Sign-in flow with accessible form patterns and validation.",
    x: 848,
    y: 72,
    side: "right",
    tone: "ship",
    href: "/templates/login",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    hint: "Analytics shell",
    detail: "KPI cards, charts, and sidebar navigation ready to ship.",
    x: 834,
    y: 148,
    side: "right",
    tone: "ship",
    href: "/templates/dashboard",
  },
  {
    id: "pricing",
    label: "Pricing",
    hint: "Plans page",
    detail: "Tier comparison, feature matrix, and upgrade CTAs.",
    x: 856,
    y: 224,
    side: "right",
    tone: "ship",
    href: "/templates/pricing",
  },
  {
    id: "shop",
    label: "Shop",
    hint: "Commerce UI",
    detail: "Product grid, filters, and cart patterns for storefronts.",
    x: 840,
    y: 300,
    side: "right",
    tone: "ship",
    href: "/templates/shop",
  },
  {
    id: "settings",
    label: "Settings",
    hint: "Account page",
    detail: "Profile, preferences, and billing sections in one layout.",
    x: 862,
    y: 376,
    side: "right",
    tone: "ship",
    href: "/templates/settings",
  },
  {
    id: "onboarding",
    label: "Onboarding",
    hint: "First-run flow",
    detail: "Step-by-step wizard to activate new users quickly.",
    x: 828,
    y: 448,
    side: "right",
    tone: "ship",
    href: "/templates/onboarding",
  },
];

const LEAVES = [...STACK_LEAVES, ...SHIP_LEAVES];

const HUB_CY = HUB.y + HUB.h / 2;
const HUB_CX = HUB.x + HUB.w / 2;
const HUB_IN = { x: HUB.x, y: HUB_CY };
const HUB_OUT = { x: HUB.x + HUB.w, y: HUB_CY };

const ease = [0.22, 1, 0.36, 1] as const;

const tooltipClassNames = {
  root: styles.chipTooltip,
  trigger: styles.chipTooltipTrigger,
  content: styles.chipTooltipContent,
};

function chipWidth(label: string) {
  return Math.max(80, label.length * 6.6 + 26);
}

function chipBounds(leaf: Leaf) {
  const w = chipWidth(leaf.label);
  return { w, h: CHIP_H, x: leaf.x - w / 2, y: leaf.y - CHIP_H / 2 };
}

function hubAnchor(leaf: Leaf) {
  return leaf.side === "left" ? HUB_IN : HUB_OUT;
}

function chipAnchor(leaf: Leaf) {
  const chip = chipBounds(leaf);
  if (leaf.tone === "stack") return { x: chip.x + chip.w, y: chip.y + chip.h / 2 };
  return { x: chip.x, y: chip.y + chip.h / 2 };
}

function organicBranch(
  from: { x: number; y: number },
  to: { x: number; y: number },
  side: "left" | "right",
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const outward = side === "left" ? 1 : -1;
  const bulge = Math.min(dist * 0.32, 58);

  const c1x = from.x + dx * 0.34 + outward * bulge;
  const c1y = from.y + dy * 0.1;
  const c2x = to.x - dx * 0.34 + outward * bulge;
  const c2y = to.y - dy * 0.1;

  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

function branchPath(leaf: Leaf) {
  const hub = hubAnchor(leaf);
  const chip = chipAnchor(leaf);
  if (leaf.tone === "stack") return organicBranch(chip, hub, leaf.side);
  return organicBranch(hub, chip, leaf.side);
}

function branchDelay(leaf: Leaf, index: number) {
  if (leaf.tone === "stack") return index * 0.1;
  return CYCLE * 0.4 + (index - 6) * 0.09;
}

function isPeerDimmed(leaf: Leaf, activeId: string | null) {
  if (!activeId || leaf.id === activeId) return false;
  const activeLeaf = LEAVES.find((item) => item.id === activeId);
  if (!activeLeaf) return false;
  return leaf.tone === activeLeaf.tone;
}

function tooltipPlacement(leaf: Leaf) {
  return leaf.side === "left" ? "left" : "right";
}

type ChipTooltipProps = {
  leaf: Leaf;
  chipClass: string;
  stateClass: string;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
};

function ChipTooltip({ leaf, chipClass, stateClass, onActivate, onDeactivate }: ChipTooltipProps) {
  const className = `${chipClass} ${stateClass}`.trim();

  const triggerProps = {
    onPointerEnter: () => onActivate(leaf.id),
    onPointerLeave: () => onDeactivate(),
    onFocus: () => onActivate(leaf.id),
    onBlur: () => onDeactivate(),
  };

  const chip = leaf.href ? (
    <Link to={leaf.href} className={className} {...triggerProps}>
      {leaf.label}
    </Link>
  ) : (
    <span className={className} role="button" tabIndex={0} {...triggerProps}>
      {leaf.label}
    </span>
  );

  return (
    <Tooltip delayDuration={120} classNames={tooltipClassNames}>
      <Tooltip.Trigger>{chip}</Tooltip.Trigger>
      <Tooltip.Content placement={tooltipPlacement(leaf)} sideOffset={12}>
        <span className={styles.tooltipKicker}>{leaf.hint}</span>
        <span className={styles.tooltipText}>{leaf.detail}</span>
        {leaf.href ? <span className={styles.tooltipAction}>Open live template →</span> : null}
      </Tooltip.Content>
    </Tooltip>
  );
}

type BranchWireProps = {
  leaf: Leaf;
  index: number;
  reducedMotion: boolean | null;
  isActive: boolean;
  isDimmed: boolean;
  isLive: boolean;
};

function BranchWire({ leaf, index, reducedMotion, isActive, isDimmed, isLive }: BranchWireProps) {
  const path = branchPath(leaf);
  const chip = chipAnchor(leaf);
  const delay = branchDelay(leaf, index);
  const isStack = leaf.tone === "stack";
  const dotClass = isStack ? styles.nodeDotStack : styles.nodeDotShip;
  const energyClass = isStack ? styles.branchEnergyIn : styles.branchEnergyOut;
  const groupClass = [isActive ? styles.branchActive : "", isDimmed ? styles.branchDimmed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <g className={groupClass || undefined}>
      {reducedMotion ? (
        <path d={path} className={styles.branchTrack} />
      ) : (
        <motion.path
          d={path}
          className={styles.branchTrack}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.55, delay, ease }}
        />
      )}
      {!reducedMotion && isLive ? (
        <path d={path} pathLength={100} className={energyClass} style={{ animationDelay: `${delay}s` }} />
      ) : null}
      <circle className={dotClass} cx={chip.x} cy={chip.y} r="3" />
    </g>
  );
}

type LeafChipProps = {
  leaf: Leaf;
  index: number;
  reducedMotion: boolean | null;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
};

function LeafChip({ leaf, index, reducedMotion, isActive, isDimmed, onActivate, onDeactivate }: LeafChipProps) {
  const chip = chipBounds(leaf);
  const chipClass = leaf.tone === "stack" ? styles.stackChip : styles.templateChip;
  const delay = branchDelay(leaf, index) + 0.12;
  const stateClass = [isActive ? styles.chipActive : "", isDimmed ? styles.chipDimmed : ""]
    .filter(Boolean)
    .join(" ");

  const tooltip = (
    <ChipTooltip
      leaf={leaf}
      chipClass={chipClass ?? ""}
      stateClass={stateClass}
      onActivate={onActivate}
      onDeactivate={onDeactivate}
    />
  );

  return (
    <foreignObject x={chip.x} y={chip.y} width={chip.w} height={CHIP_H + 8}>
      {reducedMotion ? (
        tooltip
      ) : (
        <motion.div
          className={styles.chipWrap}
          initial={{ opacity: 0, x: leaf.tone === "stack" ? -10 : 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.4, delay, ease }}
        >
          {tooltip}
        </motion.div>
      )}
    </foreignObject>
  );
}

type MobileChipProps = {
  leaf: Leaf;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
};

function MobileChip({ leaf, isActive, isDimmed, onActivate, onDeactivate }: MobileChipProps) {
  const chipClass = leaf.tone === "stack" ? styles.mobileStackChip : styles.mobileTemplateChip;
  const stateClass = [isActive ? styles.chipActive : "", isDimmed ? styles.chipDimmed : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <ChipTooltip
      leaf={leaf}
      chipClass={chipClass ?? ""}
      stateClass={stateClass}
      onActivate={onActivate}
      onDeactivate={onDeactivate}
    />
  );
}

type MobileMindMapProps = {
  activeId: string | null;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
};

function MobileMindMap({ activeId, onActivate, onDeactivate }: MobileMindMapProps) {
  return (
    <div className={styles.mobileMap}>
      <div className={styles.mobileZone}>
        <p className={styles.mobileZoneLabel}>Stack</p>
        <ul className={styles.mobileChipGrid}>
          {STACK_LEAVES.map((leaf) => (
            <li key={leaf.id}>
              <MobileChip
                leaf={leaf}
                isActive={activeId === leaf.id}
                isDimmed={isPeerDimmed(leaf, activeId)}
                onActivate={onActivate}
                onDeactivate={onDeactivate}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.mobileFlow} aria-hidden="true">
        <span className={styles.mobileFlowLine} />
      </div>

      <Tooltip delayDuration={120} classNames={tooltipClassNames}>
        <Tooltip.Trigger>
          <div className={styles.mobileHub}>
            <BrandMark size={36} label="AxiomUI" className={styles.hubBrand} />
            <span className={styles.mobileHubName}>AxiomUI</span>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content placement="top" sideOffset={10}>
          <span className={styles.tooltipKicker}>Design system hub</span>
          <span className={styles.tooltipText}>
            Stack libraries flow in — composed tokens and components flow out as shippable pages.
          </span>
        </Tooltip.Content>
      </Tooltip>

      <div className={styles.mobileFlow} aria-hidden="true">
        <span className={styles.mobileFlowLine} />
      </div>

      <div className={styles.mobileZone}>
        <p className={styles.mobileZoneLabel}>Templates</p>
        <ul className={styles.mobileChipGrid}>
          {SHIP_LEAVES.map((leaf) => (
            <li key={leaf.id}>
              <MobileChip
                leaf={leaf}
                isActive={activeId === leaf.id}
                isDimmed={isPeerDimmed(leaf, activeId)}
                onActivate={onActivate}
                onDeactivate={onDeactivate}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AxiomCircuitSection({ band = "white" }: { band?: LandingBand }) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isLive = useInView(mapRef, { amount: 0.25, margin: "0px 0px -5% 0px" });

  return (
    <section id="powered-by" className={styles.section} data-band={band} aria-labelledby="stack-title">
      <SectionContextMenu layoutCode={SECTION_LAYOUTS["powered-by"]} />
      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.45, ease }}
        >
          <p className={styles.kicker}>How it works</p>
          <h2 id="stack-title" className={styles.title}>
            Built on the stack. Ship with templates.
          </h2>
          <p className={styles.lead}>
            Modern libraries branch into AxiomUI — then flow out as pages you can ship.
          </p>
          <div className={styles.actions}>
            <Link to="/docs/getting-started" className={styles.primaryAction}>
              Read the docs
            </Link>
            <Link to="/templates" className={styles.ghostAction}>
              Browse templates →
            </Link>
          </div>
        </motion.header>

        <motion.div
          ref={mapRef}
          className={`${styles.mapWrap} ${isLive && !reducedMotion ? styles.mapLive : ""}`}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.45, ease }}
        >
          <div className={styles.mapDesktop}>
            <svg
              className={styles.mindMap}
              viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Mind map: tech stack connects to AxiomUI, templates branch out"
            >
              <defs>
                <filter id="energy-glow-in" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="energy-glow-out" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="1.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <text className={styles.colLabel} x="118" y="34">
                Stack
              </text>
              <text className={styles.colLabel} x="842" y="34" textAnchor="end">
                Templates
              </text>

              {LEAVES.map((leaf, index) => (
                <BranchWire
                  key={`wire-${leaf.id}`}
                  leaf={leaf}
                  index={index}
                  reducedMotion={reducedMotion}
                  isActive={activeId === leaf.id}
                  isDimmed={isPeerDimmed(leaf, activeId)}
                  isLive={isLive}
                />
              ))}

              {reducedMotion ? (
                <rect className={styles.hubRect} x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="14" />
              ) : (
                <motion.rect
                  className={styles.hubRect}
                  x={HUB.x}
                  y={HUB.y}
                  width={HUB.w}
                  height={HUB.h}
                  rx="14"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={SCROLL_REPLAY_VIEWPORT}
                  transition={{ duration: 0.48, delay: 0.32, ease }}
                  style={{ transformOrigin: `${HUB_CX}px ${HUB_CY}px` }}
                />
              )}

              <circle className={`${styles.hubPort} ${styles.hubPortIn}`} cx={HUB_IN.x} cy={HUB_IN.y} r="4" />
              <circle className={`${styles.hubPort} ${styles.hubPortOut}`} cx={HUB_OUT.x} cy={HUB_OUT.y} r="4" />

              <foreignObject x={HUB.x + 10} y={HUB.y + 8} width={HUB.w - 20} height={HUB.h - 16}>
                <motion.div
                  className={styles.hubInner}
                  initial={reducedMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={SCROLL_REPLAY_VIEWPORT}
                  transition={{ duration: 0.4, delay: 0.45, ease }}
                >
                  <Tooltip delayDuration={120} classNames={tooltipClassNames}>
                    <Tooltip.Trigger>
                      <div className={styles.hubTrigger}>
                        <BrandMark size={36} label="AxiomUI" className={styles.hubBrand} />
                        <span className={styles.hubName}>AxiomUI</span>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content placement="top" sideOffset={10}>
                      <span className={styles.tooltipKicker}>Design system hub</span>
                      <span className={styles.tooltipText}>
                        Unifies your stack into tokens and components, then ships them as ready-made pages.
                      </span>
                    </Tooltip.Content>
                  </Tooltip>
                </motion.div>
              </foreignObject>

              {LEAVES.map((leaf, index) => (
                <LeafChip
                  key={`chip-${leaf.id}`}
                  leaf={leaf}
                  index={index}
                  reducedMotion={reducedMotion}
                  isActive={activeId === leaf.id}
                  isDimmed={isPeerDimmed(leaf, activeId)}
                  onActivate={setActiveId}
                  onDeactivate={() => setActiveId(null)}
                />
              ))}
            </svg>
          </div>

          <MobileMindMap
            activeId={activeId}
            onActivate={setActiveId}
            onDeactivate={() => setActiveId(null)}
          />

          <ul className={styles.srList}>
            {LEAVES.map((leaf) => (
              <li key={leaf.id}>
                {leaf.label}: {leaf.detail}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
