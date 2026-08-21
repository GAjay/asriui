import { forwardRef, useMemo, useState } from "react";
import { Button } from "../Button";
import { cn } from "../../utils/cn";
import { useWidgetScript } from "./useWidgetScript";
import type { WidgetMode, WidgetProps } from "./Widget.types";
import styles from "./Widget.module.css";

function toCssSize(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function resolveMode(mode: WidgetMode, scriptSrc?: string, src?: string, html?: string): "iframe" | "script" {
  if (mode === "script") return "script";
  if (mode === "iframe") return "iframe";
  if (scriptSrc) return "script";
  if (src || html) return "iframe";
  return "iframe";
}

function DefaultFallback() {
  return (
    <div className={styles.state} aria-hidden="true">
      <div className={styles.skeleton} />
    </div>
  );
}

function DefaultError({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className={styles.state} role="alert">
      <p className={styles.stateTitle}>Widget failed to load</p>
      <p className={styles.stateMessage}>{error.message}</p>
      <Button size="sm" variant="outline" onClick={retry}>
        Retry
      </Button>
    </div>
  );
}

/**
 * Isolated embed for partner pages, ad scripts, and third-party widgets.
 * Drop in with a `src` (iframe/webview) or `scriptSrc` — no extra page wiring needed.
 */
export const Widget = forwardRef<HTMLDivElement, WidgetProps>(function Widget(
  {
    className,
    mode = "auto",
    src,
    scriptSrc,
    slotId,
    attrs,
    title = "Embedded widget",
    sandbox = "allow-scripts allow-same-origin allow-popups allow-forms",
    height = 280,
    width = "100%",
    loading = "lazy",
    html,
    fallback,
    errorFallback,
    iframeProps,
    onLoad,
    onError,
    style,
    ...rest
  },
  ref,
) {
  const resolvedMode = resolveMode(mode, scriptSrc, src, html);
  const [iframeReady, setIframeReady] = useState(false);
  const [iframeError, setIframeError] = useState<Error | null>(null);
  const [iframeRetryKey, setIframeRetryKey] = useState(0);

  const script = useWidgetScript({
    scriptSrc: resolvedMode === "script" ? scriptSrc : undefined,
    slotId,
    attrs,
    enabled: resolvedMode === "script",
    onLoad,
    onError,
  });

  const rootStyle = useMemo(
    () => ({
      width: toCssSize(width),
      height: toCssSize(height),
      ...style,
    }),
    [height, style, width],
  );

  const showScriptLoading = resolvedMode === "script" && script.status === "loading";
  const showScriptError = resolvedMode === "script" && script.status === "error" && script.error;
  const showIframeLoading = resolvedMode === "iframe" && !iframeReady && !iframeError;
  const showIframeError = resolvedMode === "iframe" && iframeError;

  const retry = () => {
    if (resolvedMode === "script") {
      script.retry();
      return;
    }
    setIframeReady(false);
    setIframeError(null);
    setIframeRetryKey((value) => value + 1);
  };

  return (
    <div ref={ref} className={cn(styles.root, className)} style={rootStyle} data-axiom-widget={resolvedMode} {...rest}>
      {resolvedMode === "script" ? (
        <div ref={script.mountRef} className={styles.mount} data-widget-slot={slotId ?? true} />
      ) : (
        <iframe
          key={iframeRetryKey}
          className={styles.frame}
          title={title}
          src={html ? undefined : src}
          srcDoc={html}
          sandbox={sandbox}
          loading={loading}
          onLoad={() => {
            setIframeReady(true);
            onLoad?.();
          }}
          onError={() => {
            const nextError = new Error(`Failed to load widget iframe: ${src ?? "inline html"}`);
            setIframeError(nextError);
            onError?.(nextError);
          }}
          {...iframeProps}
        />
      )}

      {showScriptLoading || showIframeLoading ? fallback ?? <DefaultFallback /> : null}

      {showScriptError
        ? errorFallback?.(script.error!, retry) ?? <DefaultError error={script.error!} retry={retry} />
        : null}

      {showIframeError
        ? errorFallback?.(iframeError, retry) ?? <DefaultError error={iframeError} retry={retry} />
        : null}
    </div>
  );
});

Widget.displayName = "Widget";
