import type { AnalyticsConfig } from "./types";
import type { AnalyticsTrackProps } from "./analytics.types";

export type { AnalyticsTrackProps } from "./analytics.types";

type DataLayerWindow = Window & Record<string, unknown[] | undefined>;

function getDataLayer(name: string): unknown[] {
  if (typeof window === "undefined") return [];
  const w = window as unknown as DataLayerWindow;
  if (!w[name]) w[name] = [];
  return w[name] as unknown[];
}

/** Push a custom event to GTM dataLayer. Safe for SSR. */
export function pushAnalyticsEvent(
  analytics: AnalyticsConfig,
  event: string,
  payload?: Record<string, unknown>,
): void {
  if (!analytics.enabled || typeof window === "undefined") return;
  const layer = getDataLayer(analytics.dataLayerName ?? "dataLayer");
  layer.push({ event, ...payload });
}

/** Track a component interaction with optional per-instance overrides. */
export function trackComponentEvent(
  analytics: AnalyticsConfig,
  defaultEvent: string,
  payload: Record<string, unknown>,
  options?: AnalyticsTrackProps,
): void {
  if (!analytics.enabled || options?.track === false) return;

  pushAnalyticsEvent(analytics, options?.trackEvent ?? defaultEvent, {
    ...payload,
    ...(options?.trackLabel ? { label: options.trackLabel } : {}),
    ...options?.trackPayload,
  });
}

/** Track button interactions for GTM. */
export function trackButtonClick(
  analytics: AnalyticsConfig,
  payload: { label?: string; variant?: string; id?: string },
  options?: AnalyticsTrackProps,
): void {
  trackComponentEvent(
    analytics,
    "asriui_button_click",
    { component: "Button", ...payload },
    options,
  );
}

/** Track link interactions for GTM. */
export function trackLinkClick(
  analytics: AnalyticsConfig,
  payload: { href: string; label?: string; external?: boolean; target?: string },
  options?: AnalyticsTrackProps,
): void {
  trackComponentEvent(
    analytics,
    "asriui_link_click",
    { component: "Link", ...payload },
    options,
  );
}

/** Inject GTM script once when gtmId is configured. */
export function initGtm(gtmId: string, dataLayerName = "dataLayer"): void {
  if (typeof window === "undefined" || !gtmId || document.getElementById("asriui-gtm")) return;

  const w = window as unknown as DataLayerWindow;
  w[dataLayerName] = w[dataLayerName] ?? [];
  w[dataLayerName]!.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "asriui-gtm";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}
