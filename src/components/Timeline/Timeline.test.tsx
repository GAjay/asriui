import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline } from "./Timeline";

describe("Timeline", () => {
  it("renders compound items with titles", () => {
    render(
      <Timeline>
        <Timeline.Item title="Alpha release" date="Jan 2026" status="complete" />
        <Timeline.Item title="Beta" status="active" />
      </Timeline>,
    );
    expect(screen.getByText("Alpha release")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders items from config", () => {
    render(
      <Timeline
        items={[
          { id: "a", title: "Install", status: "complete", date: "Step 1" },
          { id: "b", title: "Ship", status: "active", date: "Step 2" },
        ]}
      />,
    );
    expect(screen.getByText("Install")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
  });

  it("supports horizontal orientation", () => {
    const { container } = render(
      <Timeline
        orientation="horizontal"
        animateOnView={false}
        items={[
          { id: "1", title: "One", status: "complete" },
          { id: "2", title: "Two", status: "active" },
        ]}
      />,
    );
    expect(container.querySelector('[data-orientation="horizontal"]')).toBeTruthy();
  });

  it("applies status color tokens to items", () => {
    const { container } = render(
      <Timeline
        statusColors={{
          active: { dot: "#0284c7", dotBorder: "#0284c7" },
        }}
        items={[{ title: "Active step", status: "active" }]}
      />,
    );
    const item = container.querySelector('[data-status="active"]') as HTMLElement;
    expect(item.style.getPropertyValue("--timeline-dot")).toBe("#0284c7");
  });
});
