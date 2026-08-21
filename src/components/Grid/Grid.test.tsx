import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children", () => {
    const { container } = render(
      <Grid variant="fixed" columns={2} motion={false}>
        <div>One</div>
        <div>Two</div>
      </Grid>,
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(container.querySelector("[data-layout-item]")).toBeNull();
  });

  it("wraps auto-fill children for layout animation by default", () => {
    const { container } = render(
      <Grid variant="auto" minColumnWidth={120}>
        <div key="a">One</div>
        <div key="b">Two</div>
      </Grid>,
    );

    expect(container.querySelectorAll("[data-layout-item]")).toHaveLength(2);
    expect(container.firstChild).toHaveAttribute("data-layout", "true");
  });

  it("skips layout wrappers when motion is false", () => {
    const { container } = render(
      <Grid variant="auto" motion={false}>
        <div>One</div>
      </Grid>,
    );

    expect(container.querySelector("[data-layout-item]")).toBeNull();
    expect(container.firstChild).not.toHaveAttribute("data-layout");
  });
});
