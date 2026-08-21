import { useCallback, useState } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import {
  demoAnalyzeQuery,
  demoFillForm,
  demoSemanticSearch,
  demoSummarizeText,
} from "../AiTools/demoNlp";
import { AiDataAnalyst } from "../AiDataAnalyst";
import { AiFormFiller } from "../AiFormFiller";
import { AiSearch } from "../AiSearch";
import { AiSummarizer } from "../AiSummarizer";
import { Button } from "../Button";
import { Tabs } from "../Tabs";
import type { AiOrchestratorPipelineStep, AiOrchestratorProps, AiOrchestratorToolId } from "./AiOrchestrator.types";
import shared from "../AiTools/AiTools.module.css";
import styles from "./AiOrchestrator.module.css";

const TOOL_TABS: Array<{ id: AiOrchestratorToolId; label: string }> = [
  { id: "summarizer", label: "Summarizer" },
  { id: "data-analyst", label: "Data analyst" },
  { id: "form-filler", label: "Form filler" },
  { id: "search", label: "Search" },
  { id: "pipeline", label: "Pipeline" },
];

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<"root" | "toolbar" | "panel">();

const DEFAULT_FORM_FIELDS = [
  { name: "name", type: "text" as const, label: "Full name", required: true },
  { name: "email", type: "email" as const, label: "Email", required: true },
  { name: "company", type: "text" as const, label: "Company" },
  { name: "notes", type: "textarea" as const, label: "Notes" },
];

export function AiOrchestrator({
  activeTool: activeToolProp,
  onActiveToolChange,
  summarySource: summarySourceProp,
  onSummarySourceChange,
  summary: summaryProp,
  onSummarize,
  analystQuery: analystQueryProp,
  onAnalystQueryChange,
  analystResult: analystResultProp,
  onAnalyze,
  formPrompt: formPromptProp,
  onFormPromptChange,
  formFields = DEFAULT_FORM_FIELDS,
  formValues: formValuesProp,
  onFormValuesChange,
  onFillForm,
  searchQuery: searchQueryProp,
  onSearchQueryChange,
  searchItems = [],
  searchResults: searchResultsProp,
  onSearch,
  pipelineInput: pipelineInputProp,
  onPipelineInputChange,
  pipelineSteps: pipelineStepsProp,
  onRunPipeline,
  loading: loadingProp,
  demo = true,
  label = "AI orchestrator",
  className,
  classNames,
  children,
  ...rest
}: AiOrchestratorProps) {
  const [activeTool, setActiveTool] = useState<AiOrchestratorToolId>(activeToolProp ?? "summarizer");
  const [summarySource, setSummarySource] = useState(summarySourceProp ?? "");
  const [summary, setSummary] = useState(summaryProp ?? "");
  const [analystQuery, setAnalystQuery] = useState(analystQueryProp ?? "");
  const [analystResult, setAnalystResult] = useState(analystResultProp ?? null);
  const [formPrompt, setFormPrompt] = useState(formPromptProp ?? "");
  const [formValues, setFormValues] = useState(formValuesProp ?? {});
  const [searchQuery, setSearchQuery] = useState(searchQueryProp ?? "");
  const [searchResults, setSearchResults] = useState(searchResultsProp ?? []);
  const [pipelineInput, setPipelineInput] = useState(pipelineInputProp ?? "");
  const [pipelineSteps, setPipelineSteps] = useState<AiOrchestratorPipelineStep[]>(pipelineStepsProp ?? []);
  const [internalLoading, setInternalLoading] = useState(false);

  const tool = activeToolProp ?? activeTool;
  const loading = loadingProp ?? internalLoading;

  const setTool = (next: AiOrchestratorToolId) => {
    if (activeToolProp === undefined) setActiveTool(next);
    onActiveToolChange?.(next);
  };

  const runPipeline = useCallback(async () => {
    const input = pipelineInputProp ?? pipelineInput;
    if (!input.trim()) return;
    setInternalLoading(true);
    const steps: AiOrchestratorPipelineStep[] = [
      { id: "1", tool: "summarizer", label: "Summarize input", status: "running" },
      { id: "2", tool: "data-analyst", label: "Analyze themes", status: "idle" },
      { id: "3", tool: "form-filler", label: "Extract structured fields", status: "idle" },
      { id: "4", tool: "search", label: "Match knowledge base", status: "idle" },
    ];
    setPipelineSteps(steps);

    try {
      if (onRunPipeline) {
        await onRunPipeline(input);
        return;
      }

      if (!demo) return;

      const summaryText = demoSummarizeText(input, "bullets");
      setSummary(summaryText);
      steps[0] = {
        id: "1",
        tool: "summarizer",
        label: "Summarize input",
        status: "done",
        output: summaryText.slice(0, 120),
      };

      const analysis = demoAnalyzeQuery(input);
      setAnalystResult(analysis);
      steps[1] = {
        id: "2",
        tool: "data-analyst",
        label: "Analyze themes",
        status: "done",
        output: analysis.summary ?? "Metrics ready",
      };

      const filled = demoFillForm(input, formFields);
      setFormValues(filled);
      steps[2] = {
        id: "3",
        tool: "form-filler",
        label: "Extract structured fields",
        status: "done",
        output: Object.keys(filled).join(", "),
      };

      const matches = demoSemanticSearch(input, searchItems);
      setSearchResults(matches);
      steps[3] = {
        id: "4",
        tool: "search",
        label: "Match knowledge base",
        status: "done",
        output: matches[0]?.item.title ?? "No matches",
      };
      setPipelineSteps([...steps]);
    } finally {
      setInternalLoading(false);
    }
  }, [demo, formFields, onRunPipeline, pipelineInput, pipelineInputProp, searchItems]);

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <div
        className={cn(shared.panel, styles.root, useSlotClassName("root"), className)}
        role="region"
        aria-label={label}
        {...rest}
      >
        <div className={cn(shared.header, useSlotClassName("toolbar"))}>
          <span className={shared.title}>{label}</span>
          <span className={shared.hint}>Route natural language to summarizer, analyst, forms, and search.</span>
        </div>

        <Tabs value={tool} onValueChange={(value) => setTool(value as AiOrchestratorToolId)}>
          <Tabs.List>
            {TOOL_TABS.map((tab) => (
              <Tabs.Trigger key={tab.id} value={tab.id}>{tab.label}</Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="summarizer" className={styles.panel}>
            <AiSummarizer
              source={summarySourceProp ?? summarySource}
              onSourceChange={(value) => {
                if (summarySourceProp === undefined) setSummarySource(value);
                onSummarySourceChange?.(value);
              }}
              summary={summaryProp ?? summary}
              onSummarize={async (source) => {
                if (onSummarize) await onSummarize(source);
                else if (demo) setSummary(demoSummarizeText(source, "bullets"));
              }}
              loading={loading}
              demo={demo}
            />
          </Tabs.Content>

          <Tabs.Content value="data-analyst" className={styles.panel}>
            <AiDataAnalyst
              query={analystQueryProp ?? analystQuery}
              onQueryChange={(value) => {
                if (analystQueryProp === undefined) setAnalystQuery(value);
                onAnalystQueryChange?.(value);
              }}
              result={analystResultProp ?? analystResult}
              onAnalyze={async (query) => {
                if (onAnalyze) await onAnalyze(query);
                else if (demo) setAnalystResult(demoAnalyzeQuery(query));
              }}
              loading={loading}
              demo={demo}
            />
          </Tabs.Content>

          <Tabs.Content value="form-filler" className={styles.panel}>
            <AiFormFiller
              prompt={formPromptProp ?? formPrompt}
              onPromptChange={(value) => {
                if (formPromptProp === undefined) setFormPrompt(value);
                onFormPromptChange?.(value);
              }}
              fields={formFields}
              values={formValuesProp ?? formValues}
              onValuesChange={(values) => {
                if (formValuesProp === undefined) setFormValues(values);
                onFormValuesChange?.(values);
              }}
              onFill={async (prompt, fields) => {
                if (onFillForm) await onFillForm(prompt, fields);
                else if (demo) setFormValues(demoFillForm(prompt, fields));
              }}
              loading={loading}
              demo={demo}
            />
          </Tabs.Content>

          <Tabs.Content value="search" className={styles.panel}>
            <AiSearch
              query={searchQueryProp ?? searchQuery}
              onQueryChange={(value) => {
                if (searchQueryProp === undefined) setSearchQuery(value);
                onSearchQueryChange?.(value);
              }}
              items={searchItems}
              results={searchResultsProp ?? searchResults}
              onSearch={async (query, items) => {
                if (onSearch) await onSearch(query, items);
                else if (demo) setSearchResults(demoSemanticSearch(query, items));
              }}
              loading={loading}
              demo={demo}
            />
          </Tabs.Content>

          <Tabs.Content value="pipeline" className={styles.panel}>
            <label className={shared.title} htmlFor="ai-orchestrator-pipeline">Pipeline input</label>
            <textarea
              id="ai-orchestrator-pipeline"
              className={cn(shared.promptInput, shared.textarea)}
              value={pipelineInputProp ?? pipelineInput}
              onChange={(event) => {
                if (pipelineInputProp === undefined) setPipelineInput(event.target.value);
                onPipelineInputChange?.(event.target.value);
              }}
              placeholder="One prompt routed through summarize → analyze → form fill → search"
            />
            <div className={shared.promptRow}>
              <Button onClick={() => void runPipeline()} disabled={loading} loading={loading}>
                Run pipeline
              </Button>
            </div>
            <ol className={styles.pipeline}>
              {(pipelineStepsProp ?? pipelineSteps).map((step) => (
                <li key={step.id} className={styles.pipelineStep} data-status={step.status}>
                  <strong>{step.label}</strong>
                  <span className={styles.pipelineStatus}>{step.status}</span>
                  {step.output ? <p className={styles.pipelineOutput}>{step.output}</p> : null}
                </li>
              ))}
            </ol>
          </Tabs.Content>
        </Tabs>

        {children}
      </div>
    </SlotClassNamesProvider>
  );
}
