import type { ReactNode } from "react";

export function getNodeSearchText(label: ReactNode) {
  if (typeof label === "string" || typeof label === "number") {
    return String(label);
  }
  return "";
}

export function matchesSearchText(text: string, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return text.toLowerCase().includes(normalizedQuery);
}

export function toValueArray(value: string | string[] | undefined): string[] {
  if (value == null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

export function emitSelection(multiple: boolean, values: string[]): string | string[] {
  return multiple ? values : (values[0] ?? "");
}
