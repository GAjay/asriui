import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const sample = `import { Button } from "axiom-ui/button";

export function App() {
  return <Button variant="primary">Click me</Button>;
}`;

export const Default: Story = {
  args: {
    code: sample,
    showCopy: true,
    filename: "App.tsx",
  },
};

export const WithLineNumbers: Story = {
  args: {
    code: sample,
    lineNumbers: true,
    showCopy: true,
  },
};
