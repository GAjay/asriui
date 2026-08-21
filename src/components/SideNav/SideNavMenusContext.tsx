import { createContext, useContext } from "react";

export type SideNavMenusContextValue = {
  activeMenu: string;
  setActiveMenu: (menuId: string) => void;
};

export const SideNavMenusContext = createContext<SideNavMenusContextValue | null>(null);

export function useSideNavMenusContext() {
  const context = useContext(SideNavMenusContext);
  if (!context) {
    throw new Error("useSideNavMenusContext must be used within SideNav.Menus.");
  }
  return context;
}

export function useSideNavMenusContextOptional() {
  return useContext(SideNavMenusContext);
}
