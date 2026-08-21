import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock", () => {
  it("renders code content", () => {
    render(<CodeBlock code={'const x = "hello";'} />);
    expect(screen.getByText("const")).toBeInTheDocument();
    expect(screen.getByText(/"hello"/)).toBeInTheDocument();
  });

  it("copies code to clipboard", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    render(<CodeBlock code="import { Button } from 'asriui';" showCopy />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("import { Button } from 'asriui';");

    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
});
