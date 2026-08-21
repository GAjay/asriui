import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

export type TableVariant = "default" | "striped" | "bordered";
export type TableSize = "sm" | "md";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Visual style for rows and borders.
   * @default "default"
   */
  variant?: TableVariant;
  /**
   * Density preset.
   * @default "md"
   */
  size?: TableSize;
  /**
   * Wrap the table in a horizontal scroll container.
   * @default false
   */
  scrollable?: boolean;
  /** Custom class on the scroll wrapper when `scrollable` is true. */
  wrapperClassName?: string;
  children?: ReactNode;
}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  children?: ReactNode;
}

export interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Highlights the row as selected. */
  selected?: boolean;
  children?: ReactNode;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment for the header cell. */
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  children?: ReactNode;
}
