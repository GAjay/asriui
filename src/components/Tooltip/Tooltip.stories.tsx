import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger>
        <Button variant="outline">Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Install with pnpm add axiom-ui</Tooltip.Content>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", padding: "4rem" }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement}>
          <Tooltip.Trigger>
            <Button size="sm" variant="ghost">
              {placement}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement={placement}>Tooltip on {placement}</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  ),
};
