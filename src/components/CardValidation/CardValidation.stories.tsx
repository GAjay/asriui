import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import { CardValidation } from "./CardValidation";
import type { CardValidationValues } from "./CardValidation.types";
import { validateCardValues } from "./validate";

const meta = {
  title: "Components/CardValidation",
  component: CardValidation,
} satisfies Meta<typeof CardValidation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helperText: "Use Stripe test card 4242 4242 4242 4242.",
  },
};

export const WithoutPreview: Story = {
  args: {
    showPreview: false,
    showName: false,
  },
};

export const CheckoutFlow: Story = {
  render: function CheckoutFlowStory() {
    const [values, setValues] = useState<Partial<CardValidationValues>>({});
    const [message, setMessage] = useState("");

    return (
      <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <CardValidation values={values} onChange={setValues} />
        <Button
          onClick={() => {
            const errors = validateCardValues(values, { requireName: true });
            setMessage(Object.keys(errors).length ? "Fix card details" : "Card looks valid");
          }}
        >
          Pay now
        </Button>
        {message ? <p style={{ margin: 0 }}>{message}</p> : null}
      </div>
    );
  },
};
