import { forwardRef, useMemo } from "react";
import { useAsriUIConfigOptional } from "../../config/AsriUIContext";
import { trackLinkClick } from "../../config/analytics";
import { cn } from "../../utils/cn";
import type { LinkProps } from "./Link.types";
import styles from "./Link.module.css";

function isHttpUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

function resolveExternal(href: string, target?: string, external?: boolean) {
  if (external !== undefined) return external;
  if (target === "_blank") return true;
  return isHttpUrl(href);
}

function ExternalIcon() {
  return (
    <svg
      className={styles.externalIcon}
      width="0.85em"
      height="0.85em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

/**
 * Accessible anchor with GTM tracking and external-link affordances.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    href,
    variant = "default",
    external,
    showExternalIcon,
    className,
    children,
    target,
    rel,
    onClick,
    track,
    trackEvent,
    trackLabel,
    trackPayload,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const asriuiConfig = useAsriUIConfigOptional();
  const isExternal = resolveExternal(href, target, external);
  const opensNewTab = target === "_blank" || (isExternal && target !== "_self");
  const showIcon = showExternalIcon ?? isExternal;

  const resolvedRel = useMemo(() => {
    if (rel) return rel;
    return opensNewTab ? "noopener noreferrer" : undefined;
  }, [opensNewTab, rel]);

  const resolvedAriaLabel = useMemo(() => {
    if (ariaLabel) return ariaLabel;
    if (!opensNewTab) return undefined;
    const textLabel =
      trackLabel ?? (typeof children === "string" ? children : undefined) ?? "Link";
    return `${textLabel} (opens in new tab)`;
  }, [ariaLabel, children, opensNewTab, trackLabel]);

  const handleClick: LinkProps["onClick"] = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && asriuiConfig) {
      trackLinkClick(
        asriuiConfig.analytics,
        {
          href,
          label: trackLabel ?? (typeof children === "string" ? children : undefined),
          external: isExternal,
          target,
        },
        { track, trackEvent, trackLabel, trackPayload },
      );
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        styles.root,
        variant === "muted" && styles.muted,
        variant === "button" && styles.button,
        className,
      )}
      target={target}
      rel={resolvedRel}
      aria-label={resolvedAriaLabel}
      onClick={handleClick}
      {...rest}
    >
      {children}
      {showIcon && isExternal ? <ExternalIcon /> : null}
    </a>
  );
});

Link.displayName = "Link";
