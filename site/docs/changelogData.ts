export type ChangelogChangeType = "added" | "changed" | "fixed" | "deprecated" | "removed" | "security";

export type ChangelogSection = Partial<Record<ChangelogChangeType, string[]>>;

export type ChangelogRelease = {
  version: string;
  date: string;
  label?: string;
  summary: string;
  sections: ChangelogSection;
};

/** Release history — newest first. Update when cutting a release via Changesets. */
export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: "Unreleased",
    date: "In development",
    label: "Next",
    summary:
      "Menu, Dropdown, DatePicker, Tooltip, Timeline enhancements, landing polish, and docs UX improvements.",
    sections: {
      added: [
        "Menu — action dropdown with portal positioning, keyboard nav, and rich dialog panels",
        "Dropdown — searchable select with type-to-filter and scrollable option lists",
        "DatePicker — single/range date & datetime with typed formats, disablePast, min/max",
        "Tooltip — hover/focus tooltip with placement and delay",
        "Markdown — lightweight renderer for docs/changelogs with fenced CodeBlock support",
        "Timeline — vertical/horizontal orientation, items config, statusColors",
        "ServerQuery component and useServerQuery hook for API-driven UI with loading, error, and retry",
        "Calendar component with multi-slot-per-day booking",
        "Docs search, TOC scroll-spy, and site-wide theme toggle",
        "Page templates section, PWA support, Roadmap & Changelog docs",
        "Landing header Menu mega-panel and custom search suggestions",
      ],
      changed: [
        "Landing hero height is content-driven with viewport min-height",
        "Landing feature/template bands use band-aware surface tokens",
        "Menu and Dropdown panels portal with viewport-aware placement",
        "Docs pages scroll to top on route change",
      ],
      fixed: [
        "Menu hover contrast for readable labels",
        "Landing Menu panel alignment and Explore row height",
        "Doc pages starting scrolled to bottom when navigating between components",
        "Missing navigation when landing on live template demos",
      ],
    },
  },
  {
    version: "0.1.0",
    date: "2026-01-15",
    summary: "First npm-ready release with core components, data grid, toast, and auth primitives.",
    sections: {
      added: [
        "Button, Input, Card, Dialog, Tabs, Accordion, Switch, Badge, Label",
        "Table and DataGrid (native engine) with sorting and export",
        "Toast provider with imperative toast() API",
        "LoginForm and OAuthButton (Microsoft, Google, GitHub, Apple)",
        "AxiomProvider for theme, motion presets, GTM analytics, and error monitoring",
        "Tree-shakable subpath exports (axiom-ui/button, axiom-ui/data-grid, etc.)",
        "CSS variable theming with light/dark modes",
      ],
      changed: [
        "Package exports flattened to dist/*.js for better bundler compatibility",
      ],
    },
  },
  {
    version: "0.0.1",
    date: "2025-11-01",
    summary: "Internal alpha — library architecture, Vite build, Vitest, and Storybook foundation.",
    sections: {
      added: [
        "Vite library mode with preserveModules tree-shaking",
        "Vitest + React Testing Library test setup",
        "Storybook 8 with accessibility addon",
        "Changesets for versioning and releases",
        "ESLint, Prettier, and GitHub Actions CI",
      ],
    },
  },
];

export const CHANGELOG_CHANGE_LABELS: Record<ChangelogChangeType, string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  deprecated: "Deprecated",
  removed: "Removed",
  security: "Security",
};

export const CHANGELOG_SECTION_ORDER: ChangelogChangeType[] = [
  "added",
  "changed",
  "fixed",
  "deprecated",
  "removed",
  "security",
];
