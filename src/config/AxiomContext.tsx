import { createContext, useContext } from "react";
import type { AxiomConfigContextValue } from "./types";

export const AxiomContext = createContext<AxiomConfigContextValue | null>(null);

export function useAxiomConfig(): AxiomConfigContextValue {
  const ctx = useContext(AxiomContext);
  if (!ctx) {
    throw new Error("useAxiomConfig must be used within AxiomProvider");
  }
  return ctx;
}

/** Returns null outside provider — safe for optional library integrations. */
export function useAxiomConfigOptional(): AxiomConfigContextValue | null {
  return useContext(AxiomContext);
}
