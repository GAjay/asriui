import type { VitePWAOptions } from "vite-plugin-pwa";

function withBase(path: string, base: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base || base === "/") return normalized;
  return `${base.replace(/\/$/, "")}${normalized}`;
}

/**
 * PWA settings for the AsriUI docs site.
 * Pass the Vite `base` so GitHub project Pages and custom domains both work.
 */
export function createPwaOptions(base = "/"): Partial<VitePWAOptions> {
  return {
    registerType: "autoUpdate",
    injectRegister: null,
    includeAssets: ["favicon.svg", "favicon-dark.svg", "apple-touch-icon.svg", "mask-icon.svg"],
    manifest: {
      name: "AsriUI",
      short_name: "AsriUI",
      description: "Production-ready React UI components with docs and live demos.",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait-primary",
      scope: base,
      start_url: base,
      categories: ["developer", "productivity"],
      icons: [
        {
          src: withBase("/favicon.svg", base),
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any",
        },
        {
          src: withBase("/favicon-dark.svg", base),
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any",
        },
        {
          src: withBase("/apple-touch-icon.svg", base),
          sizes: "180x180",
          type: "image/svg+xml",
          purpose: "any",
        },
        {
          src: withBase("/mask-icon.svg", base),
          sizes: "512x512",
          type: "image/svg+xml",
          purpose: "maskable",
        },
        {
          src: withBase("/pwa-192x192.png", base),
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: withBase("/pwa-512x512.png", base),
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: withBase("/pwa-512x512.png", base),
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: withBase("/index.html", base),
      globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,webp,avif,woff,woff2}"],
      globIgnores: ["**/DataGridAgGridInner-*.js", "**/xlsx-*.js"],
      maximumFileSizeToCacheInBytes: 450_000,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp|avif|ico)$/i,
          handler: "CacheFirst",
          options: {
            cacheName: "asriui-images",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /\.(?:woff2?|ttf|otf|eot)$/i,
          handler: "CacheFirst",
          options: {
            cacheName: "asriui-fonts",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /\.(?:js|css)$/i,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "asriui-static",
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24,
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  };
}

export const pwaOptions = createPwaOptions();
