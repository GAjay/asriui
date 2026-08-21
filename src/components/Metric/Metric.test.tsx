import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatMetricChange, formatMetricValue, resolveMetricTrend } from "./formatMetric";
import { Metric } from "./Metric";

describe("formatMetric", () => {
  it("formats currency and percent values", () => {
    expect(formatMetricValue(68420.5, { format: "currency", currency: "USD" })).toBe("$68,420.50");
    expect(formatMetricValue(3.54, { format: "percent" })).toBe("3.54%");
    expect(formatMetricChange(3.54, { format: "percent" })).toBe("+3.54%");
    expect(formatMetricChange(-1.2, { format: "percent" })).toBe("-1.20%");
  });

  it("resolves trend from signed values", () => {
    expect(resolveMetricTrend(1)).toBe("up");
    expect(resolveMetricTrend(-1)).toBe("down");
    expect(resolveMetricTrend(0)).toBe("neutral");
  });
});

describe("Metric", () => {
  it("renders a trading quote tile", () => {
    render(
      <Metric variant="quote" trend="up" live>
        <div className="header">
          <Metric.Symbol>BTC/USD</Metric.Symbol>
        </div>
        <Metric.Value value={68420.5} format="currency" />
        <Metric.Change value={3.54} />
        <Metric.Hint>24h high $69,120 · low $66,480</Metric.Hint>
      </Metric>,
    );

    expect(screen.getByText("BTC/USD")).toBeInTheDocument();
    expect(screen.getByText("$68,420.50")).toBeInTheDocument();
    expect(screen.getByText("+3.54%")).toBeInTheDocument();
    expect(screen.getByText(/24h high/)).toBeInTheDocument();
  });

  it("renders a compact portfolio metric", () => {
    render(
      <Metric variant="compact" trend="down">
        <Metric.Label>Unrealized P&amp;L</Metric.Label>
        <div>
          <Metric.Value value={-1240.8} format="currency" />
          <Metric.Change value={-2.18} />
        </div>
      </Metric>,
    );

    expect(screen.getByText("Unrealized P&L")).toBeInTheDocument();
    expect(screen.getByText("-$1,240.80")).toBeInTheDocument();
    expect(screen.getByText("-2.18%")).toBeInTheDocument();
  });

  it("preserves compound display names", () => {
    expect(Metric.displayName).toBe("Metric");
    expect(Metric.Symbol.displayName).toBe("Metric.Symbol");
    expect(Metric.Value.displayName).toBe("Metric.Value");
    expect(Metric.Change.displayName).toBe("Metric.Change");
  });
});
