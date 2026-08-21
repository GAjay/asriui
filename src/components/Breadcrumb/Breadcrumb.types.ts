import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
  ReactNode,
} from "react";

export type BreadcrumbItemConfig = {
  /** Visible label for the crumb. */
  label: ReactNode;
  /** Link destination. Omit on the current page item. */
  href?: string;
  /** Marks the current page. Sets aria-current="page". */
  current?: boolean;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label for the navigation landmark. @default "Breadcrumb" */
  "aria-label"?: string;
  /**
   * Render a back control before the trail.
   * Uses browser history when `onBack` is omitted.
   */
  showBack?: boolean;
  /** Label for the back control. @default "Back" */
  backLabel?: string;
  /** Called when the back control is activated. Defaults to `history.back()`. */
  onBack?: () => void;
  /** Optional href for the back control instead of a button. */
  backHref?: string;
  /** Declarative trail items — alternative to compound children. */
  items?: BreadcrumbItemConfig[];
  /** Separator between crumbs. Pass text or a custom icon. @default "/" */
  separator?: ReactNode;
  children?: ReactNode;
}

export interface BreadcrumbBackProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  label?: string;
}

export interface BreadcrumbListProps extends OlHTMLAttributes<HTMLOListElement> {
  children?: ReactNode;
}

export interface BreadcrumbItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, "onClick"> {
  href?: string;
  current?: boolean;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
  children?: ReactNode;
}

export interface BreadcrumbSeparatorProps extends LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
}
