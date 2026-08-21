export type DebugLogSource = "error-boundary" | "global" | "promise" | "manual";

export type DebugLogEntry = {
  id: string;
  message: string;
  stack?: string;
  componentStack?: string;
  source: DebugLogSource;
  timestamp: string;
  url?: string;
};

/** Developer debugging — toast notifications, console logs, and in-memory error history. */
export type DebugConfig = {
  /** Turn on debug mode. Pass `true` or `{ enabled: true }`. @default false */
  enabled?: boolean;
  /** Show toast notifications when errors are captured. @default true */
  notify?: boolean;
  /** Log structured errors to the console. @default true */
  logToConsole?: boolean;
  /** Capture window `error` and `unhandledrejection` events. @default true */
  captureGlobal?: boolean;
  /** Include stack traces in toasts and ErrorBoundary fallback. @default true */
  showStack?: boolean;
  /** Max errors stored in memory for inspection. @default 50 */
  maxLogs?: number;
};

export type DebugCaptureMeta = {
  source?: DebugLogSource;
  componentStack?: string;
  url?: string;
};
