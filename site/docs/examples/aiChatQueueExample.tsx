import { useCallback, useState } from "react";
import { AiChat, useAiChatQueue } from "../../../src/components/AiChat";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

function delay(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export const AI_CHAT_QUEUE_CODE = `import { useState } from "react";
import { AiChat, useAiChatQueue } from "axiom-ui/ai-chat";

export function AssistantWithQueue() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const { items, isProcessing, enqueue, remove, retry } = useAiChatQueue({
    onProcess: async (task) => {
      setMessages((prev) => [...prev, { role: "user", text: task.text }]);
      const reply = await callModel(task.text);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    },
    onTaskComplete: () => {
      // Next queued task starts automatically
    },
  });

  function handleSubmit(value: string) {
    enqueue(value);
    setPrompt("");
  }

  return (
    <AiChat>
      <AiChat.Messages>{/* render messages */}</AiChat.Messages>
      <AiChat.Queue items={items} onRemove={remove} onRetry={retry} />
      <AiChat.Prompt
        value={prompt}
        onValueChange={setPrompt}
        onSubmit={handleSubmit}
        onQueue={handleSubmit}
        busy={isProcessing}
      />
    </AiChat>
  );
}`;

export function AiChatQueueExample() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Ask me anything — send multiple prompts while I work." },
  ]);

  const { items, isProcessing, enqueue, remove, retry } = useAiChatQueue({
    onProcess: async (task) => {
      setMessages((prev) => [...prev, { role: "user", text: task.text }]);
      await delay(1400);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Finished "${task.text}". The next queued task starts on its own.`,
        },
      ]);
    },
  });

  const handleSubmit = useCallback(
    (value: string) => {
      enqueue(value);
      setPrompt("");
    },
    [enqueue],
  );

  return (
    <div style={{ maxWidth: 420, width: "100%" }}>
      <AiChat label="Assistant with queue">
        <AiChat.Messages>
          {messages.map((message, index) => (
            <AiChat.Message key={`${index}-${message.text}`} messageRole={message.role}>
              {message.text}
            </AiChat.Message>
          ))}
        </AiChat.Messages>
        <AiChat.Queue items={items} onRemove={remove} onRetry={retry} label="Message queue" />
        <AiChat.Suggestions
          suggestions={["Summarize docs", "Generate form schema"]}
          onSelect={setPrompt}
        />
        <AiChat.Prompt
          value={prompt}
          onValueChange={setPrompt}
          onSubmit={handleSubmit}
          onQueue={handleSubmit}
          busy={isProcessing}
        />
      </AiChat>
    </div>
  );
}
