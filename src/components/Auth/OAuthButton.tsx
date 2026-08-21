import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { OAuthButtonProps, OAuthProvider } from "./Auth.types";
import styles from "./Auth.module.css";

const LABELS: Record<OAuthProvider, string> = {
  microsoft: "Microsoft",
  google: "Google",
  github: "GitHub",
  apple: "Apple",
};

function ProviderIcon({ provider }: { provider: OAuthProvider }) {
  if (provider === "microsoft") {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" fill="#f25022" />
        <rect x="13" y="3" width="8" height="8" fill="#7fba00" />
        <rect x="3" y="13" width="8" height="8" fill="#00a4ef" />
        <rect x="13" y="13" width="8" height="8" fill="#ffb900" />
      </svg>
    );
  }

  if (provider === "google") {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-1.6 3.6-5.4 3.6-3.3 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C17.1 3.1 14.8 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.6 12 20.6c6.9 0 8.6-4.8 8.6-7.2 0-.5 0-.9-.1-1.3H12z" />
      </svg>
    );
  }

  if (provider === "github") {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.09.08 1.67 1.12 1.67 1.12.98 1.67 2.56 1.19 3.19.91.1-.71.38-1.19.69-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.42.11-2.96 0 0 .93-.3 3.05 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.89.12 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.6 1.54.22 2.68.11 2.96.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.15-5.03 5.42.39.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .29.2.64.76.53 4.36-1.45 7.5-5.57 7.5-10.43C23.02 5.24 18.27.5 12 .5z" />
      </svg>
    );
  }

  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.29-.04-.43 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.06.29.06.44zm4.32 15.71c-.03.07-.327 1.176-.966 2.32-.57 1.004-1.177 2.007-2.127 2.022-.907.015-1.197-.6-2.268-.6-1.086 0-1.418.58-2.29.615-.92.035-1.622-.92-2.195-1.92-1.182-2.07-2.085-5.86-.885-8.41.6-1.29 1.68-2.11 2.89-2.13.9-.02 1.75.6 2.27.6.52 0 1.49-.74 2.52-.63.43.02 1.64.17 2.41 1.28-.06.04-1.44.84-1.43 2.5.02 1.98 1.72 2.64 1.73 2.65-.01.04-.27.93-.89 1.84z" />
    </svg>
  );
}

/**
 * Branded OAuth sign-in button for Microsoft, Google, GitHub, and Apple.
 */
export const OAuthButton = forwardRef<HTMLButtonElement, OAuthButtonProps>(function OAuthButton(
  { provider, label, showIcon = true, block = true, className, type = "button", ...rest },
  ref,
) {
  const text = label ?? `Continue with ${LABELS[provider]}`;

  return (
    <button
      ref={ref}
      type={type}
      className={cn(styles.button, styles[provider], block && styles.block, className)}
      {...rest}
    >
      {showIcon ? <ProviderIcon provider={provider} /> : null}
      <span>{text}</span>
    </button>
  );
});

OAuthButton.displayName = "OAuthButton";
