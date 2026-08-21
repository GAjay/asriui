import { Component, type ErrorInfo } from "react";
import type { AxiomConfigContextValue } from "../../config/types";
import { reportError } from "../../config/monitoring";
import { captureDebugError } from "../../config/debug";
import { Button } from "../Button";
import type { ErrorBoundaryProps, ErrorBoundaryFallbackProps } from "./ErrorBoundary.types";
import styles from "./ErrorBoundary.module.css";
import { useAxiomConfigOptional } from "../../config/AxiomContext";

type State = { error: Error | null };

type InnerProps = ErrorBoundaryProps & {
  axiomConfig: AxiomConfigContextValue | null;
};

function DefaultFallback({
  error,
  reset,
  showStack,
}: ErrorBoundaryFallbackProps & { showStack?: boolean }) {
  return (
    <div className={styles.fallback} role="alert">
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>{error.message}</p>
      {showStack && error.stack ? <pre className={styles.stack}>{error.stack}</pre> : null}
      <div className={styles.actions}>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}

class ErrorBoundaryInner extends Component<InnerProps, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);

    const debug = this.props.axiomConfig?.debug;
    if (debug?.enabled) {
      captureDebugError(error, {
        source: "error-boundary",
        componentStack: info.componentStack ?? undefined,
      });
    }

    const monitoring = this.props.axiomConfig?.monitoring;
    const url = this.props.monitoringUrl ?? monitoring?.reportUrl;

    if (monitoring?.enabled && url) {
      void reportError(
        { enabled: true, reportUrl: url },
        {
          message: error.message,
          stack: error.stack,
          componentStack: info.componentStack ?? undefined,
          url: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          timestamp: new Date().toISOString(),
        },
      );
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const fallbackProps: ErrorBoundaryFallbackProps = { error, reset: this.reset };
    const { fallback } = this.props;

    if (typeof fallback === "function") return fallback(fallbackProps);
    if (fallback) return fallback;
    return (
      <DefaultFallback
        {...fallbackProps}
        showStack={this.props.axiomConfig?.debug.enabled && this.props.axiomConfig.debug.showStack}
      />
    );
  }
}

/**
 * React error boundary with configurable fallback layout and optional remote monitoring.
 */
export function ErrorBoundary(props: ErrorBoundaryProps) {
  const axiomConfig = useAxiomConfigOptional();
  return <ErrorBoundaryInner {...props} axiomConfig={axiomConfig} />;
}

ErrorBoundary.displayName = "ErrorBoundary";
