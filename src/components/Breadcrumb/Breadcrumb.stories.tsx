import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const WithBack: Story = {
  render: () => (
    <Breadcrumb
      showBack
      onBack={() => undefined}
      items={[
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components/button" },
        { label: "Button", current: true },
      ]}
    />
  ),
};

export const Compound: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Back label="Back" onClick={() => undefined} />
      <Breadcrumb.List>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item href="/settings">Settings</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item current>Profile</Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb
      separator="›"
      items={[
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: "Button", current: true },
      ]}
    />
  ),
};
