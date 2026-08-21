import type { ErrorInfo, ReactNode } from "react";

/**
 * Props passed to a custom {@link ErrorBoundary} fallback render function.
 */
export type ErrorBoundaryFallbackProps = {
  /** The error that was thrown. */
  error: Error;
  /** Resets the boundary and re-renders children. */
  reset: () => void;
};

/**
 * Props for the {@link ErrorBoundary} component.
 *
 * Catches render errors in child components and displays a fallback UI.
 * When `AxiomProvider` monitoring is enabled, errors are POSTed to the
 * configured `reportUrl` (or per-boundary `monitoringUrl`).
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={({ error, reset }) => <ErrorPage error={error} onRetry={reset} />}
 *   onError={(error) => console.error(error)}
 * >
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export interface ErrorBoundaryProps {
  /**
   * Custom fallback UI. Pass a React node or a render function that
   * receives `{ error, reset }`.
   */
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  /** Local callback invoked when an error is caught. */
  onError?: (error: Error, info: ErrorInfo) => void;
  /**
   * Per-boundary monitoring endpoint override.
   * Falls back to `AxiomProvider` `monitoring.reportUrl` when omitted.
   */
  monitoringUrl?: string;
  /** Child components to protect. */
  children: ReactNode;
}
