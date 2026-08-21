import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { Icon } from "../Icon";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Accordion type="single" collapsible defaultValue="getting-started">
        <Accordion.Item value="getting-started">
          <Accordion.Trigger icon={<Icon name="sparkles" size="sm" aria-hidden />}>
            Getting started
          </Accordion.Trigger>
          <Accordion.Content>
            Install the package, wrap your app in AxiomProvider, and import components from subpaths.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="components">
          <Accordion.Trigger icon={<Icon name="grid" size="sm" aria-hidden />}>
            Components
          </Accordion.Trigger>
          <Accordion.Content>
            Browse the catalog for buttons, forms, dialogs, and layout primitives.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Accordion type="single" collapsible variant="bordered" defaultValue="billing">
        <Accordion.Item value="account">
          <Accordion.Trigger
            startContent={<Icon name="check" size="sm" aria-hidden />}
            endContent={<Badge variant="secondary">Updated</Badge>}
          >
            Account
          </Accordion.Trigger>
          <Accordion.Content>Manage profile details and security settings.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="billing">
          <Accordion.Trigger endContent="Pro">Billing</Accordion.Trigger>
          <Accordion.Content>Update payment method and download invoices.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Accordion type="multiple" defaultValue={["faq-1"]} variant="ghost">
        <Accordion.Item value="faq-1">
          <Accordion.Trigger>What is Axiom UI?</Accordion.Trigger>
          <Accordion.Content>A design system and React component library for product teams.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="faq-2">
          <Accordion.Trigger>Can I use subpath imports?</Accordion.Trigger>
          <Accordion.Content>Yes — import from paths like axiom-ui/button or axiom-ui/accordion.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
