import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Stable</Badge>);
    expect(screen.getByText("Stable")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>New</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error").className).toMatch(/destructive/);
    rerender(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline").className).toMatch(/outline/);
  });
});
