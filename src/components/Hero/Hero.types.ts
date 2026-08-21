import type { HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type HeroClassNames = SlotClassNames<
  "root" | "background" | "copy" | "eyebrow" | "title" | "description" | "actions" | "media"
>;

/** Full-width copy, or a two-column split with media. */
export type HeroVariant = "full" | "split";

/** Which column the copy occupies in `split` layout. */
export type HeroTextSide = "left" | "right";

/** Horizontal alignment of copy (especially for `full`). */
export type HeroAlign = "start" | "center";

export type HeroSize = "md" | "lg";

/** Decorative section backgrounds. Pair with `animated` for motion. */
export type HeroBackground =
  | "none"
  | "muted"
  | "dotted"
  | "grid"
  | "glow"
  | "aurora"
  | "mesh";

/**
 * Props for the root {@link Hero} container.
 *
 * Compound slots: `Hero.Copy`, `Hero.Eyebrow`, `Hero.Title`,
 * `Hero.Description`, `Hero.Actions`, and `Hero.Media`.
 */
export interface HeroProps extends HTMLAttributes<HTMLElement> {
  /**
   * `full` stretches copy across the section. `split` places copy beside `Hero.Media`.
   * @default "full"
   */
  variant?: HeroVariant;
  /**
   * Copy column in split layout. `"right"` puts text on the right and media on the left.
   * @default "left"
   */
  textSide?: HeroTextSide;
  /**
   * Copy alignment.
   * @default "start"
   */
  align?: HeroAlign;
  /**
   * Vertical padding and title scale.
   * @default "lg"
   */
  size?: HeroSize;
  /**
   * Decorative background preset.
   * @default "none"
   */
  background?: HeroBackground;
  /**
   * Animate dotted, grid, glow, aurora, and mesh backgrounds.
   * Honors `prefers-reduced-motion`.
   * @default true
   */
  animated?: boolean;
  /** Override class names for hero slots. */
  classNames?: HeroClassNames;
  /**
   * Root element.
   * @default "section"
   */
  as?: "section" | "header" | "div";
  children?: ReactNode;
}

export interface HeroCopyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface HeroEyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface HeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  /**
   * Heading level.
   * @default "h1"
   */
  as?: "h1" | "h2" | "h3";
}

export interface HeroDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface HeroActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface HeroMediaProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Props for {@link Hero.Background} — extra decorative layer or custom media. */
export interface HeroBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Preset pattern. Use with `children` for a photo/video layer.
   * @default "none"
   */
  variant?: HeroBackground;
  /**
   * Animate this layer when a motion preset is set.
   * @default true
   */
  animated?: boolean;
  children?: ReactNode;
}
