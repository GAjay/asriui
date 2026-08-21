import { createContext, useContext } from "react";

export type RadioGroupContextValue = {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroupProvider = RadioGroupContext.Provider;

export function useRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
