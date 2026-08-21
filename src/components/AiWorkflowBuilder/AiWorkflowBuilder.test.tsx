import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AiWorkflowBuilder } from "./AiWorkflowBuilder";
import { AI_WORKFLOW_TEMPLATES } from "./workflowTemplates";

describe("AiWorkflowBuilder", () => {
  it("renders palette, canvas fallback, and inspector", () => {
    render(<AiWorkflowBuilder height={320} />);

    expect(screen.getByRole("region", { name: "AI workflow builder" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Start" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Run workflow" })).toBeInTheDocument();
    expect(screen.getByText(/Drag items from the palette onto the canvas/i)).toBeInTheDocument();
  });

  it("shows workflow templates in the Start tab", () => {
    render(<AiWorkflowBuilder height={320} />);

    expect(screen.getAllByText("Omnichannel notify").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Blank canvas").length).toBeGreaterThan(0);
    expect(screen.getByText(/Start from a template/i)).toBeInTheDocument();
  });

  it("loads a different base template from the toolbar picker", async () => {
    const user = userEvent.setup();
    render(<AiWorkflowBuilder height={320} />);

    await user.click(screen.getByRole("combobox", { name: "Template" }));
    await user.click(screen.getByRole("option", { name: "Blank canvas" }));

    expect(screen.getByText("AI workflow builder").nextElementSibling).toHaveTextContent("0 nodes · 0 connections");
  });

  it("shows AsriUI components and integration blocks in the palette", () => {
    render(<AiWorkflowBuilder height={320} />);

    fireEvent.click(screen.getByRole("tab", { name: "UI" }));
    expect(screen.getByRole("button", { name: "Add Button component node" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Blocks" }));
    expect(screen.getByRole("button", { name: "Add WhatsApp block" })).toBeInTheDocument();
    expect(screen.getByText("Add custom block")).toBeInTheDocument();
  });

  it("loads an omnichannel template with multiple connected blocks", () => {
    const template = AI_WORKFLOW_TEMPLATES.find((item) => item.id === "omnichannel-notify");
    expect(template?.nodes.length).toBeGreaterThan(4);
    expect(template?.edges.length).toBeGreaterThan(4);
  });

  it("merges custom UI components into the palette", () => {
    render(
      <AiWorkflowBuilder
        height={320}
        customComponents={[
          {
            slug: "pricing-card",
            name: "PricingCard",
            category: "custom",
            description: "Custom pricing surface.",
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "UI" }));
    expect(screen.getByRole("button", { name: "Add PricingCard component node" })).toBeInTheDocument();
  });
});
