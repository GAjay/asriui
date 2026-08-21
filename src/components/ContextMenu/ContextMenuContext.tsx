import { createContext, useContext } from "react";

type ContextMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  point: { x: number; y: number };
  setPoint: (point: { x: number; y: number }) => void;
};

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

export const ContextMenuProvider = ContextMenuContext.Provider;

export function useContextMenu(component: string) {
  const value = useContext(ContextMenuContext);
  if (!value) {
    throw new Error(`${component} must be used within ContextMenu`);
  }
  return value;
}
