import type { MotionPresetName } from "../motion/presetPacks";
import type { AxiomConfig, AxiomConfigContextValue, MotionConfig } from "./types";
import { resolveDebugConfig } from "./debug";
import {
  DEFAULT_ASSET_CACHE_MAX_ENTRIES,
  DEFAULT_ASSET_CACHE_NAME,
  DEFAULT_ASSET_REFETCH_INTERVAL,
} from "../utils/assetCache";

export const DEFAULT_AXIOM_CONFIG: AxiomConfigContextValue = {
  theme: "light",
  fontFamily: '"Work Sans", ui-sans-serif, system-ui, sans-serif',
  motion: {
    preset: "apple",
    enabled: true,
  },
  analytics: {
    enabled: false,
    gtmId: "",
    dataLayerName: "dataLayer",
  },
  monitoring: {
    enabled: false,
    reportUrl: "",
  },
  debug: resolveDebugConfig(false),
  assets: {
    cache: true,
    refetchInterval: DEFAULT_ASSET_REFETCH_INTERVAL,
    cacheName: DEFAULT_ASSET_CACHE_NAME,
    maxEntries: DEFAULT_ASSET_CACHE_MAX_ENTRIES,
  },
  database: {
    baseUrl: "",
    queryEndpoint: "/query",
    queries: {},
    headers: {},
    credentials: "same-origin",
  },
};

function resolveMotionConfig(
  motion?: MotionPresetName | MotionConfig,
): Required<MotionConfig> {
  if (typeof motion === "string") {
    return { preset: motion, enabled: true };
  }

  return {
    preset: motion?.preset ?? DEFAULT_AXIOM_CONFIG.motion.preset,
    enabled: motion?.enabled ?? DEFAULT_AXIOM_CONFIG.motion.enabled,
  };
}

export function resolveAxiomConfig(config?: AxiomConfig): AxiomConfigContextValue {
  return {
    theme: config?.theme ?? DEFAULT_AXIOM_CONFIG.theme,
    fontFamily: config?.fontFamily ?? DEFAULT_AXIOM_CONFIG.fontFamily,
    motion: resolveMotionConfig(config?.motion),
    analytics: {
      enabled: config?.analytics?.enabled ?? DEFAULT_AXIOM_CONFIG.analytics.enabled,
      gtmId: config?.analytics?.gtmId ?? DEFAULT_AXIOM_CONFIG.analytics.gtmId,
      dataLayerName:
        config?.analytics?.dataLayerName ?? DEFAULT_AXIOM_CONFIG.analytics.dataLayerName,
    },
    monitoring: {
      enabled: config?.monitoring?.enabled ?? DEFAULT_AXIOM_CONFIG.monitoring.enabled,
      reportUrl: config?.monitoring?.reportUrl ?? DEFAULT_AXIOM_CONFIG.monitoring.reportUrl,
    },
    debug: resolveDebugConfig(config?.debug),
    assets: {
      cache: config?.assets?.cache ?? DEFAULT_AXIOM_CONFIG.assets.cache,
      refetchInterval: config?.assets?.refetchInterval ?? DEFAULT_AXIOM_CONFIG.assets.refetchInterval,
      cacheName: config?.assets?.cacheName ?? DEFAULT_AXIOM_CONFIG.assets.cacheName,
      maxEntries: config?.assets?.maxEntries ?? DEFAULT_AXIOM_CONFIG.assets.maxEntries,
    },
    database: {
      baseUrl: config?.database?.baseUrl ?? DEFAULT_AXIOM_CONFIG.database.baseUrl,
      queryEndpoint: config?.database?.queryEndpoint ?? DEFAULT_AXIOM_CONFIG.database.queryEndpoint,
      queries: config?.database?.queries ?? DEFAULT_AXIOM_CONFIG.database.queries,
      headers: config?.database?.headers ?? DEFAULT_AXIOM_CONFIG.database.headers,
      credentials: config?.database?.credentials ?? DEFAULT_AXIOM_CONFIG.database.credentials,
    },
  };
}
