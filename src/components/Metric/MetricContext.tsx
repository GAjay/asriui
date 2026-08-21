import { createContext, useContext } from "react";
import type { MetricFormat, MetricTrend } from "./Metric.types";

export type MetricContextValue = {
  trend?: MetricTrend;
  format?: MetricFormat;
  currency?: string;
  locale?: string;
  live?: boolean;
};

const MetricContext = createContext<MetricContextValue>({});

export const MetricProvider = MetricContext.Provider;

export function useMetricContext(): MetricContextValue {
  return useContext(MetricContext);
}
