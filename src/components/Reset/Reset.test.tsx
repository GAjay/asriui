import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Reset } from "./Reset";

describe("Reset", () => {
  it("resets scoped values to defaults", async () => {
    const user = userEvent.setup();

    render(
      <Reset.Root defaults={{ size: "md" }}>
        {({ values, setValue }) => (
          <>
            <span data-testid="size">{values.size}</span>
            <button type="button" onClick={() => setValue("size", "lg")}>
              Grow
            </button>
            <Reset.Trigger />
          </>
        )}
      </Reset.Root>,
    );

    expect(screen.getByTestId("size")).toHaveTextContent("md");
    await user.click(screen.getByRole("button", { name: "Grow" }));
    expect(screen.getByTestId("size")).toHaveTextContent("lg");
    await user.click(screen.getByRole("button", { name: "Reset to defaults" }));
    expect(screen.getByTestId("size")).toHaveTextContent("md");
  });

  it("applies className on the root wrapper and trigger", () => {
    render(
      <Reset.Root defaults={{ size: "md" }} className="custom-reset">
        <Reset.Trigger className="custom-trigger" />
      </Reset.Root>,
    );

    expect(document.querySelector(".custom-reset")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset to defaults" })).toHaveClass("custom-trigger");
  });
});
