import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeMode } from "./ThemeToggle";

const STORAGE_KEY = "asriui-site-theme";

type SiteThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

export function readSiteTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function applySiteTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(readSiteTheme);

  useEffect(() => {
    applySiteTheme(theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <SiteThemeContext.Provider value={value}>{children}</SiteThemeContext.Provider>;
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error("useSiteTheme must be used within SiteThemeProvider");
  }
  return context;
}
