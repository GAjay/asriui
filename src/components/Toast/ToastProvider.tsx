import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { useAsriUIId } from "../../hooks/useAsriUIId";
import { cn } from "../../utils/cn";
import { registerToastApi } from "./toast";
import { ToastContext } from "./ToastContext";
import { ToastItem } from "./ToastItem";
import type { ToastInput, ToastProviderProps, ToastRecord } from "./Toast.types";
import { DEFAULT_TOAST_VARIANTS, mergeToastVariants } from "./toastVariants";
import styles from "./Toast.module.css";

const POSITION_CLASS: Record<NonNullable<ToastProviderProps["position"]>, string> = {
  "top-right": styles.topRight ?? "",
  "top-left": styles.topLeft ?? "",
  "top-center": styles.topCenter ?? "",
  "bottom-right": styles.bottomRight ?? "",
  "bottom-left": styles.bottomLeft ?? "",
  "bottom-center": styles.bottomCenter ?? "",
};

function ToastViewport({
  toasts,
  position,
  showProgress,
  classNames,
  onDismiss,
}: {
  toasts: ToastRecord[];
  position: NonNullable<ToastProviderProps["position"]>;
  showProgress: boolean;
  classNames?: ToastProviderProps["classNames"];
  onDismiss: (id: string) => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cn(styles.root, POSITION_CLASS[position], classNames?.root)}
      aria-label="Notifications"
      role="region"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            position={position}
            showProgress={toast.showProgress ?? showProgress}
            classNames={classNames}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

/**
 * Provides a toast notification stack and imperative `toast()` API via `useToast`.
 */
export function ToastProvider({
  children,
  position = "bottom-right",
  duration = 5000,
  limit = 5,
  showProgress = true,
  variants: variantOverrides,
  classNames,
}: ToastProviderProps) {
  const idPrefix = useAsriUIId("toast");
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const variants = useMemo(
    () => mergeToastVariants(DEFAULT_TOAST_VARIANTS, variantOverrides),
    [variantOverrides],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const publish = useCallback(
    (input: ToastInput) => {
      const id = `${idPrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const record: ToastRecord = {
        ...input,
        id,
        createdAt: Date.now(),
        open: true,
        duration: input.duration ?? duration,
      };

      setToasts((current) => [record, ...current].slice(0, limit));
      return id;
    },
    [duration, idPrefix, limit],
  );

  const value = useMemo(
    () => ({
      toasts,
      position,
      defaultDuration: duration,
      defaultShowProgress: showProgress,
      limit,
      variants,
      classNames,
      publish,
      dismiss,
      dismissAll,
    }),
    [classNames, dismiss, dismissAll, duration, limit, position, publish, showProgress, toasts, variants],
  );

  useEffect(() => {
    registerToastApi({ publish, dismiss });
    return () => registerToastApi(null);
  }, [publish, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport
        toasts={toasts}
        position={position}
        showProgress={showProgress}
        classNames={classNames}
        onDismiss={dismiss}
      />
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = "ToastProvider";
