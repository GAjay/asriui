import type { ReactNode } from "react";

type VisibleBaseProps = {
  /** When true, children are shown. */
  when: boolean;
  /** Keep children mounted while hidden. @default false */
  keepMounted?: boolean;
  /** Animate visibility transitions. @default true */
  animate?: boolean;
  children?: ReactNode;
};

export type VisibleProps = VisibleBaseProps;

export interface HiddenProps extends VisibleBaseProps {
  /** When true, children are hidden. */
  when: boolean;
}
