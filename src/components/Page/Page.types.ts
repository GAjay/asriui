import type { ReactNode } from "react";
import type { FormConfig, FormValues } from "../Form";
import type { IconName } from "../Icon/icons";
import type { PageLayoutVariant } from "../PageLayout";
import type { TypographyVariant } from "../Typography";
import type { BadgeVariant } from "../Badge";
import type { ButtonVariant, ButtonSize } from "../Button";
import type { TimelineItemStatus } from "../Timeline";
import type { CodeLanguage } from "../CodeBlock";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type PageClassNames = SlotClassNames<"root" | "header" | "blocks" | "block">;

/** Layout shell options for {@link PageConfig}. */
export type PageLayoutConfig = {
  /** PageLayout preset. @default "centered" */
  variant?: PageLayoutVariant;
  /** Sidebar width when variant includes a sidebar. */
  sidebarWidth?: number | string;
  /** Max width for main content column. */
  contentMaxWidth?: number | string;
};

/** Sidebar navigation item in JSON page config. */
export type PageNavItem = {
  id: string;
  label: string;
  href?: string;
  icon?: IconName;
  active?: boolean;
};

/** Optional sidebar for sidebar/docs layouts. */
export type PageSidebarConfig = {
  title?: string;
  subtitle?: string;
  items?: PageNavItem[];
};

/** Header action button. */
export type PageActionConfig = {
  id: string;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

/** Page header band above blocks. */
export type PageHeaderConfig = {
  badge?: string;
  title?: string;
  description?: string;
  actions?: PageActionConfig[];
};

/** Shared identity for every block. */
type PageBlockBase = {
  /** Stable id — used for keys, form submit callbacks, and custom slots. */
  id: string;
};

export type PageTypographyBlock = PageBlockBase & {
  type: "typography";
  text: string;
  variant?: TypographyVariant;
  align?: "left" | "center" | "right";
};

export type PageBadgeBlock = PageBlockBase & {
  type: "badge";
  label: string;
  variant?: BadgeVariant;
};

export type PageMarkdownBlock = PageBlockBase & {
  type: "markdown";
  content: string;
};

export type PageCodeBlock = PageBlockBase & {
  type: "code";
  code: string;
  language?: CodeLanguage;
  filename?: string;
  showCopy?: boolean;
};

export type PageImageBlock = PageBlockBase & {
  type: "image";
  src: string;
  alt: string;
  /** Width / height ratio, e.g. `16 / 9`. */
  aspectRatio?: number;
};

export type PageSpacerBlock = PageBlockBase & {
  type: "spacer";
  size?: "sm" | "md" | "lg";
};

export type PageDividerBlock = PageBlockBase & {
  type: "divider";
};

export type PageActionsBlock = PageBlockBase & {
  type: "actions";
  items: PageActionConfig[];
  align?: "start" | "center" | "end";
};

export type PageStatItem = {
  label: string;
  value: string;
  hint?: string;
};

export type PageStatsBlock = PageBlockBase & {
  type: "stats";
  items: PageStatItem[];
  columns?: number;
};

export type PageCardBlock = PageBlockBase & {
  type: "card";
  title?: string;
  description?: string;
  footer?: string;
  /** Nested blocks inside the card body. */
  blocks?: PageBlock[];
};

export type PageFormBlock = PageBlockBase & {
  type: "form";
  config: FormConfig;
};

export type PageListItem = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
};

export type PageListBlock = PageBlockBase & {
  type: "list";
  items: PageListItem[];
};

export type PageTableColumn = {
  id: string;
  header: string;
};

export type PageTableBlock = PageBlockBase & {
  type: "table";
  columns: PageTableColumn[];
  rows: Array<Record<string, string>>;
  caption?: string;
};

export type PageGridBlock = PageBlockBase & {
  type: "grid";
  columns?: number;
  gap?: "none" | "sm" | "md" | "lg";
  blocks: PageBlock[];
};

export type PageTabsItem = {
  value: string;
  label: string;
  blocks: PageBlock[];
};

export type PageTabsBlock = PageBlockBase & {
  type: "tabs";
  defaultValue?: string;
  items: PageTabsItem[];
};

export type PageAccordionItem = {
  value: string;
  title: string;
  content?: string;
  blocks?: PageBlock[];
};

export type PageAccordionBlock = PageBlockBase & {
  type: "accordion";
  typeMode?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  items: PageAccordionItem[];
};

export type PageTimelineItem = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status?: TimelineItemStatus;
};

export type PageTimelineBlock = PageBlockBase & {
  type: "timeline";
  items: PageTimelineItem[];
};

/**
 * Escape hatch — render a React node from `slots[id]`.
 * Useful for charts, maps, or app-specific widgets.
 */
export type PageCustomBlock = PageBlockBase & {
  type: "custom";
};

export type PageBlock =
  | PageTypographyBlock
  | PageBadgeBlock
  | PageMarkdownBlock
  | PageCodeBlock
  | PageImageBlock
  | PageSpacerBlock
  | PageDividerBlock
  | PageActionsBlock
  | PageStatsBlock
  | PageCardBlock
  | PageFormBlock
  | PageListBlock
  | PageTableBlock
  | PageGridBlock
  | PageTabsBlock
  | PageAccordionBlock
  | PageTimelineBlock
  | PageCustomBlock;

/**
 * Top-level JSON configuration for {@link Page}.
 *
 * Fully serializable — load from CMS, API, or a local JSON file.
 *
 * @example
 * ```json
 * {
 *   "layout": { "variant": "centered", "contentMaxWidth": "40rem" },
 *   "header": { "title": "Contact", "description": "We reply within one business day." },
 *   "blocks": [
 *     {
 *       "id": "contact-form",
 *       "type": "form",
 *       "config": {
 *         "submitLabel": "Send",
 *         "fields": [
 *           { "name": "email", "type": "email", "label": "Email", "required": true }
 *         ]
 *       }
 *     }
 *   ]
 * }
 * ```
 */
export type PageConfig = {
  id?: string;
  layout?: PageLayoutConfig;
  sidebar?: PageSidebarConfig;
  header?: PageHeaderConfig;
  blocks?: PageBlock[];
};

/** Action payload emitted by buttons and nav items. */
export type PageActionEvent = {
  type: "action" | "nav";
  id: string;
  href?: string;
};

export interface PageProps {
  /** JSON page definition. */
  config: PageConfig;
  /**
   * Called when header/actions buttons or sidebar nav items are activated.
   * Navigation items with `href` still navigate; this fires in addition.
   */
  onAction?: (event: PageActionEvent) => void;
  /**
   * Called when a form block submits successfully.
   * `formId` is the block `id`.
   */
  onFormSubmit?: (formId: string, values: FormValues) => void | Promise<void>;
  /**
   * Map of custom block id → React node for `type: "custom"` blocks.
   */
  slots?: Record<string, ReactNode>;
  className?: string;
  classNames?: PageClassNames;
}
