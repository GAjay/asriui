import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders children in a scrollable viewport", () => {
    render(
      <ScrollArea height={200} data-testid="scroll-area">
        <p>Scrollable content</p>
      </ScrollArea>,
    );

    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
    expect(screen.getByTestId("scroll-area").querySelector('[class*="viewport"]')).toBeTruthy();
  });

  it("forwards ref to the viewport", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ScrollArea ref={ref} height={180}>
        <div>Item</div>
      </ScrollArea>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports page mode", () => {
    render(
      <ScrollArea page data-testid="page-scroll">
        <main>Page body</main>
      </ScrollArea>,
    );

    const root = screen.getByTestId("page-scroll");
    expect(root).toHaveAttribute("data-page", "true");
    expect(screen.getByText("Page body")).toBeInTheDocument();
  });

  it("exposes an accessible region label when provided", () => {
    render(
      <ScrollArea height={160} label="Activity feed">
        <div>Row</div>
      </ScrollArea>,
    );

    expect(screen.getByRole("region", { name: "Activity feed" })).toBeInTheDocument();
  });
});
