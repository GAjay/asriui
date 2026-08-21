import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hidden, Visible } from "./Visible";

describe("Visible", () => {
  it("shows and hides content", () => {
    const { rerender } = render(<Visible when>Shown</Visible>);
    expect(screen.getByText("Shown")).toBeVisible();
    rerender(<Visible when={false}>Shown</Visible>);
    expect(screen.queryByText("Shown")).not.toBeInTheDocument();
  });

  it("hides via Hidden helper", () => {
    render(
      <Hidden when>
        <span>Secret</span>
      </Hidden>,
    );
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });
});
