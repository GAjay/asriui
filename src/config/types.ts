export type ThemeMode = "light" | "dark" | "system";

import type { MotionPresetName } from "../motion/presetPacks";
import type { DebugConfig } from "./debug.types";
import type { DatabaseConfig, DatabaseNamedQuery } from "./database.types";

export type { MotionPresetName };
export type { DebugConfig, DebugLogEntry, DebugLogSource } from "./debug.types";
export type { DatabaseConfig, DatabaseNamedQuery, DatabaseQueryRequest, DatabaseQueryByKey } from "./database.types";

/** Named animation script or detailed motion settings for the app. */
export type MotionConfig = {
  /** Animation script preset. @default "apple" */
  preset?: MotionPresetName;
  /** Enable motion globally for library components. @default true */
  enabled?: boolean;
};

/** Google Tag Manager / dataLayer analytics configuration. */
export type AnalyticsConfig = {
  /** Enable analytics event dispatch. @default false */
  enabled?: boolean;
  /** GTM container ID (e.g. GTM-XXXX). Injects script when set. */
  gtmId?: string;
  /** dataLayer global name. @default "dataLayer" */
  dataLayerName?: string;
};

/** Remote error reporting configuration. */
export type MonitoringConfig = {
  /** Enable POST reporting on caught errors. @default false */
  enabled?: boolean;
  /** Endpoint that receives JSON error payloads. */
  reportUrl?: string;
};

/** Global AsriUI plug-and-play configuration. */
export type AsriUIConfig = {
  /** Color theme mode. @default "light" */
  theme?: ThemeMode;
  /** CSS font-family stack applied to the app root. @default "Work Sans" */
  fontFamily?: string;
  /** Analytics / GTM settings. */
  analytics?: AnalyticsConfig;
  /** Error monitoring settings. */
  monitoring?: MonitoringConfig;
  /**
   * Animation script preset for library motion.
   * Pass a preset name (`"apple"`, `"snappy"`, `"soft"`, `"playful"`, `"minimal"`)
   * or `{ preset, enabled }`.
   * @default "apple"
   */
  motion?: MotionPresetName | MotionConfig;
  /**
   * Developer debug mode — toast notifications, console logs, and global error capture.
   * Pass `true` to enable with defaults, or a config object.
   */
  debug?: boolean | DebugConfig;
  /**
   * Image and asset Cache Storage settings. Cached files stay on-device until
   * `refetchInterval` elapses, then they revalidate in the background.
   */
  assets?: AssetsConfig;
  /**
   * Database / server query settings for ServerQuery direct queries and named query keys.
   * Set baseUrl, queryEndpoint, and queries once — use `query="users"` or `query="sql:SELECT …"`.
   */
  database?: DatabaseConfig;
};

export type AssetsConfig = {
  /** Cache images and assets in Cache Storage. @default true */
  cache?: boolean;
  /** Revalidate cached assets after this many milliseconds. @default 86400000 (24 hours) */
  refetchInterval?: number;
  /** Cache Storage bucket name. @default "asriui-assets-v1" */
  cacheName?: string;
  /** Max cached entries before eviction. @default 120 */
  maxEntries?: number;
};

export type AsriUIConfigContextValue = Required<
  Pick<AsriUIConfig, "theme" | "fontFamily">
> & {
  motion: Required<MotionConfig>;
  analytics: Required<AnalyticsConfig>;
  monitoring: Required<MonitoringConfig>;
  debug: Required<DebugConfig>;
  assets: Required<AssetsConfig>;
  database: Required<Pick<DatabaseConfig, "queryEndpoint" | "credentials">> &
    DatabaseConfig & {
      queries: Record<string, string | DatabaseNamedQuery>;
      headers: Record<string, string>;
    };
};
