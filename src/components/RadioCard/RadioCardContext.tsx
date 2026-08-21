import { createContext, useContext } from "react";

export type RadioCardGroupContextValue = {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

const RadioCardGroupContext = createContext<RadioCardGroupContextValue | null>(null);

export const RadioCardGroupProvider = RadioCardGroupContext.Provider;

export function useRadioCardGroup(): RadioCardGroupContextValue | null {
  return useContext(RadioCardGroupContext);
}
