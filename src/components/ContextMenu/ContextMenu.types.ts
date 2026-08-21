import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type ContextMenuClassNames = SlotClassNames<"root" | "trigger" | "content" | "item" | "separator">;

export interface ContextMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  classNames?: ContextMenuClassNames;
  children?: ReactNode;
}

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Listen on the parent element instead of wrapping children.
   * Useful when the menu host is an existing section.
   */
  attach?: "self" | "parent";
}

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ContextMenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  children?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export type ContextMenuSeparatorProps = HTMLAttributes<HTMLHRElement>;
