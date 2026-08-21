/** Vite `base` for the docs site. `/` for a custom domain or user site; `/repo/` for project Pages. */
export function normalizeViteBase(value?: string): string {
  const raw = value ?? process.env.VITE_BASE_PATH ?? process.env.BASE_PATH ?? "/";
  if (!raw || raw === "/") return "/";
  return `/${raw.replace(/^\/+|\/+$/g, "")}/`;
}

/** Public origin + optional path, no trailing slash. Used for canonical URLs and the sitemap. */
export function resolveSiteOrigin(fallback = "https://asriui.dev"): string {
  const raw = process.env.VITE_SITE_URL || process.env.SITE_URL || fallback;
  return raw.replace(/\/$/, "");
}
