import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles checked state", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" defaultChecked={false} />);
    const input = screen.getByRole("checkbox");
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });
});
