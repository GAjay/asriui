import { createContext, useContext, type ReactNode } from "react";
import type { TooltipPlacement } from "./Tooltip.types";

export type TooltipContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  placement: TooltipPlacement;
  setPlacement: (placement: TooltipPlacement) => void;
  sideOffset: number;
  setSideOffset: (offset: number) => void;
  registerTrigger: (node: HTMLElement | null) => void;
  registerContent: (node: HTMLElement | null) => void;
  scheduleShow: () => void;
  scheduleHide: () => void;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

export function TooltipProvider({
  value,
  children,
}: {
  value: TooltipContextValue;
  children: ReactNode;
}) {
  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}

export function useTooltipContext(part: string) {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error(`${part} must be used within <Tooltip>.`);
  }
  return context;
}
