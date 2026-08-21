import { flushSync } from "react-dom";

export type ThemeTransitionAnimation = "ripple" | "fade" | "wipe" | "blur" | "slide";

export function getThemeRevealRadius(x: number, y: number) {
  return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 24;
}

type ThemeTransitionEvent = Pick<MouseEvent, "clientX" | "clientY">;

export type RunThemeTransitionOptions = {
  reducedMotion?: boolean;
  /** View-transition style. @default "ripple" */
  animation?: ThemeTransitionAnimation;
};

/**
 * Applies a theme change with a View Transition animation from the click point.
 * Falls back to an immediate update when reduced motion is preferred or VT is unsupported.
 */
export function runThemeTransition(
  event: ThemeTransitionEvent,
  apply: () => void,
  options?: RunThemeTransitionOptions,
) {
  const animation = options?.animation ?? "ripple";

  if (options?.reducedMotion || typeof document.startViewTransition !== "function") {
    apply();
    return Promise.resolve();
  }

  const root = document.documentElement;
  const x = event.clientX;
  const y = event.clientY;
  const radius = getThemeRevealRadius(x, y);

  root.dataset.asriuiThemeAnimation = animation;
  root.style.setProperty("--asriui-theme-x", `${x}px`);
  root.style.setProperty("--asriui-theme-y", `${y}px`);
  root.style.setProperty("--asriui-theme-r", `${radius}px`);
  /* Back-compat with site landing.css */
  root.style.setProperty("--theme-x", `${x}px`);
  root.style.setProperty("--theme-y", `${y}px`);
  root.style.setProperty("--theme-r", `${radius}px`);

  const transition = document.startViewTransition(() => {
    flushSync(apply);
  });

  return transition.finished.finally(() => {
    root.style.removeProperty("--asriui-theme-x");
    root.style.removeProperty("--asriui-theme-y");
    root.style.removeProperty("--asriui-theme-r");
    root.style.removeProperty("--theme-x");
    root.style.removeProperty("--theme-y");
    root.style.removeProperty("--theme-r");
    delete root.dataset.asriuiThemeAnimation;
  });
}
