import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "node:path";
import { createPwaOptions } from "./site/pwa.config";
import { normalizeViteBase, resolveSiteOrigin } from "./site/viteBase";

const root = resolve(__dirname, "src");

/** Flat subpath entry files → dist/*.js */
const subpathEntries = {
  button: resolve(root, "entries/button.ts"),
  link: resolve(root, "entries/link.ts"),
  breadcrumb: resolve(root, "entries/breadcrumb.ts"),
  menu: resolve(root, "entries/menu.ts"),
  dropdown: resolve(root, "entries/dropdown.ts"),
  tooltip: resolve(root, "entries/tooltip.ts"),
  input: resolve(root, "entries/input.ts"),
  card: resolve(root, "entries/card.ts"),
  widget: resolve(root, "entries/widget.ts"),
  metric: resolve(root, "entries/metric.ts"),
  separator: resolve(root, "entries/separator.ts"),
  callout: resolve(root, "entries/callout.ts"),
  quote: resolve(root, "entries/quote.ts"),
  "text-to-speech": resolve(root, "entries/text-to-speech.ts"),
  checkbox: resolve(root, "entries/checkbox.ts"),
  radio: resolve(root, "entries/radio.ts"),
  "checkbox-card": resolve(root, "entries/checkbox-card.ts"),
  "radio-card": resolve(root, "entries/radio-card.ts"),
  reset: resolve(root, "entries/reset.ts"),
  visible: resolve(root, "entries/visible.ts"),
  "list-item": resolve(root, "entries/list-item.ts"),
  badge: resolve(root, "entries/badge.ts"),
  label: resolve(root, "entries/label.ts"),
  switch: resolve(root, "entries/switch.ts"),
  tabs: resolve(root, "entries/tabs.ts"),
  accordion: resolve(root, "entries/accordion.ts"),
  dialog: resolve(root, "entries/dialog.ts"),
  "virtual-list": resolve(root, "entries/virtual-list.ts"),
  form: resolve(root, "entries/form.ts"),
  page: resolve(root, "entries/page.ts"),
  "card-validation": resolve(root, "entries/card-validation.ts"),
  "error-boundary": resolve(root, "entries/error-boundary.ts"),
  "monaco-editor": resolve(root, "entries/monaco-editor.ts"),
  "flow-chart": resolve(root, "entries/flow-chart.ts"),
  table: resolve(root, "entries/table.ts"),
  "data-grid": resolve(root, "entries/data-grid.ts"),
  toast: resolve(root, "entries/toast.ts"),
  auth: resolve(root, "entries/auth.ts"),
  calendar: resolve(root, "entries/calendar.ts"),
  "date-picker": resolve(root, "entries/date-picker.ts"),
  "server-query": resolve(root, "entries/server-query.ts"),
  skeleton: resolve(root, "entries/skeleton.ts"),
  "scroll-area": resolve(root, "entries/scroll-area.ts"),
  "code-block": resolve(root, "entries/code-block.ts"),
  markdown: resolve(root, "entries/markdown.ts"),
  "side-nav": resolve(root, "entries/side-nav.ts"),
  "page-layout": resolve(root, "entries/page-layout.ts"),
  hero: resolve(root, "entries/hero.ts"),
  slider: resolve(root, "entries/slider.ts"),
  loader: resolve(root, "entries/loader.ts"),
  timeline: resolve(root, "entries/timeline.ts"),
  grid: resolve(root, "entries/grid.ts"),
  container: resolve(root, "entries/container.ts"),
  flex: resolve(root, "entries/flex.ts"),
  "theme-switch": resolve(root, "entries/theme-switch.ts"),
  "aspect-ratio": resolve(root, "entries/aspect-ratio.ts"),
  image: resolve(root, "entries/image.ts"),
  "image-dropzone": resolve(root, "entries/image-dropzone.ts"),
  icon: resolve(root, "entries/icon.ts"),
  typography: resolve(root, "entries/typography.ts"),
  "color-palette": resolve(root, "entries/color-palette.ts"),
  "ai-chat": resolve(root, "entries/ai-chat.ts"),
  "ai-workflow-builder": resolve(root, "entries/ai-workflow-builder.ts"),
  "ai-summarizer": resolve(root, "entries/ai-summarizer.ts"),
  "ai-data-analyst": resolve(root, "entries/ai-data-analyst.ts"),
  "ai-form-filler": resolve(root, "entries/ai-form-filler.ts"),
  "ai-search": resolve(root, "entries/ai-search.ts"),
  "ai-orchestrator": resolve(root, "entries/ai-orchestrator.ts"),
  "context-menu": resolve(root, "entries/context-menu.ts"),
  "feature-request": resolve(root, "entries/feature-request.ts"),
  questionnaire: resolve(root, "entries/questionnaire.ts"),
  config: resolve(root, "entries/config.ts"),
  utils: resolve(root, "entries/utils.ts"),
  hooks: resolve(root, "entries/hooks.ts"),
  motion: resolve(root, "entries/motion.ts"),
} as const;

const flatEntryNames = new Set(Object.keys(subpathEntries));

function entryFileName(chunkName: string): string {
  if (chunkName === "index") return "index.js";
  if (flatEntryNames.has(chunkName)) return `${chunkName}.js`;
  if (chunkName === "style") return "style.js";
  return `${chunkName}.js`;
}

export default defineConfig(({ mode, command }) => {
  const isPackageBuild = mode === "lib";
  const isSiteBuild = mode === "site";
  /** Docs site dev server (`pnpm dev`) — needs PWA virtual module for site/main.tsx */
  const isSiteApp = isSiteBuild || (command === "serve" && !isPackageBuild);
  const siteBase = normalizeViteBase();
  const siteUrl = resolveSiteOrigin();

  if (isPackageBuild) {
    return {
      publicDir: false,
      plugins: [
        react(),
        dts({
          include: ["src"],
          exclude: [
            "src/**/*.test.tsx",
            "src/**/*.test.ts",
            "src/**/*.stories.tsx",
            "src/test/**",
            "src/**/*.mdx",
            "src/entries/**",
          ],
          rollupTypes: false,
          insertTypesEntry: true,
          entryRoot: "src",
          beforeWriteFile: (filePath, content) => {
            const subpathMatch = filePath.match(/entries\/([^.]+)\.d\.ts$/);
            if (subpathMatch?.[1]) {
              const name = subpathMatch[1];
              return {
                filePath: filePath.replace(/entries\/[^/]+\.d\.ts$/, `${name}.d.ts`),
                content,
              };
            }
            return { filePath, content };
          },
        }),
      ],
      build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: false,
        sourcemap: true,
        cssCodeSplit: false,
        rollupOptions: {
          input: {
            index: resolve(root, "index.ts"),
            style: resolve(root, "style.ts"),
            ...subpathEntries,
          },
          preserveEntrySignatures: "strict",
          external: (id) =>
            id === "react" ||
            id === "react-dom" ||
            id === "react/jsx-runtime" ||
            id === "framer-motion" ||
            id === "@monaco-editor/react" ||
            id === "@xyflow/react" ||
            id === "ag-grid-community" ||
            id === "ag-grid-react" ||
            id === "xlsx" ||
            id.startsWith("react/") ||
            id.startsWith("framer-motion/") ||
            id.startsWith("@monaco-editor/") ||
            id.startsWith("@xyflow/") ||
            id.startsWith("ag-grid-community/") ||
            id.startsWith("ag-grid-react/") ||
            id.startsWith("xlsx/"),
          output: {
            format: "es",
            preserveModules: true,
            preserveModulesRoot: root,
            entryFileNames: (chunk) => entryFileName(chunk.name),
            assetFileNames: "style.css",
          },
        },
      },
    };
  }

  return {
    base: siteBase,
    publicDir: "public",
    plugins: [
      react(),
      ...(isSiteApp ? [VitePWA(createPwaOptions(siteBase))] : []),
      {
        name: "asriui-site-origin",
        transformIndexHtml(html) {
          let next = html.split("https://asriui.dev").join(siteUrl);
          if (siteBase !== "/") {
            const prefix = siteBase.replace(/\/$/, "");
            const skipPrefix = prefix.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            next = next.replace(
              new RegExp(`(href|src)="/(?!${skipPrefix}/|/|site/)`, "g"),
              `$1="${prefix}/`,
            );
          }
          return next;
        },
      },
    ],
    resolve: {
      alias: {
        "asriui": resolve(__dirname, "src/index.ts"),
      },
    },
    server: {
      port: 5173,
      open: false,
      fs: {
        deny: ["storybook-static", "site-dist", "dist"],
      },
    },
    optimizeDeps: {
      entries: ["index.html"],
    },
    build: isSiteBuild
      ? {
          outDir: "site-dist",
          emptyOutDir: true,
          sourcemap: true,
          cssCodeSplit: true,
          modulePreload: { polyfill: false },
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
                  return "react-vendor";
                }
                if (id.includes("node_modules/react-router")) {
                  return "router-vendor";
                }
                if (id.includes("node_modules/framer-motion")) {
                  return "motion-vendor";
                }
                return undefined;
              },
            },
          },
        }
      : undefined,
  };
});
