import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Typography } from "./Typography";

describe("Typography", () => {
  it("renders heading variant", () => {
    render(<Typography.H1>Title</Typography.H1>);
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
  });

  it("renders muted text", () => {
    render(<Typography.Muted>Helper</Typography.Muted>);
    expect(screen.getByText("Helper")).toBeInTheDocument();
  });
});
