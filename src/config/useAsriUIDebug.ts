import { useCallback, useMemo } from "react";
import { useAsriUIConfigOptional } from "./AsriUIContext";
import { captureDebugError, clearDebugLogs, getDebugLogs } from "./debug";
import type { DebugCaptureMeta } from "./debug.types";

/** Inspect and report errors when AsriUIProvider debug mode is enabled. */
export function useAsriUIDebug() {
  const config = useAsriUIConfigOptional();
  const enabled = config?.debug.enabled ?? false;

  const logError = useCallback(
    (error: unknown, meta?: DebugCaptureMeta) => {
      if (!enabled) return null;
      return captureDebugError(error, { source: "manual", ...meta });
    },
    [enabled],
  );

  return useMemo(
    () => ({
      enabled,
      logError,
      getLogs: getDebugLogs,
      clearLogs: clearDebugLogs,
    }),
    [enabled, logError],
  );
}
