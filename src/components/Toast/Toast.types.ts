import type { CSSProperties, ComponentType, ReactNode, SVGProps } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

/** Visual style for toast notifications. */
export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export type ToastVariantAppearance = {
  accent: string;
  background?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  icon?: ReactNode;
};

/** Per-variant colors and icons — merge with defaults via ToastProvider `variants`. */
export type ToastVariantsConfig = Partial<
  Record<
    ToastVariant,
    {
      accent?: string;
      background?: string;
      icon?: ReactNode;
    }
  >
>;

export type ToastClassNames = SlotClassNames<"root" | "toast" | "icon" | "body" | "title" | "description" | "progress">;

/** Viewport position for the toast stack. */
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type ToastAction = {
  label: string;
  onClick: () => void;
  /** Close the toast after the action runs. @default true */
  dismissOnClick?: boolean;
};

export type ToastInput = {
  /** Short heading. */
  title?: ReactNode;
  /** Supporting message. */
  description?: ReactNode;
  /** Visual variant. @default "default" */
  variant?: ToastVariant;
  /** Override variant accent color (border, icon, progress, action). */
  accentColor?: string;
  /** Override toast background color. */
  backgroundColor?: string;
  /** Custom icon — overrides the variant default. */
  icon?: ReactNode;
  /** Auto-dismiss after ms. Set 0 to persist. @default 5000 */
  duration?: number;
  /** Show auto-dismiss progress bar at the bottom. @default provider value */
  showProgress?: boolean;
  /** Optional action button (e.g. Undo, Get support). */
  action?: ToastAction;
};

export type ToastRecord = ToastInput & {
  id: string;
  createdAt: number;
  open: boolean;
};

export type ToastProviderProps = {
  children: ReactNode;
  /** Stack position. @default "bottom-right" */
  position?: ToastPosition;
  /** Default auto-dismiss duration in ms. @default 5000 */
  duration?: number;
  /** Max visible toasts before older ones are removed. @default 5 */
  limit?: number;
  /** Show bottom progress bar while auto-dismissing. @default true */
  showProgress?: boolean;
  /** Override default variant colors and icons. */
  variants?: ToastVariantsConfig;
  /** Override class names for toast slots — merged with each part's `className`. */
  classNames?: ToastClassNames;
};

export type ToastViewportProps = {
  className?: string;
  style?: CSSProperties;
};

export type ToastItemProps = {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
  position: ToastPosition;
  showProgress: boolean;
  classNames?: ToastClassNames;
};

export type ToastContextValue = {
  toasts: ToastRecord[];
  position: ToastPosition;
  defaultDuration: number;
  defaultShowProgress: boolean;
  limit: number;
  variants: Record<ToastVariant, ToastVariantAppearance>;
  classNames?: ToastClassNames;
  publish: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};
