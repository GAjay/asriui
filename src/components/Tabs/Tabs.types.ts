import type { HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type TabsClassNames = SlotClassNames<"root" | "list" | "trigger" | "content">;

/** Visual style for the tab list and triggers. */
export type TabsVariant = "default" | "underline" | "pills" | "ghost";

/**
 * Props for the root {@link Tabs} container.
 *
 * Manages active tab state and provides context to compound subcomponents:
 * `Tabs.List`, `Tabs.Trigger`, and `Tabs.Content`.
 */
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled active tab value (must match a `Tabs.Trigger` value). */
  value?: string;
  /** Initial active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the user selects a different tab. */
  onValueChange?: (value: string) => void;
  /**
   * Default visual style for `Tabs.List`. Can be overridden on `Tabs.List`.
   * @default "default"
   */
  variant?: TabsVariant;
  /**
   * Animate panel transitions when switching tabs.
   * Respects `prefers-reduced-motion`.
   * @default true
   */
  animated?: boolean;
  /** Override class names for tab slots — merged with each part's `className`. */
  classNames?: TabsClassNames;
  children?: ReactNode;
}

/**
 * Props for {@link Tabs.List}.
 * Renders a `role="tablist"` container for tab triggers.
 */
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style for this tab list.
   * Overrides the `variant` set on the root `Tabs` component.
   */
  variant?: TabsVariant;
  children?: ReactNode;
}

/**
 * Props for {@link Tabs.Trigger}.
 * Renders a `role="tab"` button linked to its panel via ARIA attributes.
 */
export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Unique value identifying this tab and its content panel. */
  value: string;
  /**
   * Prevents selection of this tab.
   * @default false
   */
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * Props for {@link Tabs.Content}.
 * Renders a `role="tabpanel"` region shown when its value matches the active tab.
 */
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Value matching the associated `Tabs.Trigger`. */
  value: string;
  children?: ReactNode;
}
