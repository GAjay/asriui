import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AsriUIProvider } from "../../config/AsriUIProvider";
import { Link } from "./Link";

describe("Link", () => {
  it("renders anchor with href", () => {
    render(<Link href="/docs">Documentation</Link>);
    const link = screen.getByRole("link", { name: "Documentation" });
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("marks external blank targets with rel and new-tab hint", () => {
    render(
      <Link href="https://example.com" target="_blank">
        External docs
      </Link>,
    );
    const link = screen.getByRole("link", { name: /External docs \(opens in new tab\)/ });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("pushes GTM event when analytics enabled", async () => {
    const user = userEvent.setup();
    const layer: unknown[] = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = layer;

    render(
      <AsriUIProvider config={{ analytics: { enabled: true, gtmId: "GTM-TEST" } }}>
        <Link href="/pricing" trackLabel="Pricing page">
          Pricing
        </Link>
      </AsriUIProvider>,
    );

    await user.click(screen.getByRole("link", { name: "Pricing" }));
    expect(layer.some((entry) => (entry as { event?: string }).event === "asriui_link_click")).toBe(
      true,
    );
  });

  it("supports custom trackEvent", async () => {
    const user = userEvent.setup();
    const layer: unknown[] = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = layer;

    render(
      <AsriUIProvider config={{ analytics: { enabled: true } }}>
        <Link href="/docs" trackEvent="cta_docs_click">
          Docs
        </Link>
      </AsriUIProvider>,
    );

    await user.click(screen.getByRole("link", { name: "Docs" }));
    expect(layer.some((entry) => (entry as { event?: string }).event === "cta_docs_click")).toBe(
      true,
    );
  });

  it("skips tracking when track is false", async () => {
    const user = userEvent.setup();
    const layer: unknown[] = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = layer;

    render(
      <AsriUIProvider config={{ analytics: { enabled: true } }}>
        <Link href="/private" track={false}>
          Private
        </Link>
      </AsriUIProvider>,
    );

    await user.click(screen.getByRole("link", { name: "Private" }));
    expect(layer.length).toBe(0);
  });
});
