import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const FixedTwoColumns: Story = {
  render: () => (
    <Grid variant="fixed" columns={2} gap="md">
      <div style={{ padding: 16, background: "var(--asriui-color-muted)" }}>A</div>
      <div style={{ padding: 16, background: "var(--asriui-color-muted)" }}>B</div>
      <div style={{ padding: 16, background: "var(--asriui-color-muted)" }}>C</div>
      <div style={{ padding: 16, background: "var(--asriui-color-muted)" }}>D</div>
    </Grid>
  ),
};

export const AutoFill: Story = {
  parameters: {
    docs: {
      description: {
        story: "Resize the canvas to see cards animate between columns as the grid reflows.",
      },
    },
  },
  render: () => (
    <Grid variant="auto" minColumnWidth={180} gap="md">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ padding: 16, background: "var(--asriui-color-muted)" }}>
          Item {i + 1}
        </div>
      ))}
    </Grid>
  ),
};
