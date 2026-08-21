import { afterEach, describe, expect, it, vi } from "vitest";
import {
  captureDebugError,
  clearDebugLogs,
  getDebugLogs,
  resolveDebugConfig,
  setDebugRuntime,
} from "./debug";

vi.mock("../components/Toast/toast", () => ({
  toast: Object.assign(vi.fn(() => "toast-id"), {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    dismiss: vi.fn(),
  }),
}));

describe("debug", () => {
  afterEach(() => {
    setDebugRuntime(resolveDebugConfig(false));
    clearDebugLogs();
    vi.clearAllMocks();
  });

  it("resolves boolean debug shorthand", () => {
    expect(resolveDebugConfig(true).enabled).toBe(true);
    expect(resolveDebugConfig(false).enabled).toBe(false);
  });

  it("stores and notifies when enabled", async () => {
    const { toast } = await import("../components/Toast/toast");
    setDebugRuntime(resolveDebugConfig({ enabled: true }));

    captureDebugError(new Error("Boom"), { source: "manual" });

    expect(getDebugLogs()).toHaveLength(1);
    expect(getDebugLogs()[0]?.message).toBe("Boom");
    expect(toast.error).toHaveBeenCalled();
  });

  it("skips capture when disabled", async () => {
    const { toast } = await import("../components/Toast/toast");
    setDebugRuntime(resolveDebugConfig(false));

    const entry = captureDebugError(new Error("Hidden"));

    expect(entry).toBeNull();
    expect(getDebugLogs()).toHaveLength(0);
    expect(toast.error).not.toHaveBeenCalled();
  });
});
