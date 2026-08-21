import { describe, expect, it, vi, afterEach } from "vitest";
import { computeMenuPosition } from "./menuPosition";

function mockEl(rect: {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}) {
  return {
    offsetWidth: rect.width,
    offsetHeight: rect.height,
    getBoundingClientRect: () => ({
      ...rect,
      x: rect.left,
      y: rect.top,
      toJSON: () => ({}),
    }),
  } as HTMLElement;
}

describe("computeMenuPosition", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("anchors bottom-end with left so the panel's right edge meets the trigger", () => {
    vi.stubGlobal("innerWidth", 1280);
    vi.stubGlobal("innerHeight", 800);

    const trigger = mockEl({ top: 10, left: 1000, right: 1080, bottom: 50, width: 80, height: 40 });
    const content = mockEl({ top: 0, left: 0, right: 240, bottom: 200, width: 240, height: 200 });

    const position = computeMenuPosition(trigger, content, "bottom-end");
    expect(position.top).toBe(56);
    expect(position.left).toBe(1080 - 240);
  });

  it("anchors bottom-start with left", () => {
    vi.stubGlobal("innerWidth", 1280);
    vi.stubGlobal("innerHeight", 800);

    const trigger = mockEl({ top: 10, left: 100, right: 180, bottom: 50, width: 80, height: 40 });
    const content = mockEl({ top: 0, left: 0, right: 200, bottom: 120, width: 200, height: 120 });

    const position = computeMenuPosition(trigger, content, "bottom-start");
    expect(position.top).toBe(56);
    expect(position.left).toBe(100);
  });

  it("flips wide bottom-end panels to start so they stay under the trigger", () => {
    vi.stubGlobal("innerWidth", 1280);
    vi.stubGlobal("innerHeight", 800);

    // Mid-header trigger + mega-menu width (landing Menu case).
    const trigger = mockEl({ top: 12, left: 530, right: 620, bottom: 48, width: 90, height: 36 });
    const content = mockEl({ top: 0, left: 0, right: 672, bottom: 400, width: 672, height: 400 });

    const position = computeMenuPosition(trigger, content, "bottom-end");
    expect(position.top).toBe(54);
    // Prefer start alignment under the trigger instead of pinning to the viewport left.
    expect(position.left).toBe(530);
  });
});
