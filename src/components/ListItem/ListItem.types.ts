import type { ButtonHTMLAttributes, HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";

/**
 * Props for the {@link List} container.
 *
 * Renders a semantic `<ul>` with optional unstyled layout and staggered
 * entrance animations for child rows.
 */
export interface ListProps extends OmitMotionDomConflicts<HTMLAttributes<HTMLUListElement>> {
  children?: ReactNode;
  /**
   * Removes default list padding and bullets.
   * @default true
   */
  unstyled?: boolean;
  /**
   * Staggers child `ListItem` entrance animations.
   * @default true
   */
  motion?: boolean;
}

/**
 * Props for a single {@link ListItem} row.
 *
 * Supports static display rows and interactive button rows with
 * selection and disabled states.
 *
 * @example
 * ```tsx
 * <List aria-label="Settings">
 *   <ListItem title="General" description="Timezone, language" interactive selected />
 * </List>
 * ```
 */
export interface ListItemProps
  extends OmitMotionDomConflicts<Omit<LiHTMLAttributes<HTMLLIElement>, "title" | "onClick">> {
  /** Primary label for the row. */
  title: ReactNode;
  /** Secondary descriptive text below the title. */
  description?: ReactNode;
  /** Leading icon, avatar, or media slot. */
  media?: ReactNode;
  /** Trailing action, badge, chevron, or metadata. */
  trailing?: ReactNode;
  /**
   * Highlights the row with a selected background.
   * @default false
   */
  selected?: boolean;
  /**
   * Disables interaction and reduces opacity.
   * @default false
   */
  disabled?: boolean;
  /**
   * Renders the row as a focusable `<button>` for keyboard and screen-reader users.
   * Pair with `onClick` for actionable navigation rows.
   * @default false
   */
  interactive?: boolean;
  /**
   * Enables press/hover motion on interactive rows.
   * @default true
   */
  motion?: boolean;
  /** Click handler when `interactive` is true. */
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}
