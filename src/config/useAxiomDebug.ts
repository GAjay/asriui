import { useCallback, useMemo } from "react";
import { useAxiomConfigOptional } from "./AxiomContext";
import { captureDebugError, clearDebugLogs, getDebugLogs } from "./debug";
import type { DebugCaptureMeta } from "./debug.types";

/** Inspect and report errors when AxiomProvider debug mode is enabled. */
export function useAxiomDebug() {
  const config = useAxiomConfigOptional();
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
