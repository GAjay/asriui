import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button";
import { ToastProvider, ToastShowcase, toast, useToast } from "./index";

function ToastDemo() {
  const { toast: hookToast } = useToast();

  return (
    <div>
      <Button onClick={() => hookToast({ title: "Hook toast", description: "From useToast" })}>
        Hook
      </Button>
      <Button onClick={() => toast.success("Global toast", { description: "From toast()" })}>
        Global
      </Button>
    </div>
  );
}

describe("Toast", () => {
  it("renders toast from useToast", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Hook" }));
    expect(await screen.findByText("Hook toast")).toBeInTheDocument();
    expect(screen.getByText("From useToast")).toBeInTheDocument();
  });

  it("renders toast from global helper", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Global" }));
    expect(await screen.findByText("Global toast")).toBeInTheDocument();
  });

  it("dismisses on close button click", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider duration={0}>
        <ToastDemo />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Hook" }));
    expect(await screen.findByText("Hook toast")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    await waitFor(() => expect(screen.queryByText("Hook toast")).not.toBeInTheDocument());
  });

  it("renders action button and dismisses on click by default", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <ToastProvider duration={0}>
        <Button
          onClick={() =>
            toast.error("Failed to sync", {
              description: "Check your connection.",
              action: { label: "Get support", onClick: onAction },
            })
          }
        >
          Show error
        </Button>
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show error" }));
    expect(await screen.findByText("Failed to sync")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Get support" }));
    expect(onAction).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByText("Failed to sync")).not.toBeInTheDocument());
  });

  it("hides progress bar when showProgress is false on provider", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider showProgress={false}>
        <Button onClick={() => toast.info("No bar")}>Show</Button>
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    const toastEl = (await screen.findByText("No bar")).closest("[class*='toast']");
    expect(toastEl?.querySelector("[class*='progress']")).toBeNull();
  });

  it("applies custom variant colors from provider config", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider
        duration={0}
        variants={{
          success: { accent: "rgb(255, 0, 0)", background: "rgb(0, 255, 0)" },
        }}
      >
        <Button onClick={() => toast.success("Custom colors")}>Show</Button>
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    const toastEl = (await screen.findByText("Custom colors")).closest("[class*='toast']") as HTMLElement;
    expect(toastEl?.style.getPropertyValue("--toast-accent")).toBe("rgb(255, 0, 0)");
    expect(toastEl?.style.getPropertyValue("--toast-surface")).toBe("rgb(0, 255, 0)");
  });

  it("renders ToastShowcase from configuration", async () => {
    const user = userEvent.setup();
    render(
      <ToastShowcase
        items={[
          { label: "Ping", toast: { title: "Hello from config", variant: "info" } },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Ping" }));
    expect(await screen.findByText("Hello from config")).toBeInTheDocument();
  });
});
