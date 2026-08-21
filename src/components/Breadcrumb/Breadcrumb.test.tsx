import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders items trail with current page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Button", current: true },
        ]}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByText("Button")).toHaveAttribute("aria-current", "page");
  });

  it("uses slash as the default separator", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Button", current: true },
        ]}
      />,
    );

    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("supports a custom separator icon", () => {
    render(
      <Breadcrumb
        separator="›"
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Button", current: true },
        ]}
      />,
    );

    expect(screen.getByText("›")).toBeInTheDocument();
    expect(screen.queryByText("/")).not.toBeInTheDocument();
  });

  it("renders compound children", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item current>Settings</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("/")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toHaveAttribute("aria-current", "page");
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    render(<Breadcrumb showBack onBack={onBack} items={[{ label: "Docs", current: true }]} />);

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("supports back link href", () => {
    render(<Breadcrumb showBack backHref="/docs" backLabel="Back to docs" items={[]} />);
    expect(screen.getByRole("link", { name: "Back to docs" })).toHaveAttribute("href", "/docs");
  });
});
