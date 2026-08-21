import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  it("renders and associates with input", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(<Label required>Password</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Name</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
