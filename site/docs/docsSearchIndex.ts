import type { ComponentDocMeta } from "./types";
import { componentRegistry } from "./registry";
import { TEMPLATE_SNIPPETS } from "./templateSnippets";

export type DocsSearchItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  kind: "guide" | "template" | "component";
};

const GUIDE_PAGES: DocsSearchItem[] = [
  {
    id: "getting-started",
    title: "Overview",
    subtitle: "Installation, configuration, motion presets, and PWA setup",
    href: "/docs/getting-started",
    kind: "guide",
  },
  {
    id: "styling",
    title: "Styling",
    subtitle: "CSS Modules, tokens, overrides, and custom components",
    href: "/docs/styling",
    kind: "guide",
  },
  {
    id: "theme",
    title: "Theme",
    subtitle: "Light/dark modes, ThemeSwitch, and view-transition animations",
    href: "/docs/theme",
    kind: "guide",
  },
  {
    id: "typography",
    title: "Typography",
    subtitle: "Font families, type scale, weights, and Typography component",
    href: "/docs/typography",
    kind: "guide",
  },
  {
    id: "branding",
    title: "Branding",
    subtitle: "Logo mark, wordmark, color variants, favicon, and usage",
    href: "/docs/branding",
    kind: "guide",
  },
  {
    id: "tokens",
    title: "Tokens",
    subtitle: "Colors, spacing, radius, shadows, motion, z-index, and breakpoints",
    href: "/docs/tokens",
    kind: "guide",
  },
  {
    id: "templates",
    title: "Page templates",
    subtitle: "Shop, cart, checkout, dashboard, settings",
    href: "/docs/templates",
    kind: "template",
  },
  {
    id: "roadmap",
    title: "Roadmap",
    subtitle: "Use cases, milestones, and what is coming next",
    href: "/docs/roadmap",
    kind: "guide",
  },
  {
    id: "releases",
    title: "Releases",
    subtitle: "Release notes and version history",
    href: "/docs/releases",
    kind: "guide",
  },
];

export function getDocsSearchIndex(): DocsSearchItem[] {
  const templates: DocsSearchItem[] = [
    {
      id: "templates-overview",
      title: "Page templates",
      subtitle: "Overview of marketing, admin, ecommerce, and builder layouts",
      href: "/docs/templates",
      kind: "template",
    },
    ...TEMPLATE_SNIPPETS.map((template) => ({
      id: `template-${template.slug}`,
      title: template.title,
      subtitle: template.description,
      href: `/docs/templates/${template.slug}`,
      kind: "template" as const,
    })),
  ];

  const components: DocsSearchItem[] = componentRegistry.map((doc: ComponentDocMeta) => ({
    id: doc.slug,
    title: doc.name,
    subtitle: doc.description,
    href: `/docs/components/${doc.slug}`,
    kind: "component",
  }));

  return [...GUIDE_PAGES.filter((page) => page.id !== "templates"), ...templates, ...components];
}

export function filterDocsSearch(query: string, items: DocsSearchItem[]) {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) => {
    const haystack = `${item.title} ${item.subtitle} ${item.id} ${item.href}`.toLowerCase();
    return haystack.includes(q);
  });
}
