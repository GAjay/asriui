import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports polymorphic as prop", () => {
    const { container } = render(<Container as="section">Section</Container>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
