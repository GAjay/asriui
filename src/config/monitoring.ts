import type { MonitoringConfig } from "./types";

export type ErrorReportPayload = {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
};

/** POST error details to a monitoring endpoint. Fails silently. */
export async function reportError(
  monitoring: MonitoringConfig,
  payload: ErrorReportPayload,
): Promise<void> {
  if (!monitoring.enabled || !monitoring.reportUrl || typeof fetch === "undefined") return;

  try {
    await fetch(monitoring.reportUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Monitoring must never throw
  }
}
