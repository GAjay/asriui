import type { MotionPresetName } from "../motion/presetPacks";
import type { AsriUIConfig, AsriUIConfigContextValue, MotionConfig } from "./types";
import { resolveDebugConfig } from "./debug";
import {
  DEFAULT_ASSET_CACHE_MAX_ENTRIES,
  DEFAULT_ASSET_CACHE_NAME,
  DEFAULT_ASSET_REFETCH_INTERVAL,
} from "../utils/assetCache";

export const DEFAULT_ASRIUI_CONFIG: AsriUIConfigContextValue = {
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
    preset: motion?.preset ?? DEFAULT_ASRIUI_CONFIG.motion.preset,
    enabled: motion?.enabled ?? DEFAULT_ASRIUI_CONFIG.motion.enabled,
  };
}

export function resolveAsriUIConfig(config?: AsriUIConfig): AsriUIConfigContextValue {
  return {
    theme: config?.theme ?? DEFAULT_ASRIUI_CONFIG.theme,
    fontFamily: config?.fontFamily ?? DEFAULT_ASRIUI_CONFIG.fontFamily,
    motion: resolveMotionConfig(config?.motion),
    analytics: {
      enabled: config?.analytics?.enabled ?? DEFAULT_ASRIUI_CONFIG.analytics.enabled,
      gtmId: config?.analytics?.gtmId ?? DEFAULT_ASRIUI_CONFIG.analytics.gtmId,
      dataLayerName:
        config?.analytics?.dataLayerName ?? DEFAULT_ASRIUI_CONFIG.analytics.dataLayerName,
    },
    monitoring: {
      enabled: config?.monitoring?.enabled ?? DEFAULT_ASRIUI_CONFIG.monitoring.enabled,
      reportUrl: config?.monitoring?.reportUrl ?? DEFAULT_ASRIUI_CONFIG.monitoring.reportUrl,
    },
    debug: resolveDebugConfig(config?.debug),
    assets: {
      cache: config?.assets?.cache ?? DEFAULT_ASRIUI_CONFIG.assets.cache,
      refetchInterval: config?.assets?.refetchInterval ?? DEFAULT_ASRIUI_CONFIG.assets.refetchInterval,
      cacheName: config?.assets?.cacheName ?? DEFAULT_ASRIUI_CONFIG.assets.cacheName,
      maxEntries: config?.assets?.maxEntries ?? DEFAULT_ASRIUI_CONFIG.assets.maxEntries,
    },
    database: {
      baseUrl: config?.database?.baseUrl ?? DEFAULT_ASRIUI_CONFIG.database.baseUrl,
      queryEndpoint: config?.database?.queryEndpoint ?? DEFAULT_ASRIUI_CONFIG.database.queryEndpoint,
      queries: config?.database?.queries ?? DEFAULT_ASRIUI_CONFIG.database.queries,
      headers: config?.database?.headers ?? DEFAULT_ASRIUI_CONFIG.database.headers,
      credentials: config?.database?.credentials ?? DEFAULT_ASRIUI_CONFIG.database.credentials,
    },
  };
}
