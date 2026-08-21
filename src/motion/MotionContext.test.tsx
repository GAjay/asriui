import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider, useMotionPresets } from "./MotionContext";
import { getMotionPreset, MOTION_PRESET_NAMES } from "./presetPacks";

function Probe() {
  const { preset, pack } = useMotionPresets();
  return (
    <span>
      {preset}:{pack.label}
    </span>
  );
}

describe("motion preset packs", () => {
  it("exposes all named animation scripts", () => {
    expect(MOTION_PRESET_NAMES).toEqual(["apple", "snappy", "soft", "playful", "minimal"]);
    expect(getMotionPreset("playful").hover.scale).toBeGreaterThan(1);
    expect(getMotionPreset("minimal").spring).toMatchObject({ type: "tween" });
  });
});

describe("MotionProvider", () => {
  it("provides the selected preset to consumers", () => {
    render(
      <MotionProvider preset="snappy">
        <Probe />
      </MotionProvider>,
    );

    expect(screen.getByText("snappy:Snappy")).toBeInTheDocument();
  });
});
