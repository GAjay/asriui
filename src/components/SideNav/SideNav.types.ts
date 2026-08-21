import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
} from "react";

export interface SideNavVirtualListProps<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Indent list for nested menu levels. */
  nested?: boolean;
  /** Full array of navigation items to virtualize. */
  items: T[];
  /** Fixed row height in pixels. */
  itemHeight: number;
  /** Scroll viewport height in pixels. */
  height: number;
  /**
   * Extra rows rendered above and below the viewport.
   * @default 4
   */
  overscan?: number;
  /**
   * Rows rendered during SSR before scroll is measured.
   * @default 10
   */
  ssrCount?: number;
  /** Stable key extractor for each row. */
  getItemKey?: (item: T, index: number) => string | number;
  /**
   * Render each visible row. Return a `SideNav.Link` (or other nav content).
   * Rows are wrapped in `<li>` automatically.
   */
  renderItem: (item: T, index: number) => ReactNode;
  /** Message shown when `items` is empty. @default "No items" */
  emptyMessage?: string;
}

export interface SideNavListStandardProps extends HTMLAttributes<HTMLUListElement> {
  /** Indent list for nested menu levels. */
  nested?: boolean;
  /** Render children normally without virtualization. @default false */
  virtualized?: false;
  children?: ReactNode;
}

export interface SideNavListVirtualizedProps<T>
  extends Omit<SideNavVirtualListProps<T>, "nested"> {
  /** Enable virtualization for large navigation lists. */
  virtualized: true;
  /** Indent list for nested menu levels. */
  nested?: boolean;
  children?: never;
}

export type SideNavListProps<T = unknown> =
  | SideNavListStandardProps
  | SideNavListVirtualizedProps<T>;

export type SideNavSide = "left" | "right";

/**
 * How the sidebar behaves when collapsed via `SideNav.Toggle`.
 * - `rail` — shrinks to an icon rail (labels hide, icons stay)
 * - `hidden` — hides nav content; only the toggle remains (hamburger pattern)
 */
export type SideNavCollapseMode = "rail" | "hidden";

export type SideNavToggleVariant = "chevron" | "hamburger";

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label for the navigation landmark. @default "Sidebar" */
  "aria-label"?: string;
  /**
   * Which edge the sidebar anchors to. Affects active indicator and toggle direction.
   * Pair with `PageLayout sidebarSide` for shell placement.
   * @default "left"
   */
  side?: SideNavSide;
  /**
   * Enable collapsing the entire sidebar.
   * Pair with `SideNav.Toggle`. Use `collapseMode` to choose rail vs fully hidden.
   */
  collapsible?: boolean;
  /**
   * Collapse behavior when `collapsible` is true.
   * @default "rail"
   */
  collapseMode?: SideNavCollapseMode;
  /** Controlled collapsed state for the whole sidebar. */
  collapsed?: boolean;
  /** Initial collapsed state when uncontrolled. @default false */
  defaultCollapsed?: boolean;
  /** Called when sidebar collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * Width of the icon rail when collapsed (`collapseMode="rail"`).
   * @default "3.5rem"
   */
  collapsedWidth?: number | string;
  children?: ReactNode;
}

export interface SideNavHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface SideNavMenusProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled active menu id. */
  activeMenu?: string;
  /** Initial active menu id. Defaults to the first `SideNav.Menu`. */
  defaultMenu?: string;
  /** Called when the active top-level menu changes. */
  onMenuChange?: (menuId: string) => void;
  children?: ReactNode;
}

export interface SideNavMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique menu id used by the icon rail. */
  id: string;
  /** Short label for the menu rail button. */
  label: string;
  /** Icon shown in the top menu rail. */
  icon?: ReactNode;
  children?: ReactNode;
}

export interface SideNavGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group section label. */
  label?: string;
  /** Optional icon shown beside the group label. */
  icon?: ReactNode;
  /**
   * Make the group label a toggle that expands/collapses its links.
   * @default false
   */
  collapsible?: boolean;
  /** Controlled open state for collapsible groups. */
  open?: boolean;
  /** Initial open state for collapsible groups. @default true */
  defaultOpen?: boolean;
  /** Called when a collapsible group opens or closes. */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface SideNavSubmenuProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Nested menu section label. */
  label: string;
  /** Optional icon beside the submenu label. */
  icon?: ReactNode;
  /** Allow expanding/collapsing nested links. @default true */
  collapsible?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface SideNavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Highlights the link with an active left border. */
  active?: boolean;
  /** Optional leading icon for the menu item. */
  icon?: ReactNode;
  children?: ReactNode;
}

export interface SideNavItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
}

export interface SideNavHomeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Home destination. */
  href: string;
  /** Accessible label and tooltip when collapsed. @default "Home" */
  label?: string;
  /** Icon shown in the rail. A default home icon is rendered when omitted. */
  icon?: ReactNode;
  /** Highlights the home link. */
  active?: boolean;
}

export interface SideNavToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Toggle icon style.
   * - `chevron` — collapses to icon rail (default)
   * - `hamburger` — animated hamburger ↔ close (best with `collapseMode="hidden"`)
   * @default "chevron"
   */
  variant?: SideNavToggleVariant;
  /** Accessible label when the sidebar is collapsed. @default "Expand sidebar" / "Open menu" for hamburger */
  expandLabel?: string;
  /** Accessible label when the sidebar is expanded. @default "Collapse sidebar" / "Close menu" for hamburger */
  collapseLabel?: string;
}
