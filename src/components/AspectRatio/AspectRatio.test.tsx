import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("applies padding ratio", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Media</div>
      </AspectRatio>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.paddingTop).toBe("56.25%");
  });
});
