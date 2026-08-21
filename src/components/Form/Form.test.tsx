import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Form } from "./Form";

describe("Form", () => {
  it("validates required fields", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <Form
        config={{
          fields: [{ name: "email", type: "email", label: "Email", required: true }],
        }}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("submits valid values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <Form
        config={{
          fields: [{ name: "email", type: "email", label: "Email", required: true }],
        }}
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText(/Email/), "you@company.com");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith({ email: "you@company.com" });
  });
});
