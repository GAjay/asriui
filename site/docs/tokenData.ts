/** Token reference data — mirrors src/tokens/*.css */

export type ThemeColorRow = {
  token: string;
  light: string;
  dark: string;
};

export type ColorGroup = {
  group: string;
  items: ThemeColorRow[];
};

export type StaticToken = {
  token: string;
  value: string;
};

export type ThemeShadowRow = {
  token: string;
  label: string;
  light: string;
  dark: string;
};

export const TOKEN_FILES = [
  { file: "colors.css", scope: ":root, [data-theme=\"light\"]", description: "Brand, surfaces, and feedback colors." },
  { file: "themes.css", scope: "[data-theme=\"dark\"]", description: "Dark theme color and shadow overrides." },
  { file: "spacing.css", scope: ":root", description: "4px-based spacing scale." },
  { file: "radius.css", scope: ":root", description: "Border radius steps." },
  { file: "shadows.css", scope: ":root, [data-theme=\"light\"]", description: "Elevation shadows and focus ring." },
  { file: "typography.css", scope: ":root", description: "Font families, sizes, weights, leading, tracking." },
  { file: "transitions.css", scope: ":root", description: "Motion durations and easing curves." },
  { file: "z-index.css", scope: ":root", description: "Stacking order for overlays and popovers." },
  { file: "breakpoints.css", scope: ":root", description: "Responsive width breakpoints." },
] as const;

export const COLOR_GROUPS: ColorGroup[] = [
  {
    group: "Brand — primary",
    items: [
      { token: "--axiom-color-primary", light: "#000000", dark: "#fafafa" },
      { token: "--axiom-color-primary-hover", light: "#1a1a1a", dark: "#e4e4e7" },
      { token: "--axiom-color-primary-active", light: "#333333", dark: "#d4d4d8" },
      { token: "--axiom-color-primary-foreground", light: "#ffffff", dark: "#09090b" },
    ],
  },
  {
    group: "Brand — secondary",
    items: [
      { token: "--axiom-color-secondary", light: "#71717a", dark: "#a1a1aa" },
      { token: "--axiom-color-secondary-hover", light: "#52525b", dark: "#d4d4d8" },
      { token: "--axiom-color-secondary-active", light: "#3f3f46", dark: "#e4e4e7" },
      { token: "--axiom-color-secondary-foreground", light: "#ffffff", dark: "#09090b" },
    ],
  },
  {
    group: "Brand — danger",
    items: [
      { token: "--axiom-color-danger", light: "#dc2626", dark: "#f87171" },
      { token: "--axiom-color-danger-hover", light: "#b91c1c", dark: "#fca5a5" },
      { token: "--axiom-color-danger-active", light: "#991b1b", dark: "#fecaca" },
      { token: "--axiom-color-danger-foreground", light: "#ffffff", dark: "#450a0a" },
    ],
  },
  {
    group: "Surfaces",
    items: [
      { token: "--axiom-color-background", light: "#ffffff", dark: "#09090b" },
      { token: "--axiom-color-foreground", light: "#09090b", dark: "#fafafa" },
      { token: "--axiom-color-muted", light: "#f4f4f5", dark: "#18181b" },
      { token: "--axiom-color-muted-foreground", light: "#52525b", dark: "#a1a1aa" },
      { token: "--axiom-color-border", light: "#e4e4e7", dark: "#27272a" },
      { token: "--axiom-color-ring", light: "#09090b", dark: "#fafafa" },
      { token: "--axiom-color-overlay", light: "rgb(9 9 11 / 0.5)", dark: "rgb(0 0 0 / 0.7)" },
    ],
  },
  {
    group: "Feedback",
    items: [
      { token: "--axiom-color-error", light: "#dc2626", dark: "#f87171" },
      { token: "--axiom-color-error-muted", light: "#fef2f2", dark: "#450a0a" },
      { token: "--axiom-color-success", light: "#16a34a", dark: "#4ade80" },
      { token: "--axiom-color-warning", light: "#ca8a04", dark: "#facc15" },
    ],
  },
];

export const SPACING_TOKENS: StaticToken[] = [
  { token: "--axiom-space-0", value: "0" },
  { token: "--axiom-space-1", value: "4px" },
  { token: "--axiom-space-2", value: "8px" },
  { token: "--axiom-space-3", value: "12px" },
  { token: "--axiom-space-4", value: "16px" },
  { token: "--axiom-space-5", value: "20px" },
  { token: "--axiom-space-6", value: "24px" },
  { token: "--axiom-space-8", value: "32px" },
  { token: "--axiom-space-10", value: "40px" },
  { token: "--axiom-space-12", value: "48px" },
  { token: "--axiom-space-16", value: "64px" },
];

export const RADIUS_TOKENS: StaticToken[] = [
  { token: "--axiom-radius-none", value: "0" },
  { token: "--axiom-radius-sm", value: "4px" },
  { token: "--axiom-radius-md", value: "8px" },
  { token: "--axiom-radius-lg", value: "12px" },
  { token: "--axiom-radius-xl", value: "16px" },
  { token: "--axiom-radius-full", value: "9999px" },
];

export const SHADOW_TOKENS: ThemeShadowRow[] = [
  {
    token: "--axiom-shadow-xs",
    label: "xs",
    light: "0 1px 2px rgb(9 9 11 / 0.05)",
    dark: "0 1px 2px rgb(0 0 0 / 0.3)",
  },
  {
    token: "--axiom-shadow-sm",
    label: "sm",
    light: "0 1px 3px rgb(9 9 11 / 0.1), 0 1px 2px rgb(9 9 11 / 0.06)",
    dark: "0 1px 3px rgb(0 0 0 / 0.4), 0 1px 2px rgb(0 0 0 / 0.3)",
  },
  {
    token: "--axiom-shadow-md",
    label: "md",
    light: "0 4px 6px -1px rgb(9 9 11 / 0.1), 0 2px 4px -2px rgb(9 9 11 / 0.1)",
    dark: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
  },
  {
    token: "--axiom-shadow-lg",
    label: "lg",
    light: "0 10px 15px -3px rgb(9 9 11 / 0.1), 0 4px 6px -4px rgb(9 9 11 / 0.1)",
    dark: "0 10px 15px -3px rgb(0 0 0 / 0.45), 0 4px 6px -4px rgb(0 0 0 / 0.35)",
  },
  {
    token: "--axiom-shadow-focus",
    label: "focus",
    light: "0 0 0 3px rgb(9 9 11 / 0.25)",
    dark: "0 0 0 3px rgb(250 250 250 / 0.35)",
  },
];

export const TYPOGRAPHY_TOKENS: StaticToken[] = [
  {
    token: "--axiom-font-family",
    value: '"Work Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  {
    token: "--axiom-font-family-mono",
    value: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  { token: "--axiom-font-size-xs", value: "0.75rem" },
  { token: "--axiom-font-size-sm", value: "0.875rem" },
  { token: "--axiom-font-size-md", value: "1rem" },
  { token: "--axiom-font-size-lg", value: "1.125rem" },
  { token: "--axiom-font-size-xl", value: "1.25rem" },
  { token: "--axiom-font-size-2xl", value: "1.5rem" },
  { token: "--axiom-font-weight-regular", value: "400" },
  { token: "--axiom-font-weight-medium", value: "500" },
  { token: "--axiom-font-weight-semibold", value: "600" },
  { token: "--axiom-font-weight-bold", value: "700" },
  { token: "--axiom-line-height-tight", value: "1.25" },
  { token: "--axiom-line-height-normal", value: "1.5" },
  { token: "--axiom-line-height-relaxed", value: "1.625" },
  { token: "--axiom-letter-spacing-tight", value: "-0.01em" },
  { token: "--axiom-letter-spacing-normal", value: "0" },
];

export const MOTION_TOKENS: StaticToken[] = [
  { token: "--axiom-duration-fast", value: "120ms" },
  { token: "--axiom-duration-normal", value: "200ms" },
  { token: "--axiom-duration-slow", value: "300ms" },
  { token: "--axiom-easing-standard", value: "cubic-bezier(0.2, 0, 0, 1)" },
  { token: "--axiom-easing-emphasized", value: "cubic-bezier(0.2, 0, 0, 1.2)" },
];

export const Z_INDEX_TOKENS: StaticToken[] = [
  { token: "--axiom-z-base", value: "0" },
  { token: "--axiom-z-dropdown", value: "1000" },
  { token: "--axiom-z-sticky", value: "1100" },
  { token: "--axiom-z-overlay", value: "1200" },
  { token: "--axiom-z-modal", value: "1300" },
  { token: "--axiom-z-popover", value: "1400" },
  { token: "--axiom-z-toast", value: "1500" },
  { token: "--axiom-z-tooltip", value: "1600" },
];

export const BREAKPOINT_TOKENS: StaticToken[] = [
  { token: "--axiom-breakpoint-sm", value: "640px" },
  { token: "--axiom-breakpoint-md", value: "768px" },
  { token: "--axiom-breakpoint-lg", value: "1024px" },
  { token: "--axiom-breakpoint-xl", value: "1280px" },
  { token: "--axiom-breakpoint-2xl", value: "1536px" },
];
