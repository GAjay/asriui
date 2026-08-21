import { forwardRef, useMemo, useState } from "react";
import { useCachedAsset } from "../../hooks/useCachedAsset";
import { cn } from "../../utils/cn";
import { buildDefaultSrc, buildSrcSet } from "./buildSrcSet";
import type { ImageProps } from "./Image.types";
import styles from "./Image.module.css";

const DEFAULT_WIDTHS = [400, 800, 1200];

/**
 * Lazy-loaded responsive image. Builds `srcSet` variants from a single base path.
 * Cached copies are served from Cache Storage until `refetchInterval` elapses.
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    widths = DEFAULT_WIDTHS,
    srcPattern = "suffix",
    sizes = "100vw",
    lazy = true,
    placeholderSrc,
    cache = true,
    refetchInterval,
    cacheName,
    maxEntries,
    className,
    onLoad,
    ...rest
  },
  ref,
) {
  const [loaded, setLoaded] = useState(false);

  const srcSet = useMemo(() => buildSrcSet(src, widths, srcPattern), [src, widths, srcPattern]);
  const defaultSrc = useMemo(() => buildDefaultSrc(src, widths, srcPattern), [src, widths, srcPattern]);
  const cached = useCachedAsset(defaultSrc, {
    enabled: cache,
    refetchInterval,
    cacheName,
    maxEntries,
  });

  const usingBlob = Boolean(cached.src?.startsWith("blob:"));

  return (
    <img
      ref={ref}
      alt={alt}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      className={cn(styles.root, loaded ? styles.loaded : styles.loading, className)}
      {...rest}
      src={cached.src ?? placeholderSrc}
      srcSet={usingBlob ? undefined : srcSet}
      sizes={usingBlob ? undefined : sizes}
      data-cached={cached.fromCache || undefined}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
    />
  );
});

Image.displayName = "Image";

export { buildSrcSet, buildResponsiveSrc, buildDefaultSrc } from "./buildSrcSet";
export type { ImageSrcPattern } from "./buildSrcSet";
