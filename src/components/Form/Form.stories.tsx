import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const JsonConfig: Story = {
  render: () => (
    <Form
      config={{
        id: "signup",
        submitLabel: "Create account",
        fields: [
          { name: "name", type: "text", label: "Name", required: true, minLength: 2 },
          { name: "email", type: "email", label: "Email", required: true },
          {
            name: "plan",
            type: "select",
            label: "Plan",
            required: true,
            options: [
              { label: "Free", value: "free" },
              { label: "Pro", value: "pro" },
            ],
          },
          { name: "terms", type: "switch", label: "Accept terms", required: true },
        ],
      }}
      onSubmit={(values) => console.log(values)}
    />
  ),
};
