import type { FormFieldConfig, FormValues } from "../Form/Form.types";
import type { AiDataAnalystResult } from "../AiDataAnalyst/AiDataAnalyst.types";
import type { AiSearchItem, AiSearchResult } from "../AiSearch/AiSearch.types";

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length > 2);
}

/** Demo summarizer — wire `onSummarize` to your model in production. */
export function demoSummarizeText(source: string, format: "paragraph" | "bullets" = "bullets"): string {
  const trimmed = source.trim();
  if (!trimmed) return "";

  const sentences = trimmed.split(/(?<=[.!?])\s+/).filter(Boolean);
  const lead = sentences.slice(0, 2).join(" ");
  const keywords = [...new Set(tokenize(trimmed))].slice(0, 5);

  if (format === "paragraph") {
    return `${lead}${sentences.length > 2 ? ` In short: ${keywords.join(", ")}.` : ""}`;
  }

  const bullets = [
    lead || trimmed.slice(0, 120),
    keywords.length ? `Key topics: ${keywords.join(", ")}` : null,
    sentences.length > 3 ? `${sentences.length} sentences condensed` : null,
  ].filter(Boolean);

  return bullets.map((line) => `• ${line}`).join("\n");
}

/** Demo data analyst — returns metrics, bars, and a table from natural language. */
export function demoAnalyzeQuery(query: string): AiDataAnalystResult {
  const q = query.toLowerCase();
  const focusRevenue = /revenue|sales|mrr|arr/.test(q);
  const focusUsers = /user|signup|activation|retention/.test(q);
  const focusChannel = /channel|source|campaign/.test(q);

  const metrics = [
    {
      label: focusRevenue ? "Revenue" : "Sessions",
      value: focusRevenue ? "$84.2k" : "128.4k",
      trend: "up" as const,
      delta: focusRevenue ? "+12.4%" : "+9.2%",
    },
    {
      label: focusUsers ? "Active users" : "Conversion",
      value: focusUsers ? "18.6k" : "3.8%",
      trend: "up" as const,
      delta: focusUsers ? "+6.1%" : "+0.4 pts",
    },
    {
      label: "Avg. session",
      value: "4m 12s",
      trend: "neutral" as const,
      delta: "±0%",
    },
  ];

  const chart = focusChannel
    ? [
        { label: "Product", value: 72 },
        { label: "Docs", value: 54 },
        { label: "Templates", value: 41 },
        { label: "Search", value: 36 },
      ]
    : [
        { label: "Mon", value: 42 },
        { label: "Tue", value: 48 },
        { label: "Wed", value: 55 },
        { label: "Thu", value: 51 },
        { label: "Fri", value: 63 },
      ];

  const table = {
    columns: [
      { key: "segment", header: "Segment" },
      { key: "value", header: "Value" },
      { key: "change", header: "Change" },
    ],
    rows: [
      { segment: "North America", value: focusRevenue ? "$32.1k" : "48.2k", change: "+8%" },
      { segment: "Europe", value: focusRevenue ? "$21.4k" : "31.5k", change: "+5%" },
      { segment: "APAC", value: focusRevenue ? "$12.8k" : "18.1k", change: "+11%" },
    ],
  };

  return {
    summary: `Analysis for “${query.trim().slice(0, 80)}” — demo data shaped by keywords in your question.`,
    metrics,
    chart,
    table,
  };
}

/** Demo form filler — maps natural language to field values. */
export function demoFillForm(prompt: string, fields: FormFieldConfig[]): FormValues {
  const values: FormValues = {};
  const lower = prompt.toLowerCase();

  for (const field of fields) {
    const name = field.name.toLowerCase();
    if (field.type === "switch") {
      values[field.name] = /enable|on|yes|true/.test(lower) && name.includes("notify");
      continue;
    }

    const emailMatch = prompt.match(/[\w.+-]+@[\w.-]+\.\w+/);
    const phoneMatch = prompt.match(/\+?\d[\d\s-]{8,}/);

    if (field.type === "email" || name.includes("email")) {
      values[field.name] = emailMatch?.[0] ?? "alex@example.com";
    } else if (name.includes("phone") || name.includes("mobile")) {
      values[field.name] = phoneMatch?.[0]?.trim() ?? "+1 555 0100";
    } else if (name.includes("name") || name === "fullname") {
      const nameMatch = prompt.match(/(?:name is|i am|i'm)\s+([A-Za-z][\w\s]{1,40})/i);
      values[field.name] = nameMatch?.[1]?.trim() ?? "Alex Chen";
    } else if (name.includes("company") || name.includes("org")) {
      values[field.name] = /company\s+(\w+)/i.exec(prompt)?.[1] ?? "AsriUI Labs";
    } else if (field.type === "textarea" || name.includes("note") || name.includes("message")) {
      values[field.name] = prompt.trim();
    } else if (field.type === "select" && field.options?.length) {
      values[field.name] = field.options[0]?.value ?? "";
    } else {
      values[field.name] = prompt.split(/[.!?]/)[0]?.trim().slice(0, 80) ?? "";
    }
  }

  return values;
}

/** Demo semantic search — token overlap scoring. */
export function demoSemanticSearch(query: string, items: AiSearchItem[]): AiSearchResult[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const scored = items
    .map((item) => {
      const corpus = `${item.title} ${item.description ?? ""} ${(item.tags ?? []).join(" ")}`.toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (corpus.includes(token)) score += 1;
      }
      const snippet =
        item.description?.slice(0, 120) ??
        item.title;
      return { item, score: score / tokens.length, snippet };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 8);
}
