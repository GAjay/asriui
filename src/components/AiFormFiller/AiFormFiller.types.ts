import type { HTMLAttributes } from "react";
import type { FormFieldConfig, FormValues } from "../Form/Form.types";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type AiFormFillerClassNames = SlotClassNames<"root" | "prompt" | "preview">;

export interface AiFormFillerProps extends HTMLAttributes<HTMLDivElement> {
  /** Natural-language instruction from the user. */
  prompt: string;
  onPromptChange?: (value: string) => void;
  /** Target form field definitions. */
  fields: FormFieldConfig[];
  /** Filled values (controlled). */
  values?: FormValues;
  onValuesChange?: (values: FormValues) => void;
  /** Called when the user requests a fill. Parent can call a model and set values. */
  onFill?: (prompt: string, fields: FormFieldConfig[]) => void | Promise<void>;
  loading?: boolean;
  demo?: boolean;
  promptLabel?: string;
  promptPlaceholder?: string;
  actionLabel?: string;
  previewLabel?: string;
  classNames?: AiFormFillerClassNames;
}
