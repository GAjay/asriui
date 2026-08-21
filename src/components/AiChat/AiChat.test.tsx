import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AiChat } from "./AiChat";
import { useAiChatQueue } from "./useAiChatQueue";

describe("AiChat", () => {
  it("submits prompt on send", () => {
    const onSubmit = vi.fn();
    render(
      <AiChat>
        <AiChat.Prompt value="Hello" onValueChange={() => {}} onSubmit={onSubmit} />
      </AiChat>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(onSubmit).toHaveBeenCalledWith("Hello");
  });

  it("queues prompt when busy", () => {
    const onSubmit = vi.fn();
    const onQueue = vi.fn();
    render(
      <AiChat>
        <AiChat.Prompt
          value="Follow up"
          onValueChange={() => {}}
          onSubmit={onSubmit}
          onQueue={onQueue}
          busy
        />
      </AiChat>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Queue message" }));
    expect(onQueue).toHaveBeenCalledWith("Follow up");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders messages with roles", () => {
    render(
      <AiChat>
        <AiChat.Messages>
          <AiChat.Message messageRole="assistant">Hi there</AiChat.Message>
        </AiChat.Messages>
      </AiChat>,
    );
    expect(screen.getByRole("article", { name: "Assistant message" })).toHaveTextContent("Hi there");
  });

  it("renders queue items with status", () => {
    render(
      <AiChat>
        <AiChat.Queue
          items={[
            { id: "1", text: "First task", createdAt: 0, status: "queued" },
            { id: "2", text: "Active task", createdAt: 1, status: "running" },
          ]}
          onRemove={() => undefined}
        />
      </AiChat>,
    );
    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.getByText("Running")).toBeInTheDocument();
  });
});

function QueueHarness({
  onProcess,
  onTaskComplete,
}: {
  onProcess: (item: { id: string; text: string }) => Promise<void>;
  onTaskComplete?: (item: { text: string }) => void;
}) {
  const queue = useAiChatQueue({ onProcess, onTaskComplete });

  return (
    <div>
      <button type="button" onClick={() => queue.enqueue("one")}>
        Add one
      </button>
      <button type="button" onClick={() => queue.enqueue("two")}>
        Add two
      </button>
      <AiChat.Queue items={queue.items} />
      <span data-testid="processing">{queue.isProcessing ? "yes" : "no"}</span>
      <span data-testid="current">{queue.current?.text ?? "none"}</span>
    </div>
  );
}

describe("useAiChatQueue", () => {
  it("processes tasks sequentially and starts the next when one completes", async () => {
    const order: string[] = [];
    const resolvers: Array<() => void> = [];

    render(
      <QueueHarness
        onProcess={(item) =>
          new Promise<void>((resolve) => {
            order.push(`start:${item.text}`);
            resolvers.push(resolve);
          })
        }
        onTaskComplete={(item) => {
          order.push(`done:${item.text}`);
        }}
      />,
    );

    fireEvent.click(screen.getByText("Add one"));
    fireEvent.click(screen.getByText("Add two"));

    await waitFor(() => expect(screen.getByTestId("current")).toHaveTextContent("one"));
    expect(order).toEqual(["start:one"]);

    await act(async () => {
      resolvers[0]?.();
    });

    await waitFor(() => expect(screen.getByTestId("current")).toHaveTextContent("two"));
    expect(order).toEqual(["start:one", "done:one", "start:two"]);

    await act(async () => {
      resolvers[1]?.();
    });

    await waitFor(() => expect(screen.getByTestId("processing")).toHaveTextContent("no"));
    expect(order).toEqual(["start:one", "done:one", "start:two", "done:two"]);
  });
});
