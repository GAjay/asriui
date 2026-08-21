import type { Meta, StoryObj } from "@storybook/react";
import { AiWorkflowBuilder } from "./AiWorkflowBuilder";

const meta = {
  title: "Components/AiWorkflowBuilder",
  component: AiWorkflowBuilder,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual builder for AI agent workflows — palette, React Flow canvas, node inspector, and run/reset toolbar.",
      },
    },
  },
} satisfies Meta<typeof AiWorkflowBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: 1180 }}>
      <AiWorkflowBuilder
        onRun={({ nodes, edges }) => {
          console.log("Run workflow", { nodes, edges });
        }}
      />
    </div>
  ),
};

export const CanvasOnly: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: 900 }}>
      <AiWorkflowBuilder showPalette={false} showInspector={false} showTemplates={false} height={420} />
    </div>
  ),
};

export const OmnichannelTemplate: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: 1180 }}>
      <AiWorkflowBuilder templateId="omnichannel-notify" height={520} />
    </div>
  ),
};
