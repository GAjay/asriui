import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible button with variants, sizes, loading state, and native button attribute support.",
      },
    },
    layout: "centered",
  },
  args: {
    children: "Button",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Saving...",
  },
};

export const LongText: Story = {
  args: {
    children: "Continue to the next step of your onboarding journey",
  },
};

export const KeyboardInteraction: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tab to focus the button, then press Enter or Space to activate.",
      },
    },
  },
  args: {
    children: "Focus me",
  },
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Button aria-label="Close notification">×</Button>
      <Button loading aria-label="Saving changes">
        Save
      </Button>
      <Button disabled>Unavailable action</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons need an accessible name. Loading sets `aria-busy` and disables the control.",
      },
    },
  },
};
