import { useCallback, useState } from "react";
import { cn } from "../../utils/cn";
import { createSlotClassNames } from "../../utils/slotClassNames";
import { demoAnalyzeQuery } from "../AiTools/demoNlp";
import { Button } from "../Button";
import { Loader } from "../Loader";
import { Metric } from "../Metric";
import type { AiDataAnalystProps } from "./AiDataAnalyst.types";
import shared from "../AiTools/AiTools.module.css";
import styles from "./AiDataAnalyst.module.css";

const { SlotClassNamesProvider, useSlotClassName } = createSlotClassNames<"root" | "query" | "output">();

export function AiDataAnalyst({
  query,
  onQueryChange,
  result: resultProp,
  onAnalyze,
  loading: loadingProp,
  demo = true,
  queryLabel = "Ask in natural language",
  queryPlaceholder = "e.g. Show revenue by region last quarter",
  actionLabel = "Analyze",
  className,
  classNames,
  ...rest
}: AiDataAnalystProps) {
  const [internalResult, setInternalResult] = useState(resultProp ?? null);
  const [internalLoading, setInternalLoading] = useState(false);
  const result = resultProp ?? internalResult;
  const loading = loadingProp ?? internalLoading;
  const maxChart = result?.chart?.reduce((max, bar) => Math.max(max, bar.value), 0) ?? 1;
  const slotOutput = useSlotClassName("output");

  const run = useCallback(async () => {
    if (!query.trim()) return;
    setInternalLoading(true);
    try {
      if (onAnalyze) {
        await onAnalyze(query);
      } else if (demo) {
        setInternalResult(demoAnalyzeQuery(query));
      }
    } finally {
      setInternalLoading(false);
    }
  }, [demo, onAnalyze, query]);

  return (
    <SlotClassNamesProvider classNames={classNames}>
      <div
        className={cn(shared.panel, styles.root, useSlotClassName("root"), className)}
        role="region"
        aria-label="AI data analyst"
        {...rest}
      >
        <label className={shared.title} htmlFor="ai-data-analyst-query">{queryLabel}</label>
        <div className={shared.promptRow}>
          <input
            id="ai-data-analyst-query"
            className={cn(shared.promptInput, useSlotClassName("query"))}
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder={queryPlaceholder}
            onKeyDown={(event) => {
              if (event.key === "Enter") void run();
            }}
          />
          <Button onClick={() => void run()} disabled={loading || !query.trim()} loading={loading}>
            {actionLabel}
          </Button>
        </div>
        {loading ? <Loader size="sm" label="Analyzing data" /> : null}

        {result ? (
          <div className={cn(styles.output, slotOutput)}>
            {result.summary ? <p className={styles.summary}>{result.summary}</p> : null}
            {result.metrics?.length ? (
              <div className={shared.metricGrid}>
                {result.metrics.map((metric) => (
                  <Metric key={metric.label} variant="compact" trend={metric.trend}>
                    <Metric.Label>{metric.label}</Metric.Label>
                    <Metric.Value>{metric.value}</Metric.Value>
                    {metric.delta ? <Metric.Change>{metric.delta}</Metric.Change> : null}
                  </Metric>
                ))}
              </div>
            ) : null}
            {result.chart?.length ? (
              <div className={shared.chart} aria-label="Chart preview">
                {result.chart.map((bar) => (
                  <div key={bar.label} className={shared.chartRow}>
                    <span>{bar.label}</span>
                    <div
                      className={shared.chartBar}
                      style={{ width: `${Math.round((bar.value / maxChart) * 100)}%` }}
                    />
                    <span>{bar.value}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {result.table ? (
              <div className={shared.tableWrap}>
                <table className={shared.table}>
                  <thead>
                    <tr>
                      {result.table.columns.map((col) => (
                        <th key={col.key}>{col.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.table.rows.map((row, index) => (
                      <tr key={index}>
                        {result.table!.columns.map((col) => (
                          <td key={col.key}>{row[col.key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : (
          <p className={shared.empty}>Ask a question to generate metrics, charts, and tables.</p>
        )}
      </div>
    </SlotClassNamesProvider>
  );
}
