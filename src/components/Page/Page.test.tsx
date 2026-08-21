import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Page } from "./Page";
import { EXAMPLE_CONTACT_PAGE, EXAMPLE_DASHBOARD_PAGE } from "./examples";

describe("Page", () => {
  it("renders header and form from JSON config", () => {
    render(<Page config={EXAMPLE_CONTACT_PAGE} />);
    expect(screen.getByRole("heading", { name: "Contact us" })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });

  it("submits form blocks through onFormSubmit", async () => {
    const user = userEvent.setup();
    const onFormSubmit = vi.fn();

    render(<Page config={EXAMPLE_CONTACT_PAGE} onFormSubmit={onFormSubmit} />);

    await user.type(screen.getByLabelText(/Full name/), "Alex");
    await user.type(screen.getByLabelText(/Work email/), "alex@acme.dev");
    await user.selectOptions(screen.getByLabelText(/Topic/), "support");
    await user.type(screen.getByLabelText(/Message/), "Need help with DataGrid export please.");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(onFormSubmit).toHaveBeenCalledWith(
      "contact-form",
      expect.objectContaining({
        name: "Alex",
        email: "alex@acme.dev",
        topic: "support",
      }),
    );
  });

  it("renders sidebar dashboard blocks and fires actions", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(<Page config={EXAMPLE_DASHBOARD_PAGE} onAction={onAction} />);

    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText("$48.2k")).toBeInTheDocument();
    expect(screen.getByText("Northwind Labs")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Export" }));
    expect(onAction).toHaveBeenCalledWith({ type: "action", id: "export", href: undefined });
  });

  it("renders custom slots", () => {
    render(
      <Page
        config={{
          layout: { variant: "centered" },
          blocks: [{ id: "chart", type: "custom" }],
        }}
        slots={{ chart: <div>Live chart</div> }}
      />,
    );
    expect(screen.getByText("Live chart")).toBeInTheDocument();
  });
});
