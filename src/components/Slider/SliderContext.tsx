import { createContext, useContext } from "react";

export type SliderContextValue = {
  index: number;
  count: number;
  setCount: (count: number) => void;
  goTo: (index: number) => void;
  goPrev: () => void;
  goNext: () => void;
  loop: boolean;
  idPrefix: string;
  animated: boolean;
  drag: boolean;
  setDragPaused: (paused: boolean) => void;
};

export type SliderSlideContextValue = {
  index: number;
  active: boolean;
};

export const SliderContext = createContext<SliderContextValue | null>(null);
export const SliderSlideContext = createContext<SliderSlideContextValue | null>(null);

export function useSliderContext(component: string): SliderContextValue {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error(`${component} must be used within Slider`);
  }
  return context;
}

export function useSliderSlideContext(component: string): SliderSlideContextValue {
  const context = useContext(SliderSlideContext);
  if (!context) {
    throw new Error(`${component} must be used within Slider.Track`);
  }
  return context;
}
