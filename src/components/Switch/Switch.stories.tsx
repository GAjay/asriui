import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Label } from "../Label";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Switch
          id="notifications"
          checked={checked}
          onCheckedChange={setChecked}
          aria-labelledby="notifications-label"
        />
        <Label id="notifications-label" htmlFor="notifications">
          Email notifications
        </Label>
      </div>
    );
  },
};
