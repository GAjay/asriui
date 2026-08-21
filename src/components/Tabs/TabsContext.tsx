import { createContext, useContext } from "react";
import type { TabsVariant } from "./Tabs.types";

export type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  idPrefix: string;
  animated: boolean;
  variant: TabsVariant;
};

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${component} must be used within Tabs`);
  }
  return context;
}
