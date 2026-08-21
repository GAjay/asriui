import type { DataGridColumn, DataGridSortDirection, DataGridSortState } from "./DataGrid.types";

export function getCellValue<T>(row: T, column: DataGridColumn<T>): unknown {
  if (column.renderCell) return column.renderCell(row, getRawValue(row, column));
  return getRawValue(row, column);
}

export function getRawValue<T>(row: T, column: DataGridColumn<T>): unknown {
  if (!column.accessor) return undefined;
  if (typeof column.accessor === "function") return column.accessor(row);
  return row[column.accessor];
}

export function sortRows<T>(
  rows: T[],
  columns: DataGridColumn<T>[],
  sort: DataGridSortState,
): T[] {
  if (!sort) return rows;

  const column = columns.find((entry) => entry.id === sort.columnId);
  if (!column) return rows;

  const direction = sort.direction === "asc" ? 1 : -1;

  return [...rows].sort((left, right) => {
    const a = getRawValue(left, column);
    const b = getRawValue(right, column);

    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    if (typeof a === "number" && typeof b === "number") {
      return (a - b) * direction;
    }

    return String(a).localeCompare(String(b), undefined, { numeric: true }) * direction;
  });
}

export function toggleSort(
  current: DataGridSortState,
  columnId: string,
): DataGridSortDirection | null {
  if (!current || current.columnId !== columnId) return "asc";
  if (current.direction === "asc") return "desc";
  return null;
}

export function toCssSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/** Map AsriUI columns to AG Grid column definitions. */
export function toAgGridColumnDefs<T>(columns: DataGridColumn<T>[]) {
  return columns.map((column) => {
    const def: Record<string, unknown> = {
      colId: column.id,
      field: typeof column.accessor === "string" ? String(column.accessor) : column.id,
      headerName: typeof column.header === "string" ? column.header : column.id,
      sortable: column.sortable ?? false,
      width: typeof column.width === "number" ? column.width : undefined,
      minWidth: typeof column.minWidth === "number" ? column.minWidth : undefined,
      cellStyle: column.align ? { textAlign: column.align } : undefined,
    };

    if (typeof column.accessor === "function") {
      const accessor = column.accessor;
      def.valueGetter = (params: { data?: T }) => (params.data ? accessor(params.data) : undefined);
    }

    if (column.renderCell) {
      def.cellRenderer = (params: { data?: T }) => {
        if (!params.data) return null;
        const value = getRawValue(params.data, column);
        return column.renderCell?.(params.data, value);
      };
    }

    return def;
  });
}
