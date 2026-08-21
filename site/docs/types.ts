import type { ReactNode } from "react";

export type DocCategory =
  | "getting-started"
  | "form"
  | "layout"
  | "feedback"
  | "navigation"
  | "data"
  | "advanced";

export type DocExample = {
  /** Anchor id for table of contents. */
  id: string;
  title: string;
  description?: string;
  code: string;
  preview: ReactNode;
};

export type ComponentDocMeta = {
  slug: string;
  name: string;
  description: string;
  category: DocCategory;
  /** Related component slugs for cross-links. */
  related?: string[];
  /** When to use this component. */
  whenToUse?: string;
};

export type ComponentDoc = ComponentDocMeta & {
  examples: DocExample[];
};

export const DOC_CATEGORY_LABELS: Record<DocCategory, string> = {
  "getting-started": "Overview",
  form: "Form",
  layout: "Layout",
  feedback: "Feedback",
  navigation: "Navigation",
  data: "Data Display",
  advanced: "Advanced",
};
