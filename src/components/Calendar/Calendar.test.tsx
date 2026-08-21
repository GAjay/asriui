import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Calendar } from "./Calendar";
import { normalizeSelection, toggleSelection, toDateKey } from "./Calendar.utils";

describe("Calendar utils", () => {
  it("creates stable date keys", () => {
    expect(toDateKey(new Date(2026, 7, 11))).toBe("2026-08-11");
  });

  it("toggles slot selection", () => {
    const first = toggleSelection([], "2026-08-11", "09:00");
    expect(first).toEqual([{ date: "2026-08-11", slotId: "09:00" }]);

    const second = toggleSelection(first, "2026-08-11", "10:00");
    expect(second).toHaveLength(2);

    const removed = toggleSelection(second, "2026-08-11", "09:00");
    expect(removed).toHaveLength(1);
  });

  it("respects max selections", () => {
    const selection = normalizeSelection([
      { date: "2026-08-11", slotId: "09:00" },
      { date: "2026-08-11", slotId: "10:00" },
    ]);
    const next = toggleSelection(selection, "2026-08-12", "09:00", 2);
    expect(next).toHaveLength(2);
  });
});

describe("Calendar", () => {
  it("selects multiple slots on a day", async () => {
    const user = userEvent.setup();

    render(
      <Calendar
        defaultMonth={new Date(2026, 7, 1)}
        defaultActiveDate="2026-08-11"
      />,
    );

    await user.click(screen.getByRole("button", { name: /09:00 am/i }));
    await user.click(screen.getByRole("button", { name: /10:00 am/i }));

    expect(screen.getByRole("button", { name: /09:00 am/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /10:00 am/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/your bookings \(2\)/i)).toBeInTheDocument();
  });

  it("navigates months", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={new Date(2026, 7, 1)} />);

    expect(screen.getByText("August 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });
});
