import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm, OAuthButton } from "./index";

describe("Auth", () => {
  it("renders OAuth providers", () => {
    render(<OAuthButton provider="microsoft" />);
    expect(screen.getByRole("button", { name: /continue with microsoft/i })).toBeInTheDocument();
  });

  it("submits credentials", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} providers={[]} />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), "dev@asriui.dev");
    await user.type(screen.getByLabelText(/password/i), "secret123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "dev@asriui.dev",
      password: "secret123",
      remember: false,
    });
  });
});
