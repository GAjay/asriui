import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("shows content on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delayDuration={0}>
        <Tooltip.Trigger>
          <Button>Hover</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Helpful hint</Tooltip.Content>
      </Tooltip>,
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await user.hover(screen.getByRole("button", { name: "Hover" }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful hint");
  });

  it("hides on unhover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delayDuration={0} skipDelayDuration={0}>
        <Tooltip.Trigger>
          <Button>Hover</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Hint</Tooltip.Content>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Hover" }));
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    await user.unhover(screen.getByRole("button", { name: "Hover" }));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
