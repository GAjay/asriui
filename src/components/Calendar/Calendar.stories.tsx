import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";
import type { CalendarSlotSelection } from "./Calendar.types";

const booked: CalendarSlotSelection[] = [
  { date: "2026-08-12", slotId: "09:00" },
  { date: "2026-08-12", slotId: "09:30" },
];

function BookingDemo() {
  const [selection, setSelection] = useState<CalendarSlotSelection[]>([]);

  return (
    <Calendar
      defaultMonth={new Date(2026, 7, 1)}
      value={selection}
      onValueChange={setSelection}
      booked={booked}
      maxSelections={6}
      minDate={new Date(2026, 7, 1)}
      maxDate={new Date(2026, 7, 31)}
      daySlots={{
        "2026-08-15": [
          { id: "10:00", label: "10:00 AM", start: "10:00", end: "11:00" },
          { id: "14:00", label: "02:00 PM", start: "14:00", end: "15:00" },
        ],
      }}
    />
  );
}

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Booking: Story = {
  render: () => <BookingDemo />,
};

export const WeekStartsMonday: Story = {
  render: () => (
    <Calendar
      defaultMonth={new Date(2026, 7, 1)}
      weekStartsOn={1}
      defaultActiveDate="2026-08-11"
    />
  ),
};
