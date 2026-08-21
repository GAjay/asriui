/** Per-instance analytics overrides for interactive components (Button, Link, etc.). */
export type AnalyticsTrackProps = {
  /**
   * Push this interaction to GTM when `AsriUIProvider` analytics are enabled.
   * @default true
   */
  track?: boolean;
  /** Override the default GTM event name (e.g. `asriui_button_click`). */
  trackEvent?: string;
  /** Human-readable label stored on the dataLayer event. */
  trackLabel?: string;
  /** Extra fields merged into the dataLayer payload. */
  trackPayload?: Record<string, unknown>;
};
