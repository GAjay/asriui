import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with a value and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Email" value="a" onChange={onChange} />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveValue("a");
    await user.type(input, "b");
    expect(onChange).toHaveBeenCalled();
  });

  it("associates the label with the input", () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText("Name")).toBeDisabled();
  });

  it("sets aria-invalid and shows error message", () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText(/Email/);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    expect(input).toHaveAttribute("aria-describedby", expect.stringContaining("error"));
  });

  it("exposes helper text via aria-describedby", () => {
    render(<Input label="Password" helperText="At least 8 characters" />);
    const input = screen.getByLabelText("Password");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent("At least 8 characters");
  });

  it("sets aria-required when required", () => {
    render(<Input label="Email" required />);
    expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-required", "true");
  });

  it("renders prefix and suffix", () => {
    render(<Input label="Amount" prefix="$" suffix="USD" />);
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
