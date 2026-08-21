import { createContext, useContext } from "react";
import type { SideNavCollapseMode, SideNavSide } from "./SideNav.types";

export type SideNavContextValue = {
  collapsible: boolean;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  side: SideNavSide;
  collapseMode: SideNavCollapseMode;
};

export const SideNavContext = createContext<SideNavContextValue | null>(null);

export function useSideNavContext() {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error("useSideNavContext must be used within SideNav.");
  }
  return context;
}

export function useSideNavContextOptional() {
  return useContext(SideNavContext);
}
