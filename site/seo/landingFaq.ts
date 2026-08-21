/** FAQ content for landing page (visible + JSON-LD for AEO / rich results). */
export type LandingFaqItem = {
  question: string;
  answer: string;
};

export const LANDING_FAQ: LandingFaqItem[] = [
  {
    question: "What is AxiomUI?",
    answer:
      "AxiomUI is a production-ready, open-source React UI component library built with TypeScript, CSS Modules, and Framer Motion. It includes forms, layout, data grids, docs tooling, and page templates with accessibility built in.",
  },
  {
    question: "How do I install AxiomUI?",
    answer:
      "Run pnpm add axiom-ui framer-motion, import axiom-ui/style.css once in your app entry, wrap your tree with AxiomProvider from axiom-ui/config, and import components from axiom-ui or subpaths like axiom-ui/button.",
  },
  {
    question: "Is AxiomUI free to use?",
    answer:
      "Yes. AxiomUI is MIT licensed — use it in personal and commercial projects, fork it, and ship it with your product.",
  },
  {
    question: "Does AxiomUI work with Next.js and Vite?",
    answer:
      "Yes. AxiomUI ships as ESM with subpath exports. It works with Vite, Next.js App Router (client components), Remix, and other React 18+ bundlers.",
  },
  {
    question: "Can I use AxiomUI with React Native?",
    answer:
      "AxiomUI’s published components target React for the web (DOM + CSS Modules + Framer Motion). For React Native, reuse the same TypeScript models, validation helpers (for example CardValidation’s Luhn utilities), and design-token values in your RN screens, then render with React Native primitives or your native design system. Full native component ports are not in the npm package today — treat AxiomUI as the web UI kit and share logic/tokens across platforms.",
  },
  {
    question: "How is AxiomUI different from shadcn/ui?",
    answer:
      "Like shadcn, you own the source patterns — but AxiomUI also ships as an npm package with a unified AxiomProvider for theme, motion, analytics, and monitoring, plus built-in DataGrid, ServerQuery, docs site templates, and PWA-ready docs.",
  },
  {
    question: "Are AxiomUI components accessible?",
    answer:
      "Yes. Components include ARIA roles, keyboard support, focus management, and respect for prefers-reduced-motion. Dialog, Switch, and form fields follow WAI-ARIA patterns.",
  },
];
