import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeSwitch } from "./ThemeSwitch";

describe("ThemeSwitch", () => {
  it("renders accessible toggle", () => {
    render(<ThemeSwitch theme="light" onThemeChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /switch to dark theme/i })).toBeInTheDocument();
  });

  it("shows label when requested", () => {
    render(<ThemeSwitch theme="dark" onThemeChange={vi.fn()} showLabel />);
    expect(screen.getByText("Dark")).toBeInTheDocument();
  });
});
