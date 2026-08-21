import type {
  DataGridColumn,
  DataGridColumnFilter,
  DataGridEditableConfig,
  DataGridExpandableConfig,
  DataGridFilterConfig,
  DataGridFilterState,
  DataGridPaginationConfig,
  DataGridServerSideConfig,
  DataGridVirtualizeConfig,
} from "./DataGrid.types";

export function resolveEditableConfig<T>(
  editable: boolean | DataGridEditableConfig<T> | undefined,
): (DataGridEditableConfig<T> & { editAll: boolean }) | null {
  if (!editable) return null;
  if (editable === true) {
    return { validateOn: "blur", commitOn: "blur", editAll: true };
  }
  return { validateOn: "blur", commitOn: "blur", editAll: false, ...editable };
}

export function resolveExpandableConfig<T>(
  expandable: boolean | DataGridExpandableConfig<T> | undefined,
): DataGridExpandableConfig<T> | null {
  if (!expandable) return null;
  if (expandable === true) return null;
  return expandable;
}

export function resolvePaginationConfig(
  pagination: boolean | DataGridPaginationConfig | undefined,
): DataGridPaginationConfig | null {
  if (!pagination) return null;
  if (pagination === true) {
    return { pageSize: 10, pageSizeOptions: [5, 10, 25, 50], mode: "client" };
  }
  return {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    mode: "client",
    ...pagination,
  };
}

export function resolveFilterConfig(
  filter: boolean | DataGridFilterConfig | undefined,
): DataGridFilterConfig | null {
  if (!filter) return null;
  if (filter === true) {
    return { placeholder: "Filter rows…", global: true, columnFilters: true };
  }
  return { placeholder: "Filter rows…", global: true, columnFilters: true, ...filter };
}

export function resolveColumnFilter<T>(
  column: DataGridColumn<T>,
  columnFiltersEnabled: boolean,
): DataGridColumnFilter | null {
  if (!columnFiltersEnabled || column.filterable === false) return null;
  if (typeof column.filterable === "object") {
    return { type: "text", ...column.filterable };
  }
  if (column.filterable === true || columnFiltersEnabled) {
    if (column.editor?.options?.length) {
      return { type: "select", options: column.editor.options };
    }
    return { type: "text" };
  }
  return null;
}

export function resolveServerSideConfig(
  serverSide: boolean | DataGridServerSideConfig | undefined,
): DataGridServerSideConfig | null {
  if (!serverSide) return null;
  if (serverSide === true) {
    return { enabled: true };
  }
  return { enabled: true, ...serverSide };
}

export function filterRows<T>(
  rows: T[],
  columns: DataGridColumn<T>[],
  filter: DataGridFilterState | null | undefined,
  getRawValue: (row: T, column: DataGridColumn<T>) => unknown,
): T[] {
  const query = filter?.query?.trim().toLowerCase();
  const columnValues = filter?.columns ?? {};
  const hasColumnFilters = Object.values(columnValues).some((value) => value?.trim());
  if (!query && !hasColumnFilters) return rows;

  return rows.filter((row) => {
    for (const column of columns) {
      const columnQuery = columnValues[column.id]?.trim().toLowerCase();
      if (!columnQuery) continue;
      const value = String(getRawValue(row, column) ?? "").toLowerCase();
      if (!value.includes(columnQuery)) return false;
    }

    if (!query) return true;

    const searchable = columns.filter((column) => column.filterable !== false);
    const pool = searchable.length > 0 ? searchable : columns;
    return pool.some((column) =>
      String(getRawValue(row, column) ?? "")
        .toLowerCase()
        .includes(query),
    );
  });
}

export function resolveVirtualizeConfig(
  virtualize: boolean | DataGridVirtualizeConfig | undefined,
  rowCount: number,
): DataGridVirtualizeConfig | null {
  if (!virtualize) return null;
  const config =
    virtualize === true
      ? { rowHeight: 44, overscan: 6, threshold: 50 }
      : { rowHeight: 44, overscan: 6, threshold: 50, ...virtualize };

  if (rowCount < (config.threshold ?? 50) && virtualize !== true) {
    return null;
  }

  return config;
}

export function paginateRows<T>(rows: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    rows: rows.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    totalRows: rows.length,
    startIndex: start,
  };
}

export function setRowColumnValue<T>(
  row: T,
  column: DataGridColumn<T>,
  value: unknown,
): T {
  if (typeof column.accessor === "string") {
    return { ...row, [column.accessor]: value };
  }

  if (typeof column.accessor === "function") {
    return row;
  }

  return { ...(row as Record<string, unknown>), [column.id]: value } as T;
}

export function getColumnEditorType<T>(column: DataGridColumn<T>) {
  if (column.editable === false) return null;
  if (typeof column.editable === "string") return column.editable;
  if (column.editable === true) return column.editor?.type ?? "text";
  if (column.editor?.type) return column.editor.type;
  return null;
}

export function isColumnEditable<T>(column: DataGridColumn<T>, editAll = false) {
  if (column.editable === false) return false;
  if (column.renderCell && column.editable == null) return false;
  if (column.editable === true || typeof column.editable === "string") return true;
  if (column.editor) return true;
  return editAll;
}

export function buildColumnGridTemplate<T>(columns: DataGridColumn<T>[]) {
  return columns
    .map((column) => {
      if (column.width != null) {
        return typeof column.width === "number" ? `${column.width}px` : column.width;
      }
      if (column.minWidth != null) {
        const min = typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth;
        return `minmax(${min}, 1fr)`;
      }
      return "minmax(0, 1fr)";
    })
    .join(" ");
}
