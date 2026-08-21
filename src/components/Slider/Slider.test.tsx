import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("moves to the next slide", async () => {
    const user = userEvent.setup();

    render(
      <Slider loop={false}>
        <Slider.Track>
          <Slider.Slide>One</Slider.Slide>
          <Slider.Slide>Two</Slider.Slide>
        </Slider.Track>
        <Slider.Controls>
          <Slider.Prev />
          <Slider.Next />
        </Slider.Controls>
        <Slider.Dots />
      </Slider>,
    );

    expect(screen.getByLabelText("Slide 1")).not.toHaveAttribute("aria-hidden");
    expect(screen.getByLabelText("Slide 2")).toHaveAttribute("aria-hidden", "true");

    await user.click(screen.getByRole("button", { name: "Next slide" }));

    expect(screen.getByLabelText("Slide 2")).not.toHaveAttribute("aria-hidden");
    expect(screen.getByLabelText("Slide 1")).toHaveAttribute("aria-hidden", "true");
  });

  it("jumps with dots", async () => {
    const user = userEvent.setup();

    render(
      <Slider>
        <Slider.Track>
          <Slider.Slide>Alpha</Slider.Slide>
          <Slider.Slide>Beta</Slider.Slide>
        </Slider.Track>
        <Slider.Dots />
      </Slider>,
    );

    await user.click(screen.getByRole("button", { name: "Go to slide 2" }));
    expect(screen.getByLabelText("Slide 2")).not.toHaveAttribute("aria-hidden");
  });

  it("advances when the track is dragged left", () => {
    render(
      <Slider loop={false}>
        <Slider.Track>
          <Slider.Slide>One</Slider.Slide>
          <Slider.Slide>Two</Slider.Slide>
        </Slider.Track>
      </Slider>,
    );

    const track = document.querySelector("[data-slider-track]") as HTMLElement;
    fireEvent.pointerDown(track, { clientX: 220, button: 0, pointerId: 1 });
    fireEvent.pointerMove(track, { clientX: 40, pointerId: 1 });
    fireEvent.pointerUp(track, { clientX: 40, pointerId: 1 });

    expect(screen.getByLabelText("Slide 2")).not.toHaveAttribute("aria-hidden");
  });
});
