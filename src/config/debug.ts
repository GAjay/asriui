import { toast } from "../components/Toast/toast";
import type { DebugCaptureMeta, DebugConfig, DebugLogEntry } from "./debug.types";

export type { DebugCaptureMeta, DebugConfig, DebugLogEntry, DebugLogSource } from "./debug.types";

const DEFAULT_DEBUG: Required<DebugConfig> = {
  enabled: false,
  notify: true,
  logToConsole: true,
  captureGlobal: true,
  showStack: true,
  maxLogs: 50,
};

let runtimeConfig: Required<DebugConfig> = { ...DEFAULT_DEBUG };
let logs: DebugLogEntry[] = [];

export function resolveDebugConfig(debug?: boolean | DebugConfig): Required<DebugConfig> {
  if (debug === true) {
    return { ...DEFAULT_DEBUG, enabled: true };
  }

  if (debug === false || debug === undefined) {
    return { ...DEFAULT_DEBUG, enabled: false };
  }

  return {
    enabled: debug.enabled ?? DEFAULT_DEBUG.enabled,
    notify: debug.notify ?? DEFAULT_DEBUG.notify,
    logToConsole: debug.logToConsole ?? DEFAULT_DEBUG.logToConsole,
    captureGlobal: debug.captureGlobal ?? DEFAULT_DEBUG.captureGlobal,
    showStack: debug.showStack ?? DEFAULT_DEBUG.showStack,
    maxLogs: debug.maxLogs ?? DEFAULT_DEBUG.maxLogs,
  };
}

export function setDebugRuntime(config: Required<DebugConfig>): void {
  runtimeConfig = config;
  if (!config.enabled) {
    logs = [];
  }
}

export function getDebugRuntime(): Required<DebugConfig> {
  return runtimeConfig;
}

export function normalizeDebugError(error: unknown): Error {
  if (error instanceof Error) return error;
  return new Error(typeof error === "string" ? error : "Unknown error");
}

function createEntry(error: Error, meta: DebugCaptureMeta = {}): DebugLogEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    message: error.message || "Unknown error",
    stack: error.stack,
    componentStack: meta.componentStack,
    source: meta.source ?? "manual",
    timestamp: new Date().toISOString(),
    url: meta.url ?? (typeof window !== "undefined" ? window.location.href : undefined),
  };
}

function pushLog(entry: DebugLogEntry): void {
  logs = [entry, ...logs].slice(0, runtimeConfig.maxLogs);
}

export function getDebugLogs(): DebugLogEntry[] {
  return [...logs];
}

export function clearDebugLogs(): void {
  logs = [];
}

/** Capture an error when debug mode is enabled — logs, stores, and optionally toasts. */
export function captureDebugError(error: unknown, meta: DebugCaptureMeta = {}): DebugLogEntry | null {
  if (!runtimeConfig.enabled) return null;

  const normalized = normalizeDebugError(error);
  const entry = createEntry(normalized, meta);
  pushLog(entry);

  if (runtimeConfig.logToConsole) {
    console.groupCollapsed(`[AxiomUI Debug] ${entry.message}`);
    console.error(normalized);
    if (entry.componentStack) console.info("Component stack:", entry.componentStack);
    if (entry.url) console.info("URL:", entry.url);
    console.groupEnd();
  }

  if (runtimeConfig.notify) {
    const description = runtimeConfig.showStack
      ? truncate(entry.stack ?? entry.componentStack ?? entry.source, 180)
      : `Source: ${entry.source}`;

    toast.error(entry.message, {
      description,
      duration: 9000,
    });
  }

  return entry;
}

function truncate(value: string, max: number): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max - 1)}…`;
}

export function installDebugGlobalHandlers(config: Required<DebugConfig>): () => void {
  if (typeof window === "undefined" || !config.enabled || !config.captureGlobal) {
    return () => undefined;
  }

  const onError = (event: ErrorEvent) => {
    captureDebugError(event.error ?? event.message, { source: "global" });
  };

  const onRejection = (event: PromiseRejectionEvent) => {
    captureDebugError(event.reason, { source: "promise" });
  };

  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);

  return () => {
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
  };
}
