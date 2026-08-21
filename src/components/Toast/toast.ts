import type { ToastInput } from "./Toast.types";

type ToastPublisher = (input: ToastInput) => string;
type ToastDismisser = (id: string) => void;

let publishToast: ToastPublisher | null = null;
let dismissToast: ToastDismisser | null = null;

export function registerToastApi(api: { publish: ToastPublisher; dismiss: ToastDismisser } | null) {
  publishToast = api?.publish ?? null;
  dismissToast = api?.dismiss ?? null;
}

/**
 * Imperative toast API — works anywhere inside `ToastProvider`.
 */
export function toast(input: ToastInput): string {
  if (!publishToast) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[asriui] toast() called without ToastProvider — notification skipped.");
    }
    return "";
  }
  return publishToast(input);
}

toast.success = (title: ToastInput["title"], options?: Omit<ToastInput, "title" | "variant">) =>
  toast({ title, variant: "success", ...options });

toast.error = (title: ToastInput["title"], options?: Omit<ToastInput, "title" | "variant">) =>
  toast({ title, variant: "error", ...options });

toast.warning = (title: ToastInput["title"], options?: Omit<ToastInput, "title" | "variant">) =>
  toast({ title, variant: "warning", ...options });

toast.info = (title: ToastInput["title"], options?: Omit<ToastInput, "title" | "variant">) =>
  toast({ title, variant: "info", ...options });

toast.dismiss = (id: string) => {
  dismissToast?.(id);
};
