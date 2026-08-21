import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabChildren = (
  <>
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="password">Password</Tabs.Trigger>
      <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
    <Tabs.Content value="password">Change your password here.</Tabs.Content>
    <Tabs.Content value="billing">Manage billing details here.</Tabs.Content>
  </>
);

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" style={{ width: 420 }}>
      {tabChildren}
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="underline" style={{ width: 420 }}>
      {tabChildren}
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="pills" style={{ width: 420 }}>
      {tabChildren}
    </Tabs>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="ghost" style={{ width: 420 }}>
      {tabChildren}
    </Tabs>
  ),
};
