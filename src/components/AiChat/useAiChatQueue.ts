import { useCallback, useRef, useState } from "react";
import type { AiChatQueueItem, UseAiChatQueueOptions, UseAiChatQueueResult } from "./AiChat.types";

export type { UseAiChatQueueOptions, UseAiChatQueueResult };

function createId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Queue AI chat tasks and process them one at a time.
 * When a task finishes, the next queued message starts automatically.
 */
export function useAiChatQueue({
  onProcess,
  onTaskComplete,
  onTaskError,
  keepDone = 3,
}: UseAiChatQueueOptions): UseAiChatQueueResult {
  const [items, setItems] = useState<AiChatQueueItem[]>([]);
  const itemsRef = useRef(items);
  const processingRef = useRef(false);
  const onProcessRef = useRef(onProcess);
  const onTaskCompleteRef = useRef(onTaskComplete);
  const onTaskErrorRef = useRef(onTaskError);

  itemsRef.current = items;
  onProcessRef.current = onProcess;
  onTaskCompleteRef.current = onTaskComplete;
  onTaskErrorRef.current = onTaskError;

  const trimDone = useCallback((list: AiChatQueueItem[]) => {
    const doneCount = list.filter((item) => item.status === "done").length;
    if (doneCount <= keepDone) return list;

    let removed = 0;
    return list.filter((item) => {
      if (item.status !== "done") return true;
      removed += 1;
      return doneCount - removed < keepDone;
    });
  }, [keepDone]);

  const pump = useCallback(async () => {
    if (processingRef.current) return;

    const next = itemsRef.current.find((item) => item.status === "queued");
    if (!next) return;

    processingRef.current = true;
    const runningItem: AiChatQueueItem = { ...next, status: "running" };

    setItems((current) => {
      const nextItems = current.map((item) => (item.id === next.id ? runningItem : item));
      itemsRef.current = nextItems;
      return nextItems;
    });

    try {
      await onProcessRef.current(runningItem);
      setItems((current) => {
        const nextItems = trimDone(
          current.map((item) => (item.id === next.id ? { ...item, status: "done" as const } : item)),
        );
        itemsRef.current = nextItems;
        return nextItems;
      });
      onTaskCompleteRef.current?.(runningItem);
    } catch (error) {
      setItems((current) => {
        const nextItems = current.map((item) =>
          item.id === next.id ? { ...item, status: "failed" as const } : item,
        );
        itemsRef.current = nextItems;
        return nextItems;
      });
      onTaskErrorRef.current?.(runningItem, error);
    } finally {
      processingRef.current = false;
      queueMicrotask(() => {
        void pump();
      });
    }
  }, [trimDone]);

  const enqueue = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return "";

      const item: AiChatQueueItem = {
        id: createId(),
        text: trimmed,
        createdAt: Date.now(),
        status: "queued",
      };

      setItems((current) => {
        const nextItems = [...current, item];
        itemsRef.current = nextItems;
        queueMicrotask(() => {
          void pump();
        });
        return nextItems;
      });
      return item.id;
    },
    [pump],
  );

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id || item.status === "running"));
  }, []);

  const clearCompleted = useCallback(() => {
    setItems((current) => current.filter((item) => item.status !== "done" && item.status !== "failed"));
  }, []);

  const retry = useCallback(
    (id: string) => {
      setItems((current) => {
        const nextItems = current.map((item) =>
          item.id === id && item.status === "failed" ? { ...item, status: "queued" as const } : item,
        );
        itemsRef.current = nextItems;
        queueMicrotask(() => {
          void pump();
        });
        return nextItems;
      });
    },
    [pump],
  );

  const queue = items.filter((item) => item.status === "queued");
  const current = items.find((item) => item.status === "running") ?? null;
  const isProcessing = current !== null;

  return {
    items,
    queue,
    current,
    isProcessing,
    enqueue,
    remove,
    clearCompleted,
    retry,
  };
}
