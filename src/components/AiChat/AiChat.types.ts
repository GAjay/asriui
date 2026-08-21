import type { HTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type AiMessageRole = "user" | "assistant" | "system";

export type AiChatClassNames = SlotClassNames<
  "root" | "messages" | "message" | "suggestions" | "queue" | "prompt" | "textarea" | "send"
>;

export type AiChatQueueItemStatus = "queued" | "running" | "done" | "failed";

export interface AiChatQueueItem {
  id: string;
  text: string;
  createdAt: number;
  status: AiChatQueueItemStatus;
}

export interface UseAiChatQueueOptions {
  /** Called for each task when it becomes active. Resolve when the task is finished. */
  onProcess: (item: AiChatQueueItem) => Promise<void> | void;
  /** Fires after a task completes — the next queued task starts automatically. */
  onTaskComplete?: (item: AiChatQueueItem) => void;
  onTaskError?: (item: AiChatQueueItem, error: unknown) => void;
  /** How many completed tasks to keep visible in the queue window. @default 3 */
  keepDone?: number;
}

export interface UseAiChatQueueResult {
  items: AiChatQueueItem[];
  queue: AiChatQueueItem[];
  current: AiChatQueueItem | null;
  isProcessing: boolean;
  enqueue: (text: string) => string;
  remove: (id: string) => void;
  clearCompleted: () => void;
  retry: (id: string) => void;
}

export interface AiChatProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the chat panel. @default "AI chat" */
  label?: string;
  /** Override class names for chat slots — merged with each part's `className`. */
  classNames?: AiChatClassNames;
  children?: ReactNode;
}

export interface AiChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface AiChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  messageRole: AiMessageRole;
  children?: ReactNode;
  /** Optional timestamp or status text. */
  meta?: string;
}

export interface AiChatPromptProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: (value: string) => void;
  /** When the assistant is busy, queue the message instead of submitting immediately. */
  onQueue?: (value: string) => void;
  /** Marks the assistant as busy — pairs with onQueue for queue-when-busy behavior. */
  busy?: boolean;
  placeholder?: string;
  /** Placeholder while busy and onQueue is set. */
  busyPlaceholder?: string;
  disabled?: boolean;
  /** Accessible label for the prompt field. @default "Message" */
  inputLabel?: string;
  /** Accessible label for the send button. @default "Send message" */
  sendLabel?: string;
  /** Accessible label for the send button while queuing. @default "Queue message" */
  queueSendLabel?: string;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export interface AiChatQueueProps extends HTMLAttributes<HTMLDivElement> {
  items: AiChatQueueItem[];
  /** Remove a queued (not running) item. */
  onRemove?: (id: string) => void;
  /** Retry a failed item. */
  onRetry?: (id: string) => void;
  /** Accessible label. @default "Task queue" */
  label?: string;
  /** Shown when there is nothing to display. @default "No tasks in queue" */
  emptyLabel?: string;
  /** Include recently completed tasks in the list. @default true */
  showDone?: boolean;
  /** Include failed tasks. @default true */
  showFailed?: boolean;
}

export interface AiChatSuggestionsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  /** Accessible label. @default "Suggested prompts" */
  label?: string;
}
