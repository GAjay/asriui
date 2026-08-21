import { createContext, useContext, type ReactNode } from "react";
import type { DropdownOption, DropdownPlacement, DropdownSize } from "./Dropdown.types";

export type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  values: string[];
  multiple: boolean;
  setValue: (value: string) => void;
  triggerId: string;
  contentId: string;
  placement: DropdownPlacement;
  placeholder?: string;
  disabled?: boolean;
  error?: ReactNode;
  searchable: boolean;
  query: string;
  setQuery: (query: string) => void;
  portal: boolean;
  listMaxHeight?: number | string;
  size: DropdownSize;
  registerItem: (value: string, label: ReactNode, searchText?: string) => void;
  unregisterItem: (value: string) => void;
  getItemLabel: (value: string) => ReactNode | undefined;
  getItemSearchText: (value: string) => string | undefined;
  optionItems: DropdownOption[];
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function DropdownProvider({
  value,
  children,
}: {
  value: DropdownContextValue;
  children: ReactNode;
}) {
  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
}

export function useDropdownContext(part: string) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(`${part} must be used within <Dropdown>.`);
  }
  return context;
}
