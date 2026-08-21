import { useCallback } from "react";
import { useToastContext, useToastContextOptional } from "./ToastContext";
import type { ToastInput } from "./Toast.types";

export function useToast() {
  const { publish, dismiss, dismissAll } = useToastContext("useToast");

  const toast = useCallback(
    (input: ToastInput) => publish(input),
    [publish],
  );

  return { toast, dismiss, dismissAll };
}

/** Safe toast hook — no-ops when ToastProvider is not mounted (useful in tests). */
export function useToastOptional() {
  const context = useToastContextOptional();

  const toast = useCallback(
    (input: ToastInput) => context?.publish(input) ?? "",
    [context],
  );

  return {
    toast,
    dismiss: context?.dismiss ?? (() => undefined),
    dismissAll: context?.dismissAll ?? (() => undefined),
    enabled: Boolean(context),
  };
}
