import type { HTMLAttributes, ReactNode } from "react";
import type { IconName } from "./icons";

export type IconSize = "sm" | "md" | "lg" | "xl";

type IconBaseProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /**
   * Size preset.
   * @default "md"
   */
  size?: IconSize;
  /**
   * Accessible label. When set, the icon is announced to screen readers.
   * When omitted, the icon is hidden with aria-hidden (except images use alt).
   */
  label?: string;
};

/** Built-in named SVG from the AsriUI icon set. */
export type BuiltinIconProps = IconBaseProps & {
  name: IconName;
  src?: never;
  alt?: never;
  children?: never;
};

/** Raster or remote image rendered at icon size. */
export type ImageIconProps = IconBaseProps & {
  src: string;
  /** Image alt text. Falls back to label when set. */
  alt?: string;
  /**
   * CSS object-fit for image icons.
   * @default "contain"
   */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  name?: never;
  children?: never;
};

/**
 * Custom SVG or third-party icon component (e.g. lucide-react, react-icons).
 * Pass the library icon as children — sizing and color inherit from the wrapper.
 */
export type CustomIconProps = IconBaseProps & {
  children: ReactNode;
  name?: never;
  src?: never;
};

export type IconProps = BuiltinIconProps | ImageIconProps | CustomIconProps;
