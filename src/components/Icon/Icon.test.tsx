import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders decorative built-in icon", () => {
    const { container } = render(<Icon name="rocket" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it("renders labeled built-in icon", () => {
    render(<Icon name="check" label="Success" />);
    expect(screen.getByRole("img", { name: "Success" })).toBeInTheDocument();
  });

  it("renders image source", () => {
    render(<Icon src="/logo.png" label="Company logo" />);
    const image = screen.getByRole("img", { name: "Company logo" });
    expect(image).toHaveAttribute("src", "/logo.png");
  });

  it("renders custom svg children from external libraries", () => {
    const { container } = render(
      <Icon label="Custom">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
        </svg>
      </Icon>,
    );
    expect(container.querySelector("circle")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Custom" })).toBeInTheDocument();
  });
});
