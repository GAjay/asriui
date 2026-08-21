/**
 * Landing scroll-reveal viewport.
 * `once: true` prevents fade-in/out flicker when pausing between sections.
 * Soft amount so tall sections still reveal on mobile.
 */
export const SCROLL_REPLAY_VIEWPORT = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -40px 0px",
} as const;
