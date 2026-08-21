import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders a full-width text hero", () => {
    const { container } = render(
      <Hero variant="full" align="center">
        <Hero.Copy>
          <Hero.Eyebrow>Product</Hero.Eyebrow>
          <Hero.Title>Build faster</Hero.Title>
          <Hero.Description>Accessible React components.</Hero.Description>
          <Hero.Actions>
            <button type="button">Get started</button>
          </Hero.Actions>
        </Hero.Copy>
      </Hero>,
    );

    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-variant", "full");
    expect(screen.getByRole("heading", { name: "Build faster" })).toBeInTheDocument();
    expect(screen.getByText("Accessible React components.")).toBeInTheDocument();
  });

  it("places copy on the right in split layout", () => {
    const { container } = render(
      <Hero variant="split" textSide="right">
        <Hero.Copy>
          <Hero.Title>Right text</Hero.Title>
        </Hero.Copy>
        <Hero.Media>Visual</Hero.Media>
      </Hero>,
    );

    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-variant", "split");
    expect(root).toHaveAttribute("data-text-side", "right");
    expect(screen.getByText("Visual")).toBeInTheDocument();
  });

  it("applies a dotted animated background", () => {
    const { container } = render(
      <Hero variant="full" background="dotted" animated>
        <Hero.Copy>
          <Hero.Title>Dotted</Hero.Title>
        </Hero.Copy>
      </Hero>,
    );

    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-background", "dotted");
    expect(root?.querySelector("[aria-hidden='true']")).toBeTruthy();
  });
});
