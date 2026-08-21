import { createContext, useContext } from "react";
import type { AsriUIConfigContextValue } from "./types";

export const AsriUIContext = createContext<AsriUIConfigContextValue | null>(null);

export function useAsriUIConfig(): AsriUIConfigContextValue {
  const ctx = useContext(AsriUIContext);
  if (!ctx) {
    throw new Error("useAsriUIConfig must be used within AsriUIProvider");
  }
  return ctx;
}

/** Returns null outside provider — safe for optional library integrations. */
export function useAsriUIConfigOptional(): AsriUIConfigContextValue | null {
  return useContext(AsriUIContext);
}
