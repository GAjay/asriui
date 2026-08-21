import { useCallback, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { cn } from "../../utils/cn";
import { runThemeTransition } from "../../utils/themeTransition";
import type { ThemeSwitchMode, ThemeSwitchProps } from "./ThemeSwitch.types";
import styles from "./ThemeSwitch.module.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 6.5 6.5 0 1 0 20 14.5Z" />
    </svg>
  );
}

/**
 * Accessible light/dark theme toggle with View Transition animations (ripple, fade, wipe, blur, slide).
 */
export function ThemeSwitch({
  theme,
  onThemeChange,
  animation = "ripple",
  size = "md",
  showLabel = false,
  className,
  onClick,
  ...rest
}: ThemeSwitchProps) {
  const reducedMotion = useReducedMotion();
  const nextTheme: ThemeSwitchMode = theme === "light" ? "dark" : "light";

  const applyTheme = useCallback(
    (target: ThemeSwitchMode) => {
      onThemeChange(target);
      document.documentElement.setAttribute("data-theme", target);
    },
    [onThemeChange],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      const target = theme === "light" ? "dark" : "light";
      void runThemeTransition(event, () => applyTheme(target), { reducedMotion, animation });
    },
    [animation, applyTheme, onClick, reducedMotion, theme],
  );

  return (
    <button
      type="button"
      className={cn(
        styles.toggle,
        size === "sm" && styles.sizeSm,
        size === "md" && styles.sizeMd,
        size === "lg" && styles.sizeLg,
        className,
      )}
      onClick={handleClick}
      aria-label={`Switch to ${nextTheme} theme`}
      data-theme={theme}
      data-animation={animation}
      {...rest}
    >
      <span className={styles.iconShell} aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            className={styles.icon}
            initial={reducedMotion ? false : { opacity: 0, rotate: -70, scale: 0.55 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, rotate: 70, scale: 0.55 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        </AnimatePresence>
      </span>
      {showLabel ? <span className={styles.label}>{theme === "light" ? "Light" : "Dark"}</span> : null}
      <span className={styles.rippleRing} aria-hidden="true" />
    </button>
  );
}
