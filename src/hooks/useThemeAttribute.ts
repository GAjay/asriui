import { useEffect } from "react";

/**
 * Syncs `data-theme` on a target element. Useful for Storybook / docs demos.
 * Library components do not depend on this hook — theming is CSS-variable driven.
 */
export function useThemeAttribute(
  theme: "light" | "dark" | string,
  target: HTMLElement | null = typeof document !== "undefined" ? document.documentElement : null,
): void {
  useEffect(() => {
    if (!target) return;
    target.setAttribute("data-theme", theme);
  }, [theme, target]);
}
