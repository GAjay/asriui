import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mountWidget } from "./mountWidget";
import { Widget } from "./Widget";

describe("Widget", () => {
  it("renders an iframe embed with srcDoc html", async () => {
    render(
      <Widget
        html="<p>Partner promo</p>"
        title="Promo widget"
        height={120}
        onLoad={() => undefined}
      />,
    );

    const frame = screen.getByTitle("Promo widget");
    expect(frame).toBeInTheDocument();
    expect(frame).toHaveAttribute("sandbox");
    expect(frame).toHaveAttribute("srcdoc", "<p>Partner promo</p>");
  });

  it("loads an external script into an isolated mount point", async () => {
    const onLoad = vi.fn();
    const appendChildSpy = vi.spyOn(HTMLElement.prototype, "appendChild");

    render(
      <Widget
        mode="script"
        scriptSrc="https://cdn.example.com/widget.js"
        slotId="ad-slot-1"
        attrs={{ "data-ad-client": "ca-pub-demo" }}
        height={90}
        onLoad={onLoad}
      />,
    );

    const mount = document.querySelector("[data-widget-slot='ad-slot-1']");
    expect(mount).toBeInTheDocument();
    expect(mount).toHaveAttribute("id", "ad-slot-1");
    expect(mount).toHaveAttribute("data-ad-client", "ca-pub-demo");

    const appendedScript = appendChildSpy.mock.calls
      .map(([node]) => node)
      .find((node) => node instanceof HTMLScriptElement) as HTMLScriptElement | undefined;

    expect(appendedScript?.src).toBe("https://cdn.example.com/widget.js");
    appendedScript?.dispatchEvent(new Event("load"));

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    appendChildSpy.mockRestore();
  });

  it("mounts a widget without React", () => {
    const host = document.createElement("div");
    host.id = "widget-host";
    document.body.appendChild(host);

    const cleanup = mountWidget("widget-host", {
      html: "<strong>Static embed</strong>",
      height: 100,
    });

    const frame = host.querySelector("iframe");
    expect(frame).toBeTruthy();
    expect(frame?.getAttribute("srcdoc")).toContain("Static embed");

    cleanup();
    host.remove();
  });

  it("preserves display name", () => {
    expect(Widget.displayName).toBe("Widget");
  });
});
