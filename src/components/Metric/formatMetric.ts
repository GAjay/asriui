import type { MetricFormat, MetricTrend } from "./Metric.types";

type FormatValueOptions = {
  format?: MetricFormat;
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

type FormatChangeOptions = FormatValueOptions & {
  showSign?: boolean;
};

export function resolveMetricTrend(value: number): MetricTrend {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "neutral";
}

export function formatMetricValue(
  value: number,
  {
    format = "number",
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits,
    maximumFractionDigits,
  }: FormatValueOptions = {},
): string {
  if (format === "percent") {
    return new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: minimumFractionDigits ?? 2,
      maximumFractionDigits: maximumFractionDigits ?? 2,
    }).format(value / 100);
  }

  if (format === "currency") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: minimumFractionDigits ?? 2,
      maximumFractionDigits: maximumFractionDigits ?? 2,
    }).format(value);
  }

  if (format === "compact") {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: maximumFractionDigits ?? 2,
    }).format(value);
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function formatMetricChange(
  value: number,
  {
    format = "percent",
    currency = "USD",
    locale = "en-US",
    showSign = true,
    minimumFractionDigits,
    maximumFractionDigits,
  }: FormatChangeOptions = {},
): string {
  const sign = showSign && value > 0 ? "+" : "";
  const absolute = Math.abs(value);
  const formatted = formatMetricValue(absolute, {
    format,
    currency,
    locale,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  if (value < 0 && showSign) {
    return `-${formatted}`;
  }

  return `${sign}${formatted}`;
}
