import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("renders tabs and switches content", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">Account settings</Tabs.Content>
        <Tabs.Content value="password">Password settings</Tabs.Content>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Account settings")).toBeVisible();

    await user.click(screen.getByRole("tab", { name: "Password" }));
    expect(screen.getByRole("tab", { name: "Password" })).toHaveAttribute("aria-selected", "true");
    await waitFor(() => {
      expect(screen.getByText("Password settings")).toBeVisible();
    });
  });

  it("calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="a" onValueChange={onValueChange}>
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger value="b">B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">A content</Tabs.Content>
        <Tabs.Content value="b">B content</Tabs.Content>
      </Tabs>,
    );

    await user.click(screen.getByRole("tab", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("renders underline variant with animated indicator", () => {
    render(
      <Tabs defaultValue="account" variant="underline">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">Account settings</Tabs.Content>
        <Tabs.Content value="password">Password settings</Tabs.Content>
      </Tabs>,
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveAttribute("data-variant", "underline");
    expect(screen.getByRole("tab", { name: "Account" })).toHaveClass(/activeUnderline/);
  });

  it("allows Tabs.List variant override", () => {
    render(
      <Tabs defaultValue="a" variant="default">
        <Tabs.List variant="ghost">
          <Tabs.Trigger value="a">A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">A content</Tabs.Content>
      </Tabs>,
    );

    expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "ghost");
  });
});
