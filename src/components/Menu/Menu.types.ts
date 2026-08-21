import type { HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type MenuPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export type MenuClassNames = SlotClassNames<
  "root" | "trigger" | "content" | "item" | "separator" | "label" | "group"
>;

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Dropdown alignment relative to the trigger.
   * @default "bottom-start"
   */
  placement?: MenuPlacement;
  /**
   * Close the menu after an item is selected.
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Render menu content in a portal with fixed positioning.
   * Prevents clipping inside overflow containers such as sticky headers.
   * @default true
   */
  portal?: boolean;
  /** Override class names for menu slots — merged with each part's `className`. */
  classNames?: MenuClassNames;
  children?: ReactNode;
}

export interface MenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Accessible label for the menu panel. */
  "aria-label"?: string;
  /**
   * Use `dialog` for rich panels with inputs. Defaults to `menu`.
   */
  role?: "menu" | "dialog";
  /**
   * Focus the first menu item when opened.
   * Defaults to `true` for menus and `false` for dialogs.
   */
  autoFocus?: boolean;
}

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLButtonElement>, "onSelect"> {
  children?: ReactNode;
  /** Disable the item. */
  disabled?: boolean;
  /** Destructive action styling. */
  destructive?: boolean;
  /** Called when the item is activated. */
  onSelect?: (event: Event) => void;
}

export type MenuSeparatorProps = HTMLAttributes<HTMLHRElement>;

export interface MenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Accessible label for the group. */
  label?: string;
}
