import { createContext, useContext, type RefObject } from "react";

export type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  triggerRef: RefObject<HTMLElement | null>;
  registerTrigger: (element: HTMLElement | null) => void;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext(component: string): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used within Dialog`);
  }
  return context;
}
