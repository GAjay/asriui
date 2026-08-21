import { createContext, useContext } from "react";
import type { MenuPlacement } from "./Menu.types";

export type MenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  placement: MenuPlacement;
  closeOnSelect: boolean;
  portal: boolean;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({
  value,
  children,
}: {
  value: MenuContextValue;
  children: React.ReactNode;
}) {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuContext(part: string) {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error(`${part} must be used within <Menu>.`);
  }
  return context;
}
