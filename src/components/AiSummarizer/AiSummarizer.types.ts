import type { HTMLAttributes } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type AiSummarizerFormat = "bullets" | "paragraph";

export type AiSummarizerClassNames = SlotClassNames<"root" | "source" | "output" | "actions">;

export interface AiSummarizerProps extends HTMLAttributes<HTMLDivElement> {
  /** Source text to summarize. */
  source: string;
  onSourceChange?: (value: string) => void;
  /** Summarized output (controlled). */
  summary?: string;
  /** Called when the user requests a summary. Return text or set summary via parent state. */
  onSummarize?: (source: string, format: AiSummarizerFormat) => void | Promise<void>;
  /** Output format. @default "bullets" */
  format?: AiSummarizerFormat;
  onFormatChange?: (format: AiSummarizerFormat) => void;
  loading?: boolean;
  /** Use built-in demo summarizer when `onSummarize` is omitted. @default true */
  demo?: boolean;
  sourceLabel?: string;
  summaryLabel?: string;
  actionLabel?: string;
  sourcePlaceholder?: string;
  classNames?: AiSummarizerClassNames;
}
