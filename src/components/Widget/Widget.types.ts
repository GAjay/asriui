import type { HTMLAttributes, IframeHTMLAttributes, ReactNode } from "react";

export type WidgetMode = "iframe" | "script" | "auto";

export type WidgetMountOptions = {
  /** Embed mode. `auto` picks script when `scriptSrc` is set, otherwise iframe. @default "auto" */
  mode?: WidgetMode;
  /** Page or embed URL for iframe mode. */
  src?: string;
  /** External script URL for ad tags, chat widgets, analytics embeds, etc. */
  scriptSrc?: string;
  /** Mount point id passed to third-party scripts (`data-ad-slot`, container id, etc.). */
  slotId?: string;
  /** Extra attributes on the mount node (`data-ad-client`, `data-widget-id`, …). */
  attrs?: Record<string, string>;
  /** Accessible title for iframe embeds. */
  title?: string;
  /** iframe `sandbox` token list. @default "allow-scripts allow-same-origin allow-popups allow-forms" */
  sandbox?: string;
  /** Fixed height for the embed surface. */
  height?: number | string;
  /** Fixed width for the embed surface. @default "100%" */
  width?: number | string;
  /** iframe loading strategy. @default "lazy" */
  loading?: "lazy" | "eager";
  /** Raw HTML rendered inside a sandboxed iframe via `srcDoc` (isolated from your app). */
  html?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
};

/**
 * Drop-in embed surface for third-party pages, ad scripts, and partner widgets.
 * Isolates external content from your React tree — no manual page wiring required.
 */
export interface WidgetProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onLoad" | "onError">,
    WidgetMountOptions {
  /** Custom loading placeholder. */
  fallback?: ReactNode;
  /** Custom error UI. Receives the error and a retry handler. */
  errorFallback?: (error: Error, retry: () => void) => ReactNode;
  /** Extra props forwarded to the iframe element in iframe mode. */
  iframeProps?: Omit<
    IframeHTMLAttributes<HTMLIFrameElement>,
    "src" | "srcDoc" | "title" | "sandbox" | "loading" | "height" | "width"
  >;
}
