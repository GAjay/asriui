import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ResetContextValue<T extends Record<string, unknown>> = {
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setValue: <K extends keyof T>(key: K, value: T[K]) => void;
  reset: () => void;
  defaults: T;
};

const ResetContext = createContext<ResetContextValue<Record<string, unknown>> | null>(null);

export function useReset<T extends Record<string, unknown> = Record<string, unknown>>() {
  const context = useContext(ResetContext);
  if (!context) {
    throw new Error("useReset must be used within Reset.Root");
  }
  return context as ResetContextValue<T>;
}

export function useResetOptional<T extends Record<string, unknown> = Record<string, unknown>>() {
  return useContext(ResetContext) as ResetContextValue<T> | null;
}

type ResetProviderProps<T extends Record<string, unknown>> = {
  defaults: T;
  children: ReactNode | ((context: ResetContextValue<T>) => ReactNode);
};

export function ResetProvider<T extends Record<string, unknown>>({
  defaults,
  children,
}: ResetProviderProps<T>) {
  const [values, setValues] = useState<T>(defaults);

  const reset = useCallback(() => {
    setValues(defaults);
  }, [defaults]);

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  const contextValue = useMemo(
    () => ({
      values,
      setValues,
      setValue,
      reset,
      defaults,
    }),
    [defaults, reset, setValue, values],
  );

  return (
    <ResetContext.Provider value={contextValue as ResetContextValue<Record<string, unknown>>}>
      {typeof children === "function" ? children(contextValue) : children}
    </ResetContext.Provider>
  );
}
