import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ServerQuery } from "./ServerQuery";

describe("ServerQuery", () => {
  it("renders children with fetched data", async () => {
    const query = vi.fn().mockResolvedValue({ name: "AxiomUI" });

    render(
      <ServerQuery<{ name: string }> query={query}>
        {(data) => <p>Hello {data.name}</p>}
      </ServerQuery>,
    );

    expect(await screen.findByText("Hello AxiomUI")).toBeInTheDocument();
    expect(query).toHaveBeenCalledTimes(1);
  });

  it("shows error UI and retries", async () => {
    const user = userEvent.setup();
    const query = vi
      .fn()
      .mockRejectedValueOnce(new Error("Network down"))
      .mockResolvedValueOnce({ name: "Retry" });

    render(
      <ServerQuery<{ name: string }> query={query}>
        {(data) => <p>Loaded {data.name}</p>}
      </ServerQuery>,
    );

    expect(await screen.findByText("Network down")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("Loaded Retry")).toBeInTheDocument();
    expect(query).toHaveBeenCalledTimes(2);
  });

  it("skips fetching when disabled", async () => {
    const query = vi.fn().mockResolvedValue({ ok: true });

    render(
      <ServerQuery query={query} enabled={false}>
        {() => <p>Should not render</p>}
      </ServerQuery>,
    );

    await waitFor(() => {
      expect(query).not.toHaveBeenCalled();
    });
    expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
  });
});
