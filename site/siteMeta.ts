/** Public site URL for canonical links and Open Graph. Set VITE_SITE_URL in production. */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ||
  (typeof window !== "undefined" ? window.location.origin : "https://axiom-ui.dev");

export const SITE_NAME = "AxiomUI";

export const SITE_TAGLINE = "React components you own — accessible, typed, and ready to ship";

export const SITE_DESCRIPTION =
  "AxiomUI is an open-source React 18+ UI library for the web with accessible components, TypeScript, tree-shakable subpath imports, Framer Motion presets, docs with live examples, and installable PWA support. Pair the same tokens and TypeScript patterns with React Native apps while shipping web UI from the npm package.";

export const SITE_KEYWORDS = [
  "React UI library",
  "React component library",
  "TypeScript UI components",
  "accessible React components",
  "tree-shakable UI",
  "design system React",
  "shadcn alternative",
  "Framer Motion components",
  "AxiomUI",
].join(", ");
