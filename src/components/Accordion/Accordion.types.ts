import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type AccordionClassNames = SlotClassNames<"root" | "item" | "trigger" | "content">;

/** Whether one or many sections can be open at once. */
export type AccordionType = "single" | "multiple";

/** Visual style for accordion items. */
export type AccordionVariant = "default" | "bordered" | "ghost";

/**
 * Props for the root {@link Accordion} container.
 *
 * Manages open section state and provides context to `Accordion.Item`,
 * `Accordion.Trigger`, and `Accordion.Content`.
 */
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Selection mode.
   * - `single`: at most one section open
   * - `multiple`: any number of sections open
   * @default "single"
   */
  type?: AccordionType;
  /**
   * Allow closing all sections when `type` is `single`.
   * @default false
   */
  collapsible?: boolean;
  /** Controlled open value(s). String for single, array for multiple. */
  value?: string | string[];
  /** Initial open value(s) when uncontrolled. */
  defaultValue?: string | string[];
  /** Called when open sections change. */
  onValueChange?: (value: string | string[]) => void;
  /**
   * Visual style applied to all items.
   * @default "default"
   */
  variant?: AccordionVariant;
  /**
   * Disable every item in the accordion.
   * @default false
   */
  disabled?: boolean;
  /** Override class names for accordion slots — merged with each part's `className`. */
  classNames?: AccordionClassNames;
  children?: ReactNode;
}

/** Props for {@link Accordion.Item}. Wraps a trigger and content pair. */
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value identifying this section. */
  value: string;
  /**
   * Disable this section's trigger.
   * @default false
   */
  disabled?: boolean;
  children?: ReactNode;
}

/** Props for {@link Accordion.Trigger}. */
export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon shorthand (same as `startContent`). */
  icon?: ReactNode;
  /** Content before the label (icons, avatars). */
  startContent?: ReactNode;
  /** Content after the label, before the chevron (badges, meta). */
  endContent?: ReactNode;
  /**
   * Hide the default chevron indicator.
   * @default false
   */
  hideIndicator?: boolean;
  children?: ReactNode;
}

/** Props for {@link Accordion.Content}. */
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
