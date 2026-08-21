import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const ROADMAP_ITEMS = [
  {
    id: "core",
    title: "Core components",
    date: "Shipped",
    status: "complete" as const,
    description: "Button, Input, Card, Dialog, Tabs, and more.",
  },
  {
    id: "docs",
    title: "Docs & layouts",
    date: "Shipped",
    status: "complete" as const,
    description: "PageLayout, SideNav, CodeBlock, and full documentation site.",
  },
  {
    id: "advanced",
    title: "Advanced tooling",
    date: "Now",
    status: "active" as const,
    description: "Monaco editor, React Flow, JSON forms, and virtual lists.",
  },
  {
    id: "forms",
    title: "Select & DatePicker",
    date: "Soon",
    status: "default" as const,
    description: "More form primitives on the roadmap.",
  },
];

export const VerticalCompound: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Timeline>
        {ROADMAP_ITEMS.map((item) => (
          <Timeline.Item key={item.id} {...item} />
        ))}
      </Timeline>
    </div>
  ),
};

export const VerticalConfig: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Timeline items={ROADMAP_ITEMS} />
    </div>
  ),
};

export const HorizontalConfig: Story = {
  render: () => (
    <Timeline
      orientation="horizontal"
      items={ROADMAP_ITEMS}
      statusColors={{
        complete: { dot: "#059669", dotBorder: "#059669", connector: "#059669" },
        active: { dot: "#0284c7", dotBorder: "#0284c7", glow: "color-mix(in srgb, #0284c7 22%, transparent)" },
      }}
      trackColors={{ fill: "linear-gradient(90deg, #059669 0%, #0284c7 45%, #7c3aed 100%)" }}
      aria-label="Roadmap progress"
    />
  ),
};
