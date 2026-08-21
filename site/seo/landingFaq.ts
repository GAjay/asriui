/** FAQ content for landing page (visible + JSON-LD for AEO / rich results). */
export type LandingFaqItem = {
  question: string;
  answer: string;
};

export const LANDING_FAQ: LandingFaqItem[] = [
  {
    question: "What is AsriUI?",
    answer:
      "AsriUI is a production-ready, open-source React UI component library built with TypeScript, CSS Modules, and Framer Motion. It includes forms, layout, data grids, docs tooling, and page templates with accessibility built in.",
  },
  {
    question: "How do I install AsriUI?",
    answer:
      "Run pnpm add asriui framer-motion, import asriui/style.css once in your app entry, wrap your tree with AsriUIProvider from asriui/config, and import components from asriui or subpaths like asriui/button.",
  },
  {
    question: "Is AsriUI free to use?",
    answer:
      "Yes. AsriUI is MIT licensed — use it in personal and commercial projects, fork it, and ship it with your product.",
  },
  {
    question: "Does AsriUI work with Next.js and Vite?",
    answer:
      "Yes. AsriUI ships as ESM with subpath exports. It works with Vite, Next.js App Router (client components), Remix, and other React 18+ bundlers.",
  },
  {
    question: "Can I use AsriUI with React Native?",
    answer:
      "AsriUI’s published components target React for the web (DOM + CSS Modules + Framer Motion). For React Native, reuse the same TypeScript models, validation helpers (for example CardValidation’s Luhn utilities), and design-token values in your RN screens, then render with React Native primitives or your native design system. Full native component ports are not in the npm package today — treat AsriUI as the web UI kit and share logic/tokens across platforms.",
  },
  {
    question: "How is AsriUI different from shadcn/ui?",
    answer:
      "Like shadcn, you own the source patterns — but AsriUI also ships as an npm package with a unified AsriUIProvider for theme, motion, analytics, and monitoring, plus built-in DataGrid, ServerQuery, docs site templates, and PWA-ready docs.",
  },
  {
    question: "Are AsriUI components accessible?",
    answer:
      "Yes. Components include ARIA roles, keyboard support, focus management, and respect for prefers-reduced-motion. Dialog, Switch, and form fields follow WAI-ARIA patterns.",
  },
];
