import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("commits a typed single date on blur", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DatePicker
        label="Start date"
        dateFormat="iso"
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByLabelText("Start date");
    await user.type(input, "2026-08-11");
    await user.tab();

    expect(onValueChange).toHaveBeenCalled();
    const value = onValueChange.mock.calls.at(-1)?.[0] as Date;
    expect(value.getFullYear()).toBe(2026);
    expect(value.getMonth()).toBe(7);
    expect(value.getDate()).toBe(11);
  });

  it("opens the calendar popover", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Date" />);

    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(screen.getByLabelText("Previous month")).toBeInTheDocument();
  });
});
