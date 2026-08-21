import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders skeleton element", () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId("sk")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(<Skeleton variant="circular" width={32} height={32} data-testid="sk" />);
    expect(screen.getByTestId("sk").className).toMatch(/circular/);
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders profile preset", () => {
    const { container } = render(<Skeleton.Profile />);
    expect(container.querySelectorAll('[role="status"]').length).toBeGreaterThan(0);
  });
});
