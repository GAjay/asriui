import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";
import {
  ToastDefaultIcon,
  ToastErrorIcon,
  ToastInfoIcon,
  ToastSuccessIcon,
  ToastWarningIcon,
} from "./toastIcons";
import type { ToastInput, ToastRecord, ToastVariant, ToastVariantAppearance, ToastVariantsConfig } from "./Toast.types";

export type { ToastVariantAppearance };

export type ToastIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type ResolvedToastAppearance = {
  accent: string;
  background?: string;
  icon: ReactNode;
};

export const DEFAULT_TOAST_VARIANTS = {
  default: {
    accent: "var(--asriui-color-primary)",
    background: "var(--asriui-color-background)",
    Icon: ToastDefaultIcon,
  },
  success: {
    accent: "var(--asriui-color-success, #059669)",
    background: "color-mix(in srgb, var(--asriui-color-success, #059669) 12%, var(--asriui-color-background))",
    Icon: ToastSuccessIcon,
  },
  error: {
    accent: "var(--asriui-color-destructive, #dc2626)",
    background: "color-mix(in srgb, var(--asriui-color-destructive, #dc2626) 12%, var(--asriui-color-background))",
    Icon: ToastErrorIcon,
  },
  warning: {
    accent: "var(--asriui-color-warning, #d97706)",
    background: "color-mix(in srgb, var(--asriui-color-warning, #d97706) 14%, var(--asriui-color-background))",
    Icon: ToastWarningIcon,
  },
  info: {
    accent: "var(--asriui-color-info, #2563eb)",
    background: "color-mix(in srgb, var(--asriui-color-info, #2563eb) 12%, var(--asriui-color-background))",
    Icon: ToastInfoIcon,
  },
} satisfies Record<ToastVariant, ToastVariantAppearance>;

export function mergeToastVariants(
  base: Record<ToastVariant, ToastVariantAppearance>,
  overrides?: ToastVariantsConfig,
): Record<ToastVariant, ToastVariantAppearance> {
  if (!overrides) return base;

  return (Object.keys(base) as ToastVariant[]).reduce(
    (merged, variant) => ({
      ...merged,
      [variant]: { ...base[variant], ...overrides[variant] },
    }),
    {} as Record<ToastVariant, ToastVariantAppearance>,
  );
}

export function resolveToastAppearance(
  toast: ToastRecord | ToastInput,
  variants: Record<ToastVariant, ToastVariantAppearance>,
  iconClassName?: string,
): ResolvedToastAppearance {
  const variant = toast.variant ?? "default";
  const config = variants[variant] ?? variants.default;
  const Icon = config.Icon ?? ToastDefaultIcon;

  const icon =
    toast.icon ??
    config.icon ??
    (Icon ? <Icon className={iconClassName} /> : null);

  return {
    accent: toast.accentColor ?? config.accent,
    background: toast.backgroundColor ?? config.background,
    icon,
  };
}

export function toastAppearanceStyle(appearance: ResolvedToastAppearance): CSSProperties {
  return {
    "--toast-accent": appearance.accent,
    "--toast-surface": appearance.background,
  } as CSSProperties;
}
