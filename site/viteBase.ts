/** Default GitHub project Pages URL until a custom domain is configured. */
export const DEFAULT_GITHUB_PAGES_OWNER = "GAjay";
export const DEFAULT_GITHUB_PAGES_REPO = "asriui";
export const DEFAULT_PROJECT_SITE_URL = `https://${DEFAULT_GITHUB_PAGES_OWNER}.github.io/${DEFAULT_GITHUB_PAGES_REPO}`;
export const DEFAULT_PROJECT_BASE_PATH = `/${DEFAULT_GITHUB_PAGES_REPO}/`;

/** Custom domain — enable via SITE_DOMAIN when DNS is ready. */
export const DEFAULT_CUSTOM_DOMAIN = "asriui.dev";

/** Build-time template in index.html; replaced with the resolved public site URL. */
export const SITE_ORIGIN_TEMPLATE = DEFAULT_PROJECT_SITE_URL;

/** Vite `base` for the docs site. `/repo/` for project Pages; `/` for a custom domain or user site. */
export function normalizeViteBase(value?: string): string {
  const raw =
    value ??
    process.env.VITE_BASE_PATH ??
    process.env.BASE_PATH ??
    DEFAULT_PROJECT_BASE_PATH;
  if (!raw || raw === "/") return "/";
  return `/${raw.replace(/^\/+|\/+$/g, "")}/`;
}

/** Public origin + optional path, no trailing slash. Used for canonical URLs and the sitemap. */
export function resolveSiteOrigin(fallback = DEFAULT_PROJECT_SITE_URL): string {
  const raw = process.env.VITE_SITE_URL || process.env.SITE_URL || fallback;
  return raw.replace(/\/$/, "");
}
