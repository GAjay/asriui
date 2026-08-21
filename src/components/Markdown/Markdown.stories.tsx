import type { Meta, StoryObj } from "@storybook/react";
import { Markdown } from "./Markdown";

const meta: Meta<typeof Markdown> = {
  title: "Components/Markdown",
  component: Markdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Markdown>;

const SAMPLE = `# AxiomUI Markdown

Render **docs**, *changelogs*, and README snippets with theme tokens.

## Features

- Headings, lists, and tables
- Inline \`code\` and fenced blocks
- [External links](https://example.com) open safely

\`\`\`tsx
import { Markdown } from "axiom-ui/markdown";

<Markdown source="# Hello" />
\`\`\`

| Prop | Type | Default |
| --- | --- | --- |
| source | string | — |
| showCodeCopy | boolean | true |

> Tip: Prefer \`source\` for dynamic content from a CMS or file fetch.
`;

export const Default: Story = {
  args: {
    source: SAMPLE,
  },
};

export const CompactSnippet: Story = {
  args: {
    children: "Install with `pnpm add axiom-ui`, then wrap your app in **AxiomProvider**.",
  },
};
