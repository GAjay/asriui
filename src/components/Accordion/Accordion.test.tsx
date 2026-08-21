import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("expands and collapses a single section", async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="single" collapsible defaultValue="a">
        <Accordion.Item value="a">
          <Accordion.Trigger>Section A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>Section B</Accordion.Trigger>
          <Accordion.Content>Content B</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const triggerA = screen.getByRole("button", { name: "Section A" });
    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content A")).toBeVisible();

    await user.click(triggerA);
    expect(triggerA).toHaveAttribute("aria-expanded", "false");

    await user.click(screen.getByRole("button", { name: "Section B" }));
    expect(screen.getByRole("button", { name: "Section B" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content B")).toBeVisible();
    expect(screen.getByRole("button", { name: "Section A" })).toHaveAttribute("aria-expanded", "false");
  });

  it("allows multiple open sections", async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="multiple" defaultValue={["a"]}>
        <Accordion.Item value="a">
          <Accordion.Trigger>Section A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>Section B</Accordion.Trigger>
          <Accordion.Content>Content B</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    await user.click(screen.getByRole("button", { name: "Section B" }));
    expect(screen.getByRole("button", { name: "Section A" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Section B" })).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Accordion type="single" defaultValue="a" onValueChange={onValueChange}>
        <Accordion.Item value="a">
          <Accordion.Trigger>Section A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>Section B</Accordion.Trigger>
          <Accordion.Content>Content B</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    await user.click(screen.getByRole("button", { name: "Section B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("renders start and end side content", () => {
    render(
      <Accordion type="single" defaultValue="a">
        <Accordion.Item value="a">
          <Accordion.Trigger
            icon={<span data-testid="start-icon" />}
            endContent={<span data-testid="end-content">3</span>}
          >
            Notifications
          </Accordion.Trigger>
          <Accordion.Content>Alerts</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-content")).toHaveTextContent("3");
  });

  it("respects disabled items", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Accordion type="single" onValueChange={onValueChange}>
        <Accordion.Item value="a" disabled>
          <Accordion.Trigger>Section A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    await user.click(screen.getByRole("button", { name: "Section A" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
