import { createContext, useContext } from "react";
import type { AccordionType, AccordionVariant } from "./Accordion.types";

export type AccordionContextValue = {
  type: AccordionType;
  collapsible: boolean;
  variant: AccordionVariant;
  disabled: boolean;
  idPrefix: string;
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
};

export type AccordionItemContextValue = {
  value: string;
  disabled: boolean;
  open: boolean;
  triggerId: string;
  contentId: string;
};

export const AccordionContext = createContext<AccordionContextValue | null>(null);
export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionContext(component: string): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(`${component} must be used within Accordion`);
  }
  return context;
}

export function useAccordionItemContext(component: string): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(`${component} must be used within Accordion.Item`);
  }
  return context;
}
