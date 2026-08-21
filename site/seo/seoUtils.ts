import { SITE_URL } from "../siteMeta";

/** Build an absolute URL for canonical links, Open Graph, and JSON-LD. */
export function absoluteSiteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${SITE_URL}${normalized}`;
}

/** Ensure social preview images always use absolute URLs. */
export function absoluteOgImage(image: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  return absoluteSiteUrl(image.startsWith("/") ? image : `/${image}`);
}
