import { useId } from "react";

/**
 * Returns a stable unique id that is safe for SSR (React 18+ `useId`).
 */
export function useAsriUIId(prefix = "asriui"): string {
  const id = useId();
  return `${prefix}-${id.replace(/:/g, "")}`;
}
