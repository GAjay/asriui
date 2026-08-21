import type { HTMLAttributes } from "react";
import type { MetricTrend } from "../Metric/Metric.types";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type AiDataAnalystMetric = {
  label: string;
  value: string;
  trend?: MetricTrend;
  delta?: string;
};

export type AiDataAnalystChartBar = {
  label: string;
  value: number;
};

export type AiDataAnalystTable = {
  columns: Array<{ key: string; header: string }>;
  rows: Array<Record<string, string>>;
};

export type AiDataAnalystResult = {
  summary?: string;
  metrics?: AiDataAnalystMetric[];
  chart?: AiDataAnalystChartBar[];
  table?: AiDataAnalystTable;
};

export type AiDataAnalystClassNames = SlotClassNames<"root" | "query" | "output">;

export interface AiDataAnalystProps extends HTMLAttributes<HTMLDivElement> {
  query: string;
  onQueryChange?: (value: string) => void;
  result?: AiDataAnalystResult | null;
  onAnalyze?: (query: string) => void | Promise<void>;
  loading?: boolean;
  /** Built-in demo analysis when `onAnalyze` is omitted. @default true */
  demo?: boolean;
  queryLabel?: string;
  queryPlaceholder?: string;
  actionLabel?: string;
  classNames?: AiDataAnalystClassNames;
}
