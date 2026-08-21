import { createContext, useContext } from "react";
import type { ToastContextValue } from "./Toast.types";

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext(component: string): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(`${component} must be used within ToastProvider`);
  }
  return context;
}

export function useToastContextOptional(): ToastContextValue | null {
  return useContext(ToastContext);
}
