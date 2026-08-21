import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { AnalyticsTrackProps } from "../../config/analytics.types";

export type LinkVariant = "default" | "muted" | "button";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    AnalyticsTrackProps {
  /** Destination URL or path. */
  href: string;
  /**
   * Visual style.
   * @default "default"
   */
  variant?: LinkVariant;
  /**
   * Mark link as external. Auto-detected for `http(s)://` URLs and `target="_blank"`.
   */
  external?: boolean;
  /**
   * Show an external-link indicator when opening outside the current app.
   * @default true when external
   */
  showExternalIcon?: boolean;
  children?: ReactNode;
}
