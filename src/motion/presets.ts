import { getMotionPreset } from "./presetPacks";

const apple = getMotionPreset("apple");

/** Apple-like snappy spring — used for presses and UI feedback */
export const appleSpring = apple.spring;

/** Gentle spring for layout and entrances */
export const appleGentle = apple.gentle;

/** Soft entrance for cards and sections */
export const appleReveal = apple.reveal;

export const appleTap = apple.tap;
export const appleHover = apple.hover;
export const applePress = apple.press;

export const fadeUpVariants = apple.fadeUp;
export const staggerContainerVariants = apple.staggerContainer;
export const staggerItemVariants = apple.staggerItem;
export const scaleInVariants = apple.scaleIn;

/** Returns motion props only when animation is enabled */
export function resolveMotionProps<T extends Record<string, unknown>>(
  enabled: boolean,
  props: T,
): T | Record<string, never> {
  return enabled ? props : {};
}
