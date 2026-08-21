import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ColorPalette } from "./ColorPalette";

describe("ColorPalette", () => {
  it("renders swatches", () => {
    render(
      <ColorPalette
        colors={[{ name: "Brand", value: "#000000", token: "--brand" }]}
        copyable={false}
      />,
    );
    expect(screen.getByRole("list", { name: "Color palette" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: /Brand color/ })).toBeInTheDocument();
  });
});
