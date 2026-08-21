import { createContext, useContext, type RefObject } from "react";

export type ScrollAreaContextValue = {
  viewportRef: RefObject<HTMLElement | null>;
  viewport: HTMLElement | null;
  page: boolean;
};

export const ScrollAreaContext = createContext<ScrollAreaContextValue | null>(null);

export function useScrollAreaContext() {
  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error("useScrollAreaContext must be used within ScrollArea.");
  }
  return context;
}

export function useScrollAreaContextOptional() {
  return useContext(ScrollAreaContext);
}
