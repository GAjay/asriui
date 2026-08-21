import { createContext, useContext } from "react";
import type { HeroAlign, HeroSize, HeroTextSide, HeroVariant } from "./Hero.types";

export type HeroContextValue = {
  variant: HeroVariant;
  textSide: HeroTextSide;
  align: HeroAlign;
  size: HeroSize;
};

export const HeroContext = createContext<HeroContextValue | null>(null);

export function useHeroContext(component: string): HeroContextValue {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error(`${component} must be used within Hero`);
  }
  return context;
}
