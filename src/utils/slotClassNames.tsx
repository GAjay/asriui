import { createContext, useContext, type ReactNode } from "react";

/** Map of slot names to custom class strings for compound components. */
export type SlotClassNames<T extends string> = Partial<Record<T, string>>;

export function createSlotClassNames<T extends string>() {
  const Context = createContext<SlotClassNames<T> | null>(null);

  function SlotClassNamesProvider({
    classNames,
    children,
  }: {
    classNames?: SlotClassNames<T>;
    children: ReactNode;
  }) {
    const parent = useContext(Context);
    const merged = parent || classNames ? { ...parent, ...classNames } : null;
    return <Context.Provider value={merged}>{children}</Context.Provider>;
  }

  function useSlotClassName(slot: T): string | undefined {
    return useContext(Context)?.[slot];
  }

  return { SlotClassNamesProvider, useSlotClassName };
}
