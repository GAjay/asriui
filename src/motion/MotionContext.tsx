import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getMotionPreset, type MotionPresetName, type MotionPresetPack } from "./presetPacks";

export type MotionContextValue = {
  preset: MotionPresetName;
  enabled: boolean;
  pack: MotionPresetPack;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export type MotionProviderProps = {
  /** Animation script preset. @default "apple" */
  preset?: MotionPresetName;
  /** Enable motion globally for consumers of `useMotionPresets`. @default true */
  enabled?: boolean;
  children: ReactNode;
};

export function MotionProvider({ preset = "apple", enabled = true, children }: MotionProviderProps) {
  const value = useMemo(
    () => ({
      preset,
      enabled,
      pack: getMotionPreset(preset),
    }),
    [enabled, preset],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

/** Active animation script from `MotionProvider` or `AsriUIProvider`. */
export function useMotionPresets(): MotionContextValue {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotionPresets must be used within MotionProvider or AsriUIProvider.");
  }
  return context;
}

/** Returns the active preset, or the default Apple pack outside a provider. */
export function useMotionPresetsOptional(): MotionContextValue {
  const context = useContext(MotionContext);
  if (context) return context;

  return {
    preset: "apple",
    enabled: true,
    pack: getMotionPreset("apple"),
  };
}
