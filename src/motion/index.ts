export {
  appleSpring,
  appleGentle,
  appleReveal,
  appleTap,
  appleHover,
  applePress,
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  scaleInVariants,
  resolveMotionProps,
} from "./presets";
export {
  getMotionPreset,
  MOTION_PRESETS,
  MOTION_PRESET_LIST,
  MOTION_PRESET_NAMES,
  type MotionPresetName,
  type MotionPresetPack,
} from "./presetPacks";
export { MotionProvider, useMotionPresets, useMotionPresetsOptional } from "./MotionContext";
export type { MotionProviderProps, MotionContextValue } from "./MotionContext";
export { useReducedMotion } from "./useReducedMotion";
export { motionDomConflicts, type OmitMotionDomConflicts } from "./domProps";
