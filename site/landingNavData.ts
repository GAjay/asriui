/** Landing page navigation and component browse data. */

import { componentRegistry } from "./docs/registry";
import type { DocCategory } from "./docs/types";

/** Primary header links — shown outside the menu dropdown. */
export const LANDING_HEADER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "About", href: "/about", external: false },
  { label: "Docs", href: "/docs", external: false },
] as const;

export const LANDING_PAGE_SECTIONS = [
  { label: "Features", href: "#features" },
  { label: "Design system", href: "#design-system" },
  { label: "Ship faster", href: "#ship-faster" },
  { label: "Explore", href: "#explore" },
  { label: "Powered by", href: "#powered-by" },
  { label: "Milestones", href: "#milestones" },
  { label: "FAQ", href: "#faq" },
  { label: "Support", href: "#support" },
] as const;

const LANDING_COMPONENT_BUCKETS: ReadonlyArray<{
  name: string;
  description: string;
  categories: readonly DocCategory[];
}> = [
  {
    name: "Form & input",
    description: "Buttons, inputs, labels, switches, and schema-driven forms.",
    categories: ["form"],
  },
  {
    name: "Layout & docs",
    description: "Cards, grids, typography, icons, colors, and documentation shells.",
    categories: ["layout"],
  },
  {
    name: "Feedback & navigation",
    description: "Dialogs, skeletons, loaders, badges, tabs, and tracked links.",
    categories: ["feedback", "navigation"],
  },
  {
    name: "Data & advanced",
    description: "Virtual lists, AI chat, error boundaries, Monaco, and flow charts.",
    categories: ["data", "advanced"],
  },
];

/** Browse groups for the landing catalog — derived from the docs registry. */
export const COMPONENT_CATEGORIES = LANDING_COMPONENT_BUCKETS.map((bucket) => ({
  name: bucket.name,
  description: bucket.description,
  slugs: componentRegistry
    .filter((doc) => bucket.categories.includes(doc.category))
    .map((doc) => doc.slug),
}));

export const COMPONENT_COUNT = componentRegistry.length;

export const SLUG_TO_NAME: Record<string, string> = Object.fromEntries(
  componentRegistry.map((doc) => [doc.slug, doc.name]),
);

export function getFlatComponents() {
  return COMPONENT_CATEGORIES.flatMap((category) =>
    category.slugs.map((slug) => ({
      slug,
      name: SLUG_TO_NAME[slug] ?? slug,
      category: category.name,
    })),
  );
}
