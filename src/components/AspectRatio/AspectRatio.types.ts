import type { HTMLAttributes, ReactNode } from "react";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width / height ratio.
   * @example 16 / 9
   */
  ratio: number;
  children?: ReactNode;
}
