import { useEffect, useRef, useState, useCallback } from "react";

type UseWidgetScriptOptions = {
  scriptSrc?: string;
  slotId?: string;
  attrs?: Record<string, string>;
  enabled?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
};

const loadedScripts = new Set<string>();

export function useWidgetScript({
  scriptSrc,
  slotId,
  attrs,
  enabled = true,
  onLoad,
  onError,
}: UseWidgetScriptOptions) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [error, setError] = useState<Error | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const attemptRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!enabled || !scriptSrc || !mount) return;

    attemptRef.current += 1;
    const attempt = attemptRef.current;

    setStatus("loading");
    setError(null);

    if (slotId) mount.id = slotId;
    Object.entries(attrs ?? {}).forEach(([key, value]) => {
      mount.setAttribute(key, value);
    });

    const handleLoad = () => {
      if (attempt !== attemptRef.current) return;
      loadedScripts.add(scriptSrc);
      setStatus("ready");
      onLoad?.();
    };

    const handleError = () => {
      if (attempt !== attemptRef.current) return;
      const nextError = new Error(`Failed to load widget script: ${scriptSrc}`);
      setStatus("error");
      setError(nextError);
      onError?.(nextError);
    };

    if (loadedScripts.has(scriptSrc)) {
      handleLoad();
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.dataset.asriuiWidget = scriptSrc;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    mount.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
      if (script.parentNode === mount) {
        mount.removeChild(script);
      }
    };
  }, [attrs, enabled, onError, onLoad, retryKey, scriptSrc, slotId]);

  const retry = useCallback(() => {
    if (!scriptSrc) return;
    loadedScripts.delete(scriptSrc);
    setStatus("idle");
    setError(null);
    setRetryKey((value) => value + 1);
  }, [scriptSrc]);

  return { mountRef, status, error, retry };
}
