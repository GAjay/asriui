import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { SlotClassNames } from "../../utils/slotClassNames";

export type DataGridClassNames = SlotClassNames<
  "root" | "toolbar" | "viewport" | "pagination" | "empty" | "loading"
>;

/** Data grid rendering engine. */
export type DataGridEngine = "native" | "ag-grid";

export type DataGridSortDirection = "asc" | "desc";

/** Built-in cell editor types. */
export type DataGridColumnEditor = "text" | "number" | "email" | "select";

/** Config-driven validation rules for editable cells. */
export type DataGridValidationRule =
  | { type: "required"; message?: string }
  | { type: "email"; message?: string }
  | { type: "pattern"; value: string | RegExp; flags?: string; message?: string }
  | { type: "unique"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "min"; value: number; message?: string }
  | { type: "max"; value: number; message?: string }
  | { type: "oneOf"; values: string[]; message?: string }
  | {
      type: "custom";
      validate: (
        value: unknown,
        context: { row: unknown; rows: unknown[]; columnId: string; rowIndex: number },
      ) => string | null | undefined;
      message?: string;
    };

export type DataGridColumn<T> = {
  /** Unique column id. */
  id: string;
  /** Header label or custom node. */
  header: ReactNode;
  /** Field key or accessor for cell value. */
  accessor?: keyof T | ((row: T) => unknown);
  /** Enable client-side sorting for this column. */
  sortable?: boolean;
  width?: number | string;
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  /** Custom read-only cell renderer. */
  renderCell?: (row: T, value: unknown) => ReactNode;
  /** Enable inline editing for this column. */
  editable?: boolean | DataGridColumnEditor;
  /** Editor configuration for editable columns. */
  editor?: {
    type?: DataGridColumnEditor;
    placeholder?: string;
    options?: Array<{ label: string; value: string }>;
  };
  /** Validation rules — supports required, pattern, unique, min/max, and custom. */
  rules?: DataGridValidationRule[];
  /** Shorthand for `{ type: "required" }`. */
  required?: boolean;
  /** Shorthand for pattern validation. */
  pattern?: string | RegExp;
  /** Shorthand for unique values across the column. */
  unique?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  /**
   * Enable a per-column filter. `true` uses a text input.
   * Pass `{ type: "select", options }` for a dropdown filter.
   */
  filterable?: boolean | DataGridColumnFilter;
};

export type DataGridColumnFilter = {
  type?: "text" | "select";
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
};

export type DataGridSortState = {
  columnId: string;
  direction: DataGridSortDirection;
} | null;

export type DataGridExportConfig = {
  csv?: boolean;
  excel?: boolean;
  import?: boolean;
  filename?: string;
};

export type DataGridEditableConfig<T = unknown> = {
  /** When to validate edited cells. @default "blur" */
  validateOn?: "change" | "blur";
  /** When to fire `onCellChange` after a valid edit. @default "blur" */
  commitOn?: "change" | "blur";
  /** Called after a valid cell commit (blur by default, not every keystroke). */
  onCellChange?: (payload: {
    rowId: string | number;
    columnId: string;
    value: unknown;
    row: T;
    rows: T[];
  }) => void;
  /** Called when row data changes (includes invalid interim values). */
  onRowsChange?: (rows: T[]) => void;
};

export type DataGridExpandableConfig<T = unknown> = {
  /** Detail panel rendered below an expanded row. */
  renderExpandedRow: (row: T, rowIndex: number) => ReactNode;
  /** Controlled expanded row ids. */
  expandedRowIds?: Array<string | number>;
  /** Initial expanded row ids (uncontrolled). */
  defaultExpandedRowIds?: Array<string | number>;
  /** Fired when expanded rows change. */
  onExpandedChange?: (expandedRowIds: Array<string | number>) => void;
  /** Allow multiple expanded rows. @default false */
  multiple?: boolean;
};

export type DataGridPaginationConfig = {
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  /** Client vs server pagination. @default "client" */
  mode?: "client" | "server";
  /** Total rows from server when `mode` is `"server"`. */
  totalRowCount?: number;
};

export type DataGridFilterState = {
  /** Global search across filterable columns. */
  query?: string;
  /** Per-column filter values keyed by column id. */
  columns?: Record<string, string>;
};

export type DataGridFilterConfig = {
  query?: string;
  columns?: Record<string, string>;
  defaultQuery?: string;
  defaultColumns?: Record<string, string>;
  placeholder?: string;
  /** Show the global search bar. @default true */
  global?: boolean;
  /** Show a filter input under each filterable column. @default true */
  columnFilters?: boolean;
  onFilterChange?: (filter: DataGridFilterState) => void;
};

export type DataGridServerSideConfig = {
  /** Skip client sort, filter, and pagination — parent supplies current page rows. @default true */
  enabled?: boolean;
  /** Total row count from the server for pagination UI. */
  totalRowCount?: number;
};

export type DataGridVirtualizeConfig = {
  /** Fixed row height in pixels. @default 44 */
  rowHeight?: number;
  overscan?: number;
  /** Auto-enable virtualization when row count exceeds this. @default 50 */
  threshold?: number;
};

/** Cell errors keyed by row id, then column id. */
export type DataGridCellErrors = Record<string, Record<string, string>>;

type DataGridBaseProps<T> = {
  columns: DataGridColumn<T>[];
  rows: T[];
  getRowId?: (row: T, index: number) => string | number;
  variant?: "default" | "striped" | "bordered";
  height?: number | string;
  emptyMessage?: string;
  loading?: boolean;
  exportable?: boolean | DataGridExportConfig;
  onImport?: (rows: T[]) => void;
  className?: string;
  /** Override class names for grid slots — merged with each part's `className`. */
  classNames?: DataGridClassNames;
  style?: CSSProperties;
};

export type DataGridNativeProps<T> = DataGridBaseProps<T> & {
  engine?: "native";
  sort?: DataGridSortState;
  defaultSort?: DataGridSortState;
  onSortChange?: (sort: DataGridSortState) => void;
  stickyHeader?: boolean;
  /** Enable inline editing with per-column validation rules. */
  editable?: boolean | DataGridEditableConfig<T>;
  /** Client-side pagination controls. */
  pagination?: boolean | DataGridPaginationConfig;
  /** Virtualize rows with VirtualList for large datasets. */
  virtualize?: boolean | DataGridVirtualizeConfig;
  /** Controlled validation errors. */
  errors?: DataGridCellErrors;
  /** Fired when validation errors change. */
  onErrorsChange?: (errors: DataGridCellErrors) => void;
  /** Expandable row detail panels. Disables virtualization when set. */
  expandable?: boolean | DataGridExpandableConfig<T>;
  /** Global text filter (client-side unless `serverSide` is enabled). */
  filter?: boolean | DataGridFilterConfig;
  defaultFilter?: DataGridFilterState;
  onFilterChange?: (filter: DataGridFilterState) => void;
  /** Server-driven sort, filter, and pagination — pass current page rows only. */
  serverSide?: boolean | DataGridServerSideConfig;
};

export type DataGridAgGridOptions = Record<string, unknown>;

export type DataGridAgGridProps<T> = DataGridBaseProps<T> & {
  engine: "ag-grid";
  gridOptions?: DataGridAgGridOptions;
  themeClass?: string;
};

export type DataGridProps<T> = DataGridNativeProps<T> | DataGridAgGridProps<T>;

export type DataGridAgGridInnerProps<T> = DataGridAgGridProps<T> &
  HTMLAttributes<HTMLDivElement>;
