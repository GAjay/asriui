import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rounded" height={100} />
      <Skeleton variant="rectangular" height={60} />
    </div>
  ),
};

export const Presets: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxWidth: 360 }}>
      <Skeleton.Profile />
      <Skeleton.Card />
    </div>
  ),
};
