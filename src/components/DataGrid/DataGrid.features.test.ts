import { describe, expect, it } from "vitest";
import { filterRows } from "./DataGrid.features";
import type { DataGridColumn } from "./DataGrid.types";

type Row = { id: string; name: string; status: string };

const columns: DataGridColumn<Row>[] = [
  { id: "name", header: "Name", accessor: "name" },
  { id: "status", header: "Status", accessor: "status" },
];

const rows: Row[] = [
  { id: "1", name: "License", status: "Active" },
  { id: "2", name: "Support", status: "Trial" },
  { id: "3", name: "Analytics", status: "Active" },
];

function getRawValue(row: Row, column: DataGridColumn<Row>) {
  return row[column.accessor as keyof Row];
}

describe("filterRows", () => {
  it("filters by a single column", () => {
    const result = filterRows(rows, columns, { columns: { status: "Active" } }, getRawValue);
    expect(result.map((row) => row.id)).toEqual(["1", "3"]);
  });

  it("applies column filters with AND, then global query", () => {
    const result = filterRows(
      rows,
      columns,
      { query: "lic", columns: { status: "Active" } },
      getRawValue,
    );
    expect(result.map((row) => row.id)).toEqual(["1"]);
  });
});
