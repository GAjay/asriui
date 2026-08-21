import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type PageLayoutClassNames = SlotClassNames<
  "root" | "sidebar" | "main" | "content" | "aside"
>;

/** Layout preset controlling grid structure. */
export type PageLayoutVariant = "sidebar" | "docs" | "centered" | "full";

export type PageLayoutSidebarSide = "left" | "right";

export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Layout preset.
   * - sidebar: sidebar + main
   * - docs: sidebar + main with optional aside slot
   * - centered: single centered column
   * - full: full-width main only
   * @default "sidebar"
   */
  variant?: PageLayoutVariant;
  /**
   * Which edge the sidebar column sits on for sidebar/docs variants.
   * Pair with `SideNav side` for matching active indicators.
   * @default "left"
   */
  sidebarSide?: PageLayoutSidebarSide;
  /** Sidebar column width. @default "260px" */
  sidebarWidth?: number | string;
  /** Aside column width for docs variant. @default "180px" */
  asideWidth?: number | string;
  /** Default max width for centered content. @default "42rem" */
  contentMaxWidth?: number | string;
  /** Override class names for layout slots — merged with each part's `className`. */
  classNames?: PageLayoutClassNames;
  children?: ReactNode;
}

export interface PageLayoutSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Sidebar width. @default "260px" */
  width?: number | string;
  children?: ReactNode;
}

export interface PageLayoutMainProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface PageLayoutContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Max content width. @default "none" for full, "48rem" for centered/docs */
  maxWidth?: number | string;
  children?: ReactNode;
}

export interface PageLayoutAsideProps extends HTMLAttributes<HTMLElement> {
  /** Sticky aside width. @default "180px" */
  width?: number | string;
  children?: ReactNode;
}

export type PageLayoutStyleVars = CSSProperties & {
  "--page-sidebar-width"?: string;
  "--page-aside-width"?: string;
  "--page-content-max"?: string;
};
