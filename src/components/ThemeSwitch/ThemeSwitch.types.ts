import type { ButtonHTMLAttributes } from "react";
import type { ThemeTransitionAnimation } from "../../utils/themeTransition";

export type ThemeSwitchMode = "light" | "dark";

export type ThemeSwitchAnimation = ThemeTransitionAnimation;

export type ThemeSwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "children"> & {
  /** Current theme. */
  theme: ThemeSwitchMode;
  /** Called when the user toggles theme. */
  onThemeChange: (theme: ThemeSwitchMode) => void;
  /**
   * View-transition animation used when switching themes.
   * @default "ripple"
   */
  animation?: ThemeSwitchAnimation;
  /** Visual size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Show Light / Dark text beside the icon. @default false */
  showLabel?: boolean;
};
