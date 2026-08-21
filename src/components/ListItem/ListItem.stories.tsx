import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "./ListItem";

const meta: Meta<typeof ListItem> = {
  title: "Components/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Accessible list rows with media, descriptions, and interactive states.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <List>
          <Story />
        </List>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    title: "Account",
    description: "Manage your profile and preferences",
  },
};

export const WithMedia: Story = {
  args: {
    title: "Billing",
    description: "Plans and invoices",
    media: "B",
    trailing: "Pro",
  },
};

export const Interactive: Story = {
  args: {
    title: "Sign out",
    description: "End your session on this device",
    interactive: true,
  },
};

export const Selected: Story = {
  args: {
    title: "Notifications",
    description: "Email and push alerts",
    interactive: true,
    selected: true,
  },
};

export const Group: Story = {
  render: () => (
    <List aria-label="Workspace settings">
      <ListItem title="General" description="Name, timezone, language" media="G" trailing="›" />
      <ListItem
        title="Members"
        description="Invite and manage access"
        media="M"
        trailing="12"
        interactive
        selected
      />
      <ListItem title="Billing" description="Subscription and invoices" media="B" trailing="›" />
    </List>
  ),
};
