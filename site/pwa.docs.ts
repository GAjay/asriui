/** Copy-paste snippets for docs and landing page — mirrors `site/pwa.config.ts`. */
export const PWA_CONFIG_CODE = `// site/pwa.config.ts
import type { VitePWAOptions } from "vite-plugin-pwa";

export const pwaOptions = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  includeAssets: ["favicon.svg", "apple-touch-icon.svg", "mask-icon.svg"],
  manifest: {
    name: "AxiomUI",
    short_name: "AxiomUI",
    description: "Production-ready React UI components with docs and live demos.",
    theme_color: "#000000",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  },
  workbox: {
    navigateFallback: "/index.html",
    globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,webp,avif,woff,woff2}"],
    runtimeCaching: [
      {
        urlPattern: /\\.(?:png|gif|jpg|jpeg|svg|webp|avif|ico)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "axiom-images",
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\\.(?:woff2?|ttf|otf)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "axiom-fonts",
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
    ],
  },
} satisfies Partial<VitePWAOptions>;`;

export const PWA_VITE_CODE = `// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { pwaOptions } from "./site/pwa.config";

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
});`;
