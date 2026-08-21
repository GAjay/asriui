/** How responsive URLs are derived from a single base `src`. */
export type ImageSrcPattern = "suffix" | "query";

/**
 * Build a responsive URL for a given width from one base image path.
 *
 * - suffix: `/photo.jpg` → `/photo-800w.jpg`
 * - query: `/photo.jpg` → `/photo.jpg?w=800`
 */
export function buildResponsiveSrc(
  src: string,
  width: number,
  pattern: ImageSrcPattern = "suffix",
): string {
  if (pattern === "query") {
    const joiner = src.includes("?") ? "&" : "?";
    return `${src}${joiner}w=${width}`;
  }

  const match = src.match(/^(.*?)(\.[a-zA-Z0-9]+)$/);
  if (!match) return src;
  const [, base, ext] = match;
  return `${base}-${width}w${ext}`;
}

/** Build an HTML `srcset` string from one base image path. */
export function buildSrcSet(
  src: string,
  widths: number[],
  pattern: ImageSrcPattern = "suffix",
): string {
  return widths.map((width) => `${buildResponsiveSrc(src, width, pattern)} ${width}w`).join(", ");
}

/** Pick a default `src` (largest width) for the img element. */
export function buildDefaultSrc(
  src: string,
  widths: number[],
  pattern: ImageSrcPattern = "suffix",
): string {
  const largest = widths[widths.length - 1];
  if (!largest) return src;
  return buildResponsiveSrc(src, largest, pattern);
}
