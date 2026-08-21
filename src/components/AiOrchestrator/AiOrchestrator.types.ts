import type { HTMLAttributes, ReactNode } from "react";
import type { FormFieldConfig, FormValues } from "../Form/Form.types";
import type { AiDataAnalystResult } from "../AiDataAnalyst/AiDataAnalyst.types";
import type { AiSearchItem, AiSearchResult } from "../AiSearch/AiSearch.types";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type AiOrchestratorToolId =
  | "summarizer"
  | "data-analyst"
  | "form-filler"
  | "search"
  | "pipeline";

export type AiOrchestratorPipelineStep = {
  id: string;
  tool: AiOrchestratorToolId;
  label: string;
  status: "idle" | "running" | "done" | "error";
  output?: string;
};

export type AiOrchestratorClassNames = SlotClassNames<"root" | "toolbar" | "panel">;

export interface AiOrchestratorProps extends HTMLAttributes<HTMLDivElement> {
  /** Active tool tab. @default "summarizer" */
  activeTool?: AiOrchestratorToolId;
  onActiveToolChange?: (tool: AiOrchestratorToolId) => void;
  /** Summarizer source text */
  summarySource?: string;
  onSummarySourceChange?: (value: string) => void;
  summary?: string;
  onSummarize?: (source: string) => void | Promise<void>;
  /** Data analyst */
  analystQuery?: string;
  onAnalystQueryChange?: (value: string) => void;
  analystResult?: AiDataAnalystResult | null;
  onAnalyze?: (query: string) => void | Promise<void>;
  /** Form filler */
  formPrompt?: string;
  onFormPromptChange?: (value: string) => void;
  formFields?: FormFieldConfig[];
  formValues?: FormValues;
  onFormValuesChange?: (values: FormValues) => void;
  onFillForm?: (prompt: string, fields: FormFieldConfig[]) => void | Promise<void>;
  /** Search */
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
  searchItems?: AiSearchItem[];
  searchResults?: AiSearchResult[];
  onSearch?: (query: string, items: AiSearchItem[]) => void | Promise<void>;
  /** Pipeline mode runs summarizer → analyst → form filler → search in sequence. */
  pipelineInput?: string;
  onPipelineInputChange?: (value: string) => void;
  pipelineSteps?: AiOrchestratorPipelineStep[];
  onRunPipeline?: (input: string) => void | Promise<void>;
  loading?: boolean;
  demo?: boolean;
  label?: string;
  classNames?: AiOrchestratorClassNames;
  children?: ReactNode;
}
