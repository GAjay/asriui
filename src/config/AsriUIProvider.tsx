import { useEffect, useMemo, type ReactNode } from "react";
import { MotionProvider } from "../motion/MotionContext";
import { initGtm } from "./analytics";
import { AsriUIContext } from "./AsriUIContext";
import { installDebugGlobalHandlers, setDebugRuntime } from "./debug";
import { resolveAsriUIConfig } from "./defaults";
import type { AsriUIConfig } from "./types";

export type AsriUIProviderProps = {
  /** Plug-and-play global configuration. */
  config?: AsriUIConfig;
  children: ReactNode;
};

/**
 * Root provider for theming, fonts, GTM analytics, and error monitoring.
 * Wrap your app once and configure via the `config` prop.
 */
export function AsriUIProvider({ config, children }: AsriUIProviderProps) {
  const resolved = useMemo(() => resolveAsriUIConfig(config), [config]);

  useEffect(() => {
    setDebugRuntime(resolved.debug);
    return installDebugGlobalHandlers(resolved.debug);
  }, [resolved.debug]);

  useEffect(() => {
    if (!resolved.analytics.gtmId) return undefined;

    const gtmId = resolved.analytics.gtmId;
    const dataLayerName = resolved.analytics.dataLayerName;
    let idleId = 0;
    let timeoutId = 0;

    const start = () => {
      initGtm(gtmId, dataLayerName);
    };

    const onLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(start, 1500);
      }
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [resolved.analytics.dataLayerName, resolved.analytics.gtmId]);

  useEffect(() => {
    document.documentElement.style.setProperty("--asriui-font-family", resolved.fontFamily);
    document.documentElement.style.setProperty("--lp-font-sans", resolved.fontFamily);
  }, [resolved.fontFamily]);

  useEffect(() => {
    if (resolved.theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () =>
        document.documentElement.setAttribute("data-theme", mq.matches ? "dark" : "light");
      apply();
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    document.documentElement.setAttribute("data-theme", resolved.theme);
    return undefined;
  }, [resolved.theme]);

  return (
    <AsriUIContext.Provider value={resolved}>
      <MotionProvider preset={resolved.motion.preset} enabled={resolved.motion.enabled}>
        {children}
      </MotionProvider>
    </AsriUIContext.Provider>
  );
}
