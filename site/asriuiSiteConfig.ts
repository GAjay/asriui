import type { AsriUIConfig } from "../src/config";

/** Site-wide plug-and-play configuration for the docs + landing app. */
export const siteAsriUIConfig: AsriUIConfig = {
  theme: "light",
  fontFamily: '"Work Sans", ui-sans-serif, system-ui, sans-serif',
  analytics: {
    enabled: true,
    gtmId: import.meta.env.VITE_GTM_ID ?? "",
    dataLayerName: "dataLayer",
  },
  monitoring: {
    enabled: Boolean(import.meta.env.VITE_MONITORING_URL),
    reportUrl: import.meta.env.VITE_MONITORING_URL ?? "/api/errors",
  },
  debug: import.meta.env.DEV,
};
