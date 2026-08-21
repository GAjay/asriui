import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger>Options</Menu.Trigger>
      <Menu.Content aria-label="Row actions">
        <Menu.Item onSelect={() => undefined}>Edit</Menu.Item>
        <Menu.Item onSelect={() => undefined}>Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item destructive onSelect={() => undefined}>
          Delete
        </Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Menu placement="bottom-end">
      <Menu.Trigger>Menu</Menu.Trigger>
      <Menu.Content>
        <Menu.Group label="Account">
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item>Settings</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group label="Support">
          <Menu.Item>Documentation</Menu.Item>
          <Menu.Item>Changelog</Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  ),
};
