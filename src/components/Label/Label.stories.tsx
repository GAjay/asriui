import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: "Email", htmlFor: "email" },
  render: (args) => (
    <div style={{ display: "grid", gap: 8 }}>
      <Label {...args} />
      <input id="email" placeholder="you@company.com" />
    </div>
  ),
};

export const Required: Story = {
  args: { children: "Password", htmlFor: "password", required: true },
  render: (args) => (
    <div style={{ display: "grid", gap: 8 }}>
      <Label {...args} />
      <input id="password" type="password" />
    </div>
  ),
};
