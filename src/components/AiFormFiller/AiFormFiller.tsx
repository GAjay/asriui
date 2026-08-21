import { useCallback, useState } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { demoFillForm } from "../AiTools/demoNlp";
import { Button } from "../Button";
import { Loader } from "../Loader";
import type { FormFieldValue } from "../Form/Form.types";
import type { AiFormFillerProps } from "./AiFormFiller.types";
import shared from "../AiTools/AiTools.module.css";
import styles from "./AiFormFiller.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<"root" | "prompt" | "preview">();

export function AiFormFiller({
  prompt,
  onPromptChange,
  fields,
  values: valuesProp,
  onValuesChange,
  onFill,
  loading: loadingProp,
  demo = true,
  promptLabel = "Describe what to fill",
  promptPlaceholder = "e.g. Name is Ada Lovelace, email ada@example.com, enable notifications",
  actionLabel = "Fill form",
  previewLabel = "Structured preview",
  className,
  classNames,
  ...rest
}: AiFormFillerProps) {
  const [internalValues, setInternalValues] = useState(valuesProp ?? {});
  const [internalLoading, setInternalLoading] = useState(false);
  const values = valuesProp ?? internalValues;
  const loading = loadingProp ?? internalLoading;

  const setValues = useCallback(
    (next: typeof values) => {
      if (valuesProp === undefined) setInternalValues(next);
      onValuesChange?.(next);
    },
    [onValuesChange, valuesProp],
  );

  const run = useCallback(async () => {
    if (!prompt.trim() || !fields.length) return;
    setInternalLoading(true);
    try {
      if (onFill) {
        await onFill(prompt, fields);
      } else if (demo) {
        setValues(demoFillForm(prompt, fields));
      }
    } finally {
      setInternalLoading(false);
    }
  }, [demo, fields, onFill, prompt, setValues]);

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <div
        className={cn(shared.panel, styles.root, useSlotClassName("root"), className)}
        role="region"
        aria-label="AI form filler"
        {...rest}
      >
        <label className={shared.title} htmlFor="ai-form-filler-prompt">{promptLabel}</label>
        <textarea
          id="ai-form-filler-prompt"
          className={cn(shared.promptInput, shared.textarea, useSlotClassName("prompt"))}
          value={prompt}
          onChange={(event) => onPromptChange?.(event.target.value)}
          placeholder={promptPlaceholder}
        />
        <div className={shared.promptRow}>
          <Button onClick={() => void run()} disabled={loading || !prompt.trim()} loading={loading}>
            {actionLabel}
          </Button>
          {loading ? <Loader size="sm" label="Filling form" /> : null}
        </div>
        <div className={useSlotClassName("preview")}>
          <span className={shared.title}>{previewLabel}</span>
          <dl className={styles.previewList}>
            {fields.map((field) => (
              <div key={field.name} className={styles.previewRow}>
                <dt>{field.label}</dt>
                <dd>{formatPreviewValue(values[field.name])}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SlotClassNamesProvider>
  );
}

function formatPreviewValue(value: FormFieldValue | undefined) {
  if (value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return `${value.length} file(s)`;
  return String(value);
}
