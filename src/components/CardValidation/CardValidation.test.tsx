import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CardValidation } from "./CardValidation";

describe("CardValidation", () => {
  it("formats the card number and detects Visa", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CardValidation onChange={onChange} showPreview />);

    const number = screen.getByLabelText(/Card number/i);
    await user.type(number, "4242424242424242");

    expect(number).toHaveValue("4242 4242 4242 4242");
    expect(screen.getAllByText(/Visa/i).length).toBeGreaterThan(0);
    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls.at(-1)?.[0];
    expect(last.number).toBe("4242424242424242");
  });

  it("shows validation errors on blur for empty required fields", async () => {
    const user = userEvent.setup();
    render(<CardValidation showName={false} />);

    await user.click(screen.getByLabelText(/Card number/i));
    await user.tab();

    expect(await screen.findByText(/Card number is required/i)).toBeInTheDocument();
  });

  it("accepts a valid amex payload", async () => {
    const user = userEvent.setup();
    const onValidate = vi.fn();

    render(<CardValidation showName={false} onValidate={onValidate} validateOn="blur" />);

    await user.type(screen.getByLabelText(/Card number/i), "378282246310005");
    await user.type(screen.getByLabelText(/Expiry/i), "1228");
    await user.type(screen.getByLabelText(/CID/i), "1234");
    await user.tab();

    const last = onValidate.mock.calls.at(-1)?.[0];
    expect(last).toEqual({});
  });
});
