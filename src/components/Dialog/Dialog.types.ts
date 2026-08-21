import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type DialogClassNames = SlotClassNames<
  "overlay" | "content" | "header" | "title" | "description" | "footer" | "trigger" | "close"
>;

/**
 * Props for the root {@link Dialog} container.
 *
 * Provides open-state context to compound subcomponents. The dialog content
 * is portaled to `document.body` (or a custom container) with focus trap,
 * escape-to-close, and overlay click dismiss.
 */
export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /**
   * Initial open state for uncontrolled usage.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Override class names for dialog slots — merged with each part's `className`. */
  classNames?: DialogClassNames;
  children?: ReactNode;
}

/**
 * Props for {@link Dialog.Trigger}.
 * A button that opens the dialog when clicked.
 */
export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

/**
 * Props for {@link Dialog.Content}.
 * Portaled modal panel with `role="dialog"` and `aria-modal="true"`.
 *
 * Pass `title` and `description` for a quick setup without manual Header slots.
 */
export interface DialogContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children?: ReactNode;
  /** Shorthand title — renders Dialog.Title inside a header. */
  title?: ReactNode;
  /** Shorthand description — renders Dialog.Description inside a header. */
  description?: ReactNode;
  /**
   * Show a top-right close icon when using title/description shorthand.
   * @default true when title is set
   */
  showClose?: boolean;
  /**
   * Portal the dialog to document.body.
   * @default true
   */
  portal?: boolean;
  /** Custom portal container. Defaults to `document.body`. */
  container?: HTMLElement | null;
  /**
   * Close when Escape is pressed.
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Close when the overlay is clicked.
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /** Custom class on the overlay backdrop. */
  overlayClassName?: string;
}

/** Props for {@link Dialog.Header} — title area at the top of the dialog. */
export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Props for {@link Dialog.Title}.
 * Renders an `<h2>` linked to the dialog via `aria-labelledby`.
 */
export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

/**
 * Props for {@link Dialog.Description}.
 * Renders descriptive text linked via `aria-describedby`.
 */
export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

/** Props for {@link Dialog.Footer} — action buttons at the bottom. */
export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Props for {@link Dialog.Close}.
 * Closes the dialog. Defaults to an icon button when empty, or a text button when children are provided.
 */
export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /**
   * `icon` — top-right dismiss control. `button` — inline action button.
   * @default "icon" when children are omitted, otherwise "button"
   */
  variant?: "icon" | "button";
}
