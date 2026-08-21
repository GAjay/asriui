import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type SliderClassNames = SlotClassNames<
  "root" | "track" | "slide" | "controls" | "prev" | "next" | "dots" | "dot"
>;

/**
 * Props for the root {@link Slider} carousel.
 *
 * Compound slots: `Slider.Track`, `Slider.Slide`, `Slider.Controls`,
 * `Slider.Prev`, `Slider.Next`, and `Slider.Dots`.
 */
export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled slide index. */
  index?: number;
  /**
   * Initial slide when uncontrolled.
   * @default 0
   */
  defaultIndex?: number;
  /** Called when the active slide changes. */
  onIndexChange?: (index: number) => void;
  /**
   * Wrap from last to first (and the reverse).
   * @default true
   */
  loop?: boolean;
  /**
   * Auto-advance interval in milliseconds. `0` or `false` disables autoplay.
   * @default 0
   */
  autoplay?: number | false;
  /**
   * Drag or swipe the track to change slides.
   * @default true
   */
  drag?: boolean;
  /**
   * Accessible name for the carousel region.
   * @default "Slideshow"
   */
  label?: string;
  classNames?: SliderClassNames;
  children?: ReactNode;
}

export interface SliderTrackProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface SliderSlideProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface SliderControlsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface SliderPrevProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface SliderNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface SliderDotsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
