import type { HTMLAttributes, ReactNode } from "react";
import type { OmitMotionDomConflicts } from "../../motion/domProps";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type CardClassNames = SlotClassNames<"root" | "header" | "title" | "content" | "footer">;

/**
 * Props for the root {@link Card} container.
 *
 * Use with compound subcomponents: `Card.Header`, `Card.Title`,
 * `Card.Content`, and `Card.Footer`.
 */
export interface CardProps extends OmitMotionDomConflicts<HTMLAttributes<HTMLDivElement>> {
  children?: ReactNode;
  /**
   * Enables scale-in entrance animation and subtle hover elevation.
   * @default true
   */
  motion?: boolean;
  /** Override class names for card slots — merged with each part's `className`. */
  classNames?: CardClassNames;
}

/** Props for {@link Card.Header} — top section of a card. */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Props for {@link Card.Title}.
 * Renders a semantic heading element inside the card header.
 */
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  /**
   * Heading level for document outline semantics.
   * @default "h2"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/** Props for {@link Card.Content} — main body section. */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Props for {@link Card.Footer} — bottom action area. */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
