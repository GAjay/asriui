import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compound card layout with Header, Title, Content, and Footer subcomponents.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Account</Card.Title>
      </Card.Header>
      <Card.Content>Account information</Card.Content>
      <Card.Footer>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card>
      <Card.Content>A minimal card with content only.</Card.Content>
    </Card>
  ),
};

export const WithCustomHeading: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title as="h3">Billing</Card.Title>
      </Card.Header>
      <Card.Content>Manage your subscription and invoices.</Card.Content>
    </Card>
  ),
};

export const NestedActions: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Danger zone</Card.Title>
      </Card.Header>
      <Card.Content>Deleting a workspace is permanent and cannot be undone.</Card.Content>
      <Card.Footer>
        <Button variant="danger">Delete workspace</Button>
      </Card.Footer>
    </Card>
  ),
};
