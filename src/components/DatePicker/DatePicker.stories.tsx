import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import type { DatePickerRangeValue } from "./DatePicker.types";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const SingleDate: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Appointment"
        disablePast
        value={value}
        onValueChange={setValue}
        helperText="Past dates are disabled"
      />
    );
  },
};

export const DateTime: Story = {
  render: () => (
    <DatePicker
      label="Meeting"
      precision="datetime"
      dateFormat="us"
      defaultValue={new Date(2026, 7, 11, 14, 30)}
    />
  ),
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DatePickerRangeValue>({ from: null, to: null });
    return (
      <DatePicker
        label="Travel dates"
        mode="range"
        disablePast
        rangeValue={range}
        onRangeValueChange={setRange}
        helperText="Select a start and end date"
      />
    );
  },
};
