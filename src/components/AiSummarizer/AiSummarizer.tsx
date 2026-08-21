import { useCallback, useState } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { demoSummarizeText } from "../AiTools/demoNlp";
import { Button } from "../Button";
import { Loader } from "../Loader";
import type { AiSummarizerFormat, AiSummarizerProps } from "./AiSummarizer.types";
import shared from "../AiTools/AiTools.module.css";
import styles from "./AiSummarizer.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<"root" | "source" | "output" | "actions">();

export function AiSummarizer({
  source,
  onSourceChange,
  summary: summaryProp,
  onSummarize,
  format = "bullets",
  onFormatChange,
  loading: loadingProp,
  demo = true,
  sourceLabel = "Source text",
  summaryLabel = "Summary",
  actionLabel = "Summarize",
  sourcePlaceholder = "Paste an article, ticket thread, or document…",
  className,
  classNames,
  ...rest
}: AiSummarizerProps) {
  const [internalSummary, setInternalSummary] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalFormat, setInternalFormat] = useState(format);
  const activeFormat = onFormatChange ? format : internalFormat;
  const summary = summaryProp ?? internalSummary;
  const loading = loadingProp ?? internalLoading;
  const slotRoot = useSlotClassName("root");
  const slotOutput = useSlotClassName("output");

  const run = useCallback(async () => {
    if (!source.trim()) return;
    setInternalLoading(true);
    try {
      if (onSummarize) {
        await onSummarize(source, activeFormat);
      } else if (demo) {
        setInternalSummary(demoSummarizeText(source, activeFormat));
      }
    } finally {
      setInternalLoading(false);
    }
  }, [activeFormat, demo, onSummarize, source]);

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <div
        className={cn(shared.panel, styles.root, slotRoot, className)}
        role="region"
        aria-label="AI summarizer"
        {...rest}
      >
        <div className={shared.header}>
          <span className={shared.title}>{sourceLabel}</span>
          <div className={styles.formatRow}>
            {(["bullets", "paragraph"] as AiSummarizerFormat[]).map((item) => (
              <button
                key={item}
                type="button"
                className={cn(styles.formatChip, activeFormat === item && styles.formatChipActive)}
                onClick={() => {
                  if (onFormatChange) onFormatChange(item);
                  else setInternalFormat(item);
                }}
                aria-pressed={activeFormat === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className={cn(shared.promptInput, shared.textarea, useSlotClassName("source"))}
          value={source}
          onChange={(event) => onSourceChange?.(event.target.value)}
          placeholder={sourcePlaceholder}
          aria-label={sourceLabel}
        />
        <div className={cn(shared.promptRow, useSlotClassName("actions"))}>
          <Button onClick={() => void run()} disabled={loading || !source.trim()} loading={loading}>
            {actionLabel}
          </Button>
          {loading ? <Loader size="sm" label="Summarizing" /> : null}
        </div>
        <div>
          <span className={shared.title}>{summaryLabel}</span>
          {summary ? (
            <div className={cn(shared.output, slotOutput)}>{summary}</div>
          ) : (
            <p className={shared.empty}>Run summarize to see a condensed version.</p>
          )}
        </div>
      </div>
    </SlotClassNamesProvider>
  );
}
