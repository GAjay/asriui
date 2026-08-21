import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labeled text input with helper/error messaging, affixes, and correct ARIA relationships.",
      },
    },
  },
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "We will never share your email.",
  },
};

export const ErrorState: Story = {
  args: {
    error: "Invalid email",
    defaultValue: "not-an-email",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "disabled@example.com",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithAffixes: Story = {
  args: {
    label: "Price",
    prefix: "$",
    suffix: "USD",
    placeholder: "0.00",
  },
};

export const Controlled: Story = {
  render: function ControlledInput() {
    const [value, setValue] = useState("");
    return (
      <Input
        label="Username"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        helperText={`Length: ${value.length}`}
      />
    );
  },
};

export const Accessibility: Story = {
  args: {
    label: "Password",
    type: "password",
    required: true,
    helperText: "Must be at least 8 characters",
    autoComplete: "new-password",
  },
  parameters: {
    docs: {
      description: {
        story: "Label is associated via `htmlFor`. Helper text is linked with `aria-describedby`.",
      },
    },
  },
};
