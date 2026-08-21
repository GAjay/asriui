import type { ImgHTMLAttributes } from "react";
import type { AssetCacheOptions } from "../../utils/assetCache";
import type { ImageSrcPattern } from "./buildSrcSet";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Base image path used to derive responsive sources. */
  src: string;
  /** Accessible alt text. */
  alt: string;
  /**
   * Width breakpoints used to build `srcSet` from `src`.
   * @default [400, 800, 1200]
   */
  widths?: number[];
  /**
   * How to derive each width variant from `src`.
   * - suffix: `photo.jpg` → `photo-800w.jpg`
   * - query: `photo.jpg` → `photo.jpg?w=800`
   * @default "suffix"
   */
  srcPattern?: ImageSrcPattern;
  /** `sizes` attribute passed to the img element. @default "100vw" */
  sizes?: string;
  /**
   * Enable native lazy loading.
   * @default true
   */
  lazy?: boolean;
  /** Optional low-quality placeholder shown until the image loads. */
  placeholderSrc?: string;
  /**
   * Store the image in Cache Storage so repeat views stay on-device.
   * Falls back to the network URL if Cache Storage is missing or the fetch fails.
   * @default true
   */
  cache?: boolean;
  /**
   * Revalidate the cached image after this many milliseconds.
   * The cached copy is still shown while the refetch runs.
   * @default 86400000 (24 hours)
   */
  refetchInterval?: number;
  /** Cache Storage bucket. @default "axiom-assets-v1" */
  cacheName?: string;
  /** Max cached assets before eviction. @default 120 */
  maxEntries?: number;
}

export type { AssetCacheOptions };
