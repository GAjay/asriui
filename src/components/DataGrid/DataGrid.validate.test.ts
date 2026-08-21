import { describe, expect, it } from "vitest";
import type { DataGridColumn } from "./DataGrid.types";
import { resolveColumnRules, validateDataGridCell } from "./DataGrid.validate";

type Row = { id: string; email: string; code: string };

const columns: DataGridColumn<Row>[] = [
  {
    id: "email",
    header: "Email",
    accessor: "email",
    required: true,
    rules: [{ type: "email" }],
  },
  {
    id: "code",
    header: "Code",
    accessor: "code",
    unique: true,
    pattern: /^[A-Z]{3}$/,
  },
];

describe("DataGrid validation", () => {
  it("resolves shorthand rules", () => {
    const rules = resolveColumnRules(columns[1]!);
    expect(rules.some((rule) => rule.type === "unique")).toBe(true);
    expect(rules.some((rule) => rule.type === "pattern")).toBe(true);
  });

  it("validates required and email", () => {
    expect(validateDataGridCell("", columns[0]!, { id: "1", email: "", code: "ABC" }, [], 0)).toMatch(
      /required/i,
    );
    expect(
      validateDataGridCell("bad", columns[0]!, { id: "1", email: "bad", code: "ABC" }, [], 0),
    ).toMatch(/valid email/i);
  });

  it("validates unique values", () => {
    const rows: Row[] = [
      { id: "1", email: "a@test.com", code: "AAA" },
      { id: "2", email: "b@test.com", code: "BBB" },
    ];
    expect(validateDataGridCell("AAA", columns[1]!, rows[1]!, rows, 1)).toMatch(/unique/i);
  });
});
