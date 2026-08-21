/** DOM handlers that conflict with Framer Motion's gesture/animation props */
export const motionDomConflicts = [
  "onDrag",
  "onDragStart",
  "onDragEnd",
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration",
] as const;

export type OmitMotionDomConflicts<T> = Omit<T, (typeof motionDomConflicts)[number]>;
