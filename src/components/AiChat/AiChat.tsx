import { forwardRef, useCallback, type FormEvent } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { Icon } from "../Icon";
import type {
  AiChatMessageProps,
  AiChatMessagesProps,
  AiChatPromptProps,
  AiChatProps,
  AiChatQueueItem,
  AiChatQueueProps,
  AiChatSuggestionsProps,
} from "./AiChat.types";
import styles from "./AiChat.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<
  "root" | "messages" | "message" | "suggestions" | "queue" | "prompt" | "textarea" | "send"
>();

const AiChatRoot = forwardRef<HTMLDivElement, AiChatProps>(function AiChat(
  { label = "AI chat", className, classNames, children, ...rest },
  ref,
) {
  return (
    <SlotClassNamesProvider classNames={classNames}>
      <div
        ref={ref}
        className={cn(styles.root, classNames?.root, className)}
        role="region"
        aria-label={label}
        {...rest}
      >
        {children}
      </div>
    </SlotClassNamesProvider>
  );
});
AiChatRoot.displayName = "AiChat";

const AiChatMessages = forwardRef<HTMLDivElement, AiChatMessagesProps>(function AiChatMessages(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(styles.messages, useSlotClassName("messages"), className)}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      {...rest}
    >
      {children}
    </div>
  );
});
AiChatMessages.displayName = "AiChat.Messages";

const AiChatMessage = forwardRef<HTMLDivElement, AiChatMessageProps>(function AiChatMessage(
  { messageRole, meta, className, children, ...rest },
  ref,
) {
  const roleClass =
    messageRole === "user" ? styles.user : messageRole === "assistant" ? styles.assistant : styles.system;

  return (
    <div
      ref={ref}
      className={cn(styles.message, roleClass, useSlotClassName("message"), className)}
      role={messageRole === "system" ? "note" : "article"}
      aria-label={
        messageRole === "user"
          ? "Your message"
          : messageRole === "assistant"
            ? "Assistant message"
            : "System message"
      }
      {...rest}
    >
      <div>{children}</div>
      {meta ? <span className={styles.meta}>{meta}</span> : null}
    </div>
  );
});
AiChatMessage.displayName = "AiChat.Message";

const AiChatSuggestions = forwardRef<HTMLDivElement, AiChatSuggestionsProps>(function AiChatSuggestions(
  { suggestions, onSelect, label = "Suggested prompts", className, ...rest },
  ref,
) {
  const suggestionsClassName = useSlotClassName("suggestions");
  if (!suggestions.length) return null;

  return (
    <div ref={ref} className={cn(styles.suggestions, suggestionsClassName, className)} role="group" aria-label={label} {...rest}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          className={styles.suggestion}
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
});
AiChatSuggestions.displayName = "AiChat.Suggestions";

const QUEUE_STATUS_LABEL: Record<AiChatQueueItem["status"], string> = {
  queued: "Waiting",
  running: "Running",
  done: "Done",
  failed: "Failed",
};

const QUEUE_ITEM_CLASS = {
  queued: styles.queueQueued ?? "",
  running: styles.queueRunning ?? "",
  done: styles.queueDone ?? "",
  failed: styles.queueFailed ?? "",
} satisfies Record<AiChatQueueItem["status"], string>;

const STATUS_CLASS = {
  queued: styles.statusQueued ?? "",
  running: styles.statusRunning ?? "",
  done: styles.statusDone ?? "",
  failed: styles.statusFailed ?? "",
} satisfies Record<AiChatQueueItem["status"], string>;

const AiChatQueue = forwardRef<HTMLDivElement, AiChatQueueProps>(function AiChatQueue(
  {
    items,
    onRemove,
    onRetry,
    label = "Task queue",
    emptyLabel = "No tasks in queue",
    showDone = true,
    showFailed = true,
    className,
    ...rest
  },
  ref,
) {
  const visible = items.filter((item) => {
    if (item.status === "done") return showDone;
    if (item.status === "failed") return showFailed;
    return true;
  });

  return (
    <div ref={ref} className={cn(styles.queue, useSlotClassName("queue"), className)} aria-label={label} {...rest}>
      <div className={styles.queueHeader}>
        <span className={styles.queueTitle}>{label}</span>
        <span className={styles.queueCount}>
          {visible.length ? `${visible.length} task${visible.length === 1 ? "" : "s"}` : emptyLabel}
        </span>
      </div>
      {visible.length ? (
        <ul className={styles.queueList}>
          {visible.map((item) => (
            <li
              key={item.id}
              className={cn(styles.queueItem, QUEUE_ITEM_CLASS[item.status])}
            >
              <div className={styles.queueBody}>
                <span className={cn(styles.queueStatus, STATUS_CLASS[item.status])}>
                  {QUEUE_STATUS_LABEL[item.status]}
                </span>
                <p className={styles.queueText}>{item.text}</p>
              </div>
              <div className={styles.queueActions}>
                {item.status === "failed" && onRetry ? (
                  <button type="button" className={styles.queueAction} onClick={() => onRetry(item.id)}>
                    Retry
                  </button>
                ) : null}
                {item.status === "queued" && onRemove ? (
                  <button
                    type="button"
                    className={styles.queueAction}
                    aria-label={`Remove queued task: ${item.text}`}
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.queueEmpty}>{emptyLabel}</p>
      )}
    </div>
  );
});
AiChatQueue.displayName = "AiChat.Queue";

const AiChatPrompt = forwardRef<HTMLFormElement, AiChatPromptProps>(function AiChatPrompt(
  {
    value,
    onValueChange,
    onSubmit,
    onQueue,
    busy = false,
    placeholder = "Ask anything…",
    busyPlaceholder = "Queue a follow-up while the assistant works…",
    disabled = false,
    inputLabel = "Message",
    sendLabel = "Send message",
    queueSendLabel = "Queue message",
    textareaProps,
    className,
    ...rest
  },
  ref,
) {
  const shouldQueue = busy && Boolean(onQueue);
  const { className: textareaClassName, ...textareaRest } = textareaProps ?? {};

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      if (shouldQueue) {
        onQueue?.(trimmed);
      } else {
        onSubmit(trimmed);
      }
    },
    [disabled, onQueue, onSubmit, shouldQueue, value],
  );

  const activePlaceholder = shouldQueue ? busyPlaceholder : placeholder;
  const activeSendLabel = shouldQueue ? queueSendLabel : sendLabel;

  return (
    <form ref={ref} className={cn(styles.prompt, useSlotClassName("prompt"), className)} onSubmit={handleSubmit} {...rest}>
      {shouldQueue ? (
        <p className={styles.queueHint} role="status">
          Assistant is working — new messages join the queue and run when the current task finishes.
        </p>
      ) : null}
      <div className={styles.promptRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="ai-chat-prompt">
            {inputLabel}
          </label>
          <textarea
            id="ai-chat-prompt"
            className={cn(styles.textarea, useSlotClassName("textarea"), textareaClassName)}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={activePlaceholder}
            disabled={disabled}
            rows={1}
            aria-label={inputLabel}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            {...textareaRest}
          />
        </div>
        <button
          type="submit"
          className={cn(styles.send, useSlotClassName("send"))}
          disabled={disabled || !value.trim()}
          aria-label={activeSendLabel}
        >
          <Icon name="send" size="sm" />
        </button>
      </div>
    </form>
  );
});
AiChatPrompt.displayName = "AiChat.Prompt";

/** Accessible AI chat shell with messages, suggestions, queue, and prompt input. */
export const AiChat = Object.assign(AiChatRoot, {
  Messages: AiChatMessages,
  Message: AiChatMessage,
  Suggestions: AiChatSuggestions,
  Queue: AiChatQueue,
  Prompt: AiChatPrompt,
});
