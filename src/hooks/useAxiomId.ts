import { useId } from "react";

/**
 * Returns a stable unique id that is safe for SSR (React 18+ `useId`).
 */
export function useAxiomId(prefix = "axiom"): string {
  const id = useId();
  return `${prefix}-${id.replace(/:/g, "")}`;
}
