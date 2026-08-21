import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("renders with accessible status role", () => {
    render(<Loader label="Saving changes" />);
    expect(screen.getByRole("status", { name: "Saving changes" })).toBeInTheDocument();
  });

  it("renders dots variant", () => {
    const { container } = render(<Loader variant="dots" />);
    expect(container.querySelector('[class*="dots"]')).toBeTruthy();
  });
});
