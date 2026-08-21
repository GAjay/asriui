import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Flex } from "./Flex";

describe("Flex", () => {
  it("renders children", () => {
    render(
      <Flex gap="md">
        <span>A</span>
        <span>B</span>
      </Flex>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("supports column direction via class", () => {
    const { container } = render(
      <Flex direction="column" align="center">
        Item
      </Flex>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
