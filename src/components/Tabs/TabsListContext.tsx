import { createContext, useContext } from "react";
import type { TabsVariant } from "./Tabs.types";

export type TabsListContextValue = {
  variant: TabsVariant;
};

export const TabsListContext = createContext<TabsListContextValue | null>(null);

export function useTabsListContext(component: string): TabsListContextValue {
  const context = useContext(TabsListContext);
  if (!context) {
    throw new Error(`${component} must be used within Tabs.List`);
  }
  return context;
}
