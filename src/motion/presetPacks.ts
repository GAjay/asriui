import type { Transition, Variants } from "framer-motion";

/** Named animation script users can select in `AxiomProvider` or `MotionProvider`. */
export type MotionPresetName = "apple" | "snappy" | "soft" | "playful" | "minimal";

export type MotionPresetPack = {
  name: MotionPresetName;
  label: string;
  description: string;
  spring: Transition;
  gentle: Transition;
  reveal: Transition;
  hover: { scale: number; transition: Transition };
  tap: { scale: number; transition: Transition };
  press: { scale: number; transition: Transition };
  fadeUp: Variants;
  staggerContainer: Variants;
  staggerItem: Variants;
  scaleIn: Variants;
};

type PackConfig = {
  label: string;
  description: string;
  spring: Transition;
  gentle: Transition;
  reveal: Transition;
  hoverScale: number;
  tapScale: number;
  pressScale: number;
  fadeUpY: number;
  staggerItemY: number;
  scaleFrom: number;
  staggerChildren?: number;
};

function createPack(name: MotionPresetName, config: PackConfig): MotionPresetPack {
  const {
    label,
    description,
    spring,
    gentle,
    reveal,
    hoverScale,
    tapScale,
    pressScale,
    fadeUpY,
    staggerItemY,
    scaleFrom,
    staggerChildren = 0.08,
  } = config;

  return {
    name,
    label,
    description,
    spring,
    gentle,
    reveal,
    hover: { scale: hoverScale, transition: spring },
    tap: { scale: tapScale, transition: spring },
    press: { scale: pressScale, transition: spring },
    fadeUp: {
      hidden: { opacity: 0, y: fadeUpY },
      visible: { opacity: 1, y: 0, transition: reveal },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren, delayChildren: 0.04 },
      },
    },
    staggerItem: {
      hidden: { opacity: 0, y: staggerItemY },
      visible: { opacity: 1, y: 0, transition: reveal },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: scaleFrom },
      visible: { opacity: 1, scale: 1, transition: reveal },
    },
  };
}

const PACK_CONFIGS: Record<MotionPresetName, PackConfig> = {
  apple: {
    label: "Apple",
    description: "Snappy springs with subtle scale — the default Axiom feel.",
    spring: { type: "spring", stiffness: 420, damping: 32, mass: 0.8 },
    gentle: { type: "spring", stiffness: 260, damping: 28, mass: 1 },
    reveal: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
    hoverScale: 1.015,
    tapScale: 0.97,
    pressScale: 0.985,
    fadeUpY: 18,
    staggerItemY: 14,
    scaleFrom: 0.96,
  },
  snappy: {
    label: "Snappy",
    description: "Fast, tight springs for dashboards and dense UIs.",
    spring: { type: "spring", stiffness: 520, damping: 34, mass: 0.7 },
    gentle: { type: "spring", stiffness: 360, damping: 30, mass: 0.85 },
    reveal: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
    hoverScale: 1.02,
    tapScale: 0.96,
    pressScale: 0.98,
    fadeUpY: 12,
    staggerItemY: 10,
    scaleFrom: 0.97,
    staggerChildren: 0.05,
  },
  soft: {
    label: "Soft",
    description: "Slow, cushioned motion for marketing and editorial layouts.",
    spring: { type: "spring", stiffness: 180, damping: 26, mass: 1.1 },
    gentle: { type: "spring", stiffness: 140, damping: 24, mass: 1.15 },
    reveal: { type: "spring", stiffness: 120, damping: 22, mass: 1.2 },
    hoverScale: 1.01,
    tapScale: 0.985,
    pressScale: 0.992,
    fadeUpY: 24,
    staggerItemY: 18,
    scaleFrom: 0.94,
    staggerChildren: 0.12,
  },
  playful: {
    label: "Playful",
    description: "Bouncy overshoot for onboarding and consumer apps.",
    spring: { type: "spring", stiffness: 380, damping: 18, mass: 0.9 },
    gentle: { type: "spring", stiffness: 280, damping: 16, mass: 1 },
    reveal: { type: "spring", stiffness: 240, damping: 14, mass: 1 },
    hoverScale: 1.04,
    tapScale: 0.94,
    pressScale: 0.97,
    fadeUpY: 22,
    staggerItemY: 16,
    scaleFrom: 0.9,
    staggerChildren: 0.1,
  },
  minimal: {
    label: "Minimal",
    description: "Short tweens with almost no scale — quiet and utilitarian.",
    spring: { type: "tween", duration: 0.16, ease: [0.22, 1, 0.36, 1] },
    gentle: { type: "tween", duration: 0.22, ease: [0.22, 1, 0.36, 1] },
    reveal: { type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    hoverScale: 1.008,
    tapScale: 0.992,
    pressScale: 0.996,
    fadeUpY: 8,
    staggerItemY: 6,
    scaleFrom: 0.99,
    staggerChildren: 0.04,
  },
};

export const MOTION_PRESET_NAMES = Object.keys(PACK_CONFIGS) as MotionPresetName[];

export const MOTION_PRESETS: Record<MotionPresetName, MotionPresetPack> = Object.fromEntries(
  MOTION_PRESET_NAMES.map((name) => [name, createPack(name, PACK_CONFIGS[name])]),
) as Record<MotionPresetName, MotionPresetPack>;

export const MOTION_PRESET_LIST = MOTION_PRESET_NAMES.map((name) => MOTION_PRESETS[name]);

/** Resolve a named animation script. Falls back to `apple` for unknown values. */
export function getMotionPreset(name: MotionPresetName = "apple"): MotionPresetPack {
  return MOTION_PRESETS[name] ?? MOTION_PRESETS.apple;
}
