import type { TimelineItemStatus } from "../../src/components/Timeline";

export type RoadmapUseCase = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  components: string[];
};

export type RoadmapMilestone = {
  id: string;
  title: string;
  date: string;
  status: TimelineItemStatus;
  description: string;
  highlights: string[];
};

export type RoadmapPhase = {
  id: string;
  label: string;
  timeframe: string;
  items: string[];
};

export const ROADMAP_USE_CASES: RoadmapUseCase[] = [
  {
    id: "dashboards",
    title: "Admin & SaaS dashboards",
    problem: "Teams rebuild the same sidebar shells, data tables, and loading states for every internal tool.",
    solution:
      "PageLayout + SideNav for shells, DataGrid and Table for sortable data, Loader and Skeleton for async views, and Toast for actions.",
    components: ["PageLayout", "SideNav", "DataGrid", "Table", "Toast", "Loader"],
  },
  {
    id: "forms",
    title: "Form-heavy products",
    problem: "CMS-driven or config-driven forms need validation without pulling in heavy form libraries.",
    solution:
      "JSON-driven Form with built-in rules, plus Input, Label, Switch, Dropdown, DatePicker, and Calendar for booking flows.",
    components: ["Form", "Input", "Label", "Switch", "Dropdown", "DatePicker", "Calendar"],
  },
  {
    id: "docs",
    title: "Documentation & design systems",
    problem: "Component libraries need live examples, API tables, and search — usually custom-built each time.",
    solution:
      "This docs site is copy-ready: PageLayout, SideNav, CodeBlock, live previews, search, and per-component API reference.",
    components: ["PageLayout", "SideNav", "CodeBlock", "Breadcrumb", "Typography"],
  },
  {
    id: "marketing",
    title: "Marketing & landing pages",
    problem: "Designers want polished About, Pricing, and Contact pages without designing from scratch.",
    solution: "Copy-paste page templates with centered and sidebar layouts, live demos, and matching styles.",
    components: ["PageLayout", "Card", "Accordion", "Form", "Typography"],
  },
  {
    id: "async",
    title: "Server-driven UI",
    problem: "Fetching API data means repeating loading spinners, error messages, and retry logic in every screen.",
    solution: "ServerQuery wraps fetch with Loader, error UI, and retry — or use useServerQuery headlessly.",
    components: ["ServerQuery", "Loader", "Skeleton", "ErrorBoundary"],
  },
  {
    id: "auth",
    title: "Sign-in & onboarding",
    problem: "OAuth and email login UIs are repetitive and easy to get wrong for accessibility.",
    solution: "LoginForm with OAuth buttons (Microsoft, Google, GitHub, Apple) and a ready Login page template.",
    components: ["LoginForm", "OAuthButton", "Input", "Button"],
  },
];

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: "core",
    title: "Core component library",
    date: "Shipped",
    status: "complete",
    description: "Accessible primitives for forms, layout, feedback, and navigation.",
    highlights: ["Button", "Input", "Card", "Dialog", "Tabs", "Switch", "Badge", "Breadcrumb", "Link"],
  },
  {
    id: "data",
    title: "Data & tables",
    date: "Shipped",
    status: "complete",
    description: "Native and AG Grid engines, export, editable cells, and virtualization.",
    highlights: ["Table", "DataGrid", "VirtualList", "CSV/Excel export", "Pagination"],
  },
  {
    id: "docs-site",
    title: "Documentation site",
    date: "Shipped",
    status: "complete",
    description: "Full docs with search, component catalog, templates, PWA, and performance metrics.",
    highlights: ["Live examples", "API tables", "Docs search", "Page templates", "PWA install"],
  },
  {
    id: "templates",
    title: "Page templates & auth",
    date: "Shipped",
    status: "complete",
    description: "Production page shells and sign-in flows developers can copy in minutes.",
    highlights: ["About / Contact / Pricing", "Dashboard", "Login + OAuth", "ServerQuery"],
  },
  {
    id: "forms-next",
    title: "Advanced form primitives",
    date: "Shipped (partial)",
    status: "complete",
    description:
      "Select-style Dropdown, DatePicker (single/range/datetime), and Menu for action lists — field arrays still planned.",
    highlights: ["Dropdown (searchable)", "DatePicker & ranges", "Menu", "Tooltip", "Timeline orientation"],
  },
  {
    id: "forms-arrays",
    title: "Form field arrays & Combobox",
    date: "In progress",
    status: "active",
    description: "Closing remaining enterprise form gaps after Dropdown and DatePicker.",
    highlights: ["Combobox / autocomplete", "Multi-select", "Field arrays in Form", "Dependent validation"],
  },
  {
    id: "dx",
    title: "Developer experience",
    date: "Q3 2026",
    status: "default",
    description: "Tooling so teams adopt AxiomUI faster across repos and design handoffs.",
    highlights: ["CLI scaffold", "Figma kit", "Theme presets gallery", "Migration guides from MUI/Chakra"],
  },
  {
    id: "ecosystem",
    title: "Ecosystem & scale",
    date: "Exploring",
    status: "default",
    description: "Community themes, plugin API, and optional charting for analytics products.",
    highlights: ["Community themes", "Plugin API", "Charts layer", "i18n & RTL", "React Native component ports"],
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "now",
    label: "Now",
    timeframe: "Current focus",
    items: [
      "Combobox / autocomplete and multi-select",
      "Form field arrays and dependent validation",
      "Storybook coverage for every component",
      "Accessibility audit pass (WCAG 2.2 AA)",
    ],
  },
  {
    id: "next",
    label: "Next",
    timeframe: "Following releases",
    items: [
      "Command palette & search dialog patterns",
      "File upload and drag-drop zone",
      "Notification center (inbox-style)",
      "DataGrid server-side sorting & filtering recipes",
    ],
  },
  {
    id: "later",
    label: "Later",
    timeframe: "On the horizon",
    items: [
      "Chart primitives for dashboards",
      "Official Figma ↔ code token sync",
      "create-axiom-app CLI",
      "Vue/Svelte adapters (community RFC)",
    ],
  },
];
