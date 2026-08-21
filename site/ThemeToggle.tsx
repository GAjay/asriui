import { ThemeSwitch, type ThemeSwitchAnimation, type ThemeSwitchMode } from "../src/components/ThemeSwitch";

export type ThemeMode = ThemeSwitchMode;

type ThemeToggleProps = {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  className?: string;
  /** View-transition animation. @default "ripple" */
  animation?: ThemeSwitchAnimation;
};

/** Site theme toggle — thin wrapper around the library ThemeSwitch. */
export function ThemeToggle({ theme, onThemeChange, className, animation = "ripple" }: ThemeToggleProps) {
  return (
    <ThemeSwitch
      theme={theme}
      onThemeChange={onThemeChange}
      animation={animation}
      className={className}
    />
  );
}
