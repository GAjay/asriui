import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { Table } from "../Table";
import { DataGridEditableCell } from "./DataGridEditableCell";
import { DataGridExpandToggle } from "./DataGridExpandToggle";
import {
  buildColumnGridTemplate,
  filterRows,
  isColumnEditable,
  paginateRows,
  resolveEditableConfig,
  resolveExpandableConfig,
  resolveFilterConfig,
  resolvePaginationConfig,
  resolveColumnFilter,
  resolveServerSideConfig,
  resolveVirtualizeConfig,
  setRowColumnValue,
} from "./DataGrid.features";
import { DataGridColumnFilterInput, DataGridFilter } from "./DataGridFilter";
import { DataGridPagination } from "./DataGridPagination";
import { DataGridToolbar } from "./DataGridToolbar";
import { DataGridVirtualBody } from "./DataGridVirtualBody";
import type {
  DataGridCellErrors,
  DataGridColumn,
  DataGridFilterState,
  DataGridNativeProps,
  DataGridSortState,
} from "./DataGrid.types";
import { validateDataGridCell } from "./DataGrid.validate";
import { getCellValue, getRawValue, sortRows, toCssSize, toggleSort } from "./DataGrid.utils";
import styles from "./DataGrid.module.css";

function SortIcon({ direction }: { direction: "asc" | "desc" | null }) {
  return (
    <svg
      className={styles.sortIcon}
      data-active={direction ? "true" : undefined}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      {direction === "desc" ? <path d="m6 9 6 6 6-6" /> : <path d="m6 15 6-6 6 6" />}
    </svg>
  );
}

function cellFocusKey(rowId: string | number, columnId: string) {
  return `${rowId}:${columnId}`;
}

function findRowIndexById<T>(
  rows: T[],
  rowId: string | number,
  getRowId?: (row: T, index: number) => string | number,
) {
  return rows.findIndex((row, index) => String(getRowId?.(row, index) ?? index) === String(rowId));
}

function parseHeight(value: number | string | undefined, fallback = 360) {
  if (value == null) return fallback;
  if (typeof value === "number") return value;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const DataGridNative = forwardRef(function DataGridNative<T>(
  {
    columns,
    rows,
    getRowId,
    variant = "striped",
    height,
    emptyMessage = "No rows to display",
    loading = false,
    sort: sortProp,
    defaultSort = null,
    onSortChange,
    stickyHeader = true,
    exportable,
    onImport,
    editable,
    pagination,
    virtualize,
    errors: errorsProp,
    onErrorsChange,
    expandable,
    filter,
    defaultFilter,
    onFilterChange,
    serverSide,
    className,
    classNames,
    style,
  }: DataGridNativeProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const editableConfig = resolveEditableConfig(editable);
  const expandableConfig = resolveExpandableConfig(expandable);
  const paginationConfig = resolvePaginationConfig(pagination);
  const filterConfig = resolveFilterConfig(filter);
  const serverSideConfig = resolveServerSideConfig(serverSide);
  const focusValuesRef = useRef<Map<string, unknown>>(new Map());

  const [sortState, setSortState] = useState<DataGridSortState>(defaultSort);
  const [pageState, setPageState] = useState(paginationConfig?.defaultPage ?? 1);
  const [pageSizeState, setPageSizeState] = useState(
    paginationConfig?.pageSize ?? paginationConfig?.defaultPageSize ?? 10,
  );
  const [filterState, setFilterState] = useState<DataGridFilterState>(
    defaultFilter ?? {
      query: filterConfig?.defaultQuery ?? "",
      columns: filterConfig?.defaultColumns ?? {},
    },
  );
  const [draftRows, setDraftRows] = useState(rows);
  const [internalErrors, setInternalErrors] = useState<DataGridCellErrors>({});
  const [expandedState, setExpandedState] = useState<Array<string | number>>(
    expandableConfig?.defaultExpandedRowIds ?? [],
  );

  useEffect(() => {
    setDraftRows(rows);
  }, [rows]);

  const sort = sortProp ?? sortState;
  const page = paginationConfig?.page ?? pageState;
  const pageSize = paginationConfig?.pageSize ?? pageSizeState;
  const filterQuery = filterConfig?.query ?? filterState.query;
  const activeFilter = useMemo<DataGridFilterState>(
    () => ({
      query: filterQuery,
      columns: filterConfig?.columns ?? filterState.columns ?? {},
    }),
    [filterConfig?.columns, filterQuery, filterState.columns],
  );
  const columnFiltersEnabled = Boolean(filterConfig?.columnFilters);
  const isServerSide = Boolean(serverSideConfig?.enabled || paginationConfig?.mode === "server");
  const errors = errorsProp ?? internalErrors;
  const expandedRowIds = expandableConfig?.expandedRowIds ?? expandedState;
  const editAll = editableConfig?.editAll ?? false;

  const filteredRows = useMemo(() => {
    if (!filterConfig || isServerSide) return draftRows;
    return filterRows(draftRows, columns, activeFilter, getRawValue);
  }, [activeFilter, columns, draftRows, filterConfig, isServerSide]);

  const sortedRows = useMemo(() => {
    if (isServerSide) return filteredRows;
    return sortRows(filteredRows, columns, sort);
  }, [columns, filteredRows, isServerSide, sort]);
  const virtualConfig = useMemo(() => {
    if (expandableConfig) return null;
    return resolveVirtualizeConfig(virtualize, sortedRows.length);
  }, [expandableConfig, sortedRows.length, virtualize]);

  const paginationResult = useMemo(() => {
    if (!paginationConfig) {
      return {
        rows: sortedRows,
        page: 1,
        totalPages: 1,
        totalRows: sortedRows.length,
        startIndex: 0,
      };
    }

    if (isServerSide) {
      const totalRows =
        serverSideConfig?.totalRowCount ??
        paginationConfig.totalRowCount ??
        sortedRows.length;
      const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
      const safePage = Math.min(Math.max(page, 1), totalPages);
      return {
        rows: sortedRows,
        page: safePage,
        totalPages,
        totalRows,
        startIndex: (safePage - 1) * pageSize,
      };
    }

    return paginateRows(sortedRows, page, pageSize);
  }, [
    isServerSide,
    page,
    pageSize,
    paginationConfig,
    serverSideConfig?.totalRowCount,
    sortedRows,
  ]);

  const displayRows = paginationResult.rows;
  const viewportHeight = parseHeight(height);
  const toolbarHeight = exportable ? 48 : 0;
  const filterHeight = filterConfig?.global === false ? 0 : filterConfig ? 52 : 0;
  const paginationHeight = paginationConfig ? 52 : 0;
  const headerHeight = columnFiltersEnabled ? 84 : 44;
  const bodyHeight = Math.max(
    160,
    viewportHeight - toolbarHeight - filterHeight - paginationHeight - headerHeight,
  );

  const setFilter = useCallback(
    (next: DataGridFilterState) => {
      const queryControlled = filterConfig?.query !== undefined;
      const columnsControlled = filterConfig?.columns !== undefined;
      if (!queryControlled || !columnsControlled) {
        setFilterState((prev) => ({
          query: queryControlled ? prev.query : next.query,
          columns: columnsControlled ? prev.columns : next.columns,
        }));
      }
      filterConfig?.onFilterChange?.(next);
      onFilterChange?.(next);
      if (paginationConfig?.page === undefined) setPageState(1);
      paginationConfig?.onPageChange?.(1);
    },
    [filterConfig, onFilterChange, paginationConfig],
  );

  const setColumnFilter = useCallback(
    (columnId: string, value: string) => {
      setFilter({
        ...activeFilter,
        columns: { ...activeFilter.columns, [columnId]: value },
      });
    },
    [activeFilter, setFilter],
  );

  const setSort = useCallback(
    (next: DataGridSortState) => {
      if (sortProp === undefined) setSortState(next);
      onSortChange?.(next);
    },
    [onSortChange, sortProp],
  );

  const setErrors = useCallback(
    (next: DataGridCellErrors) => {
      if (errorsProp === undefined) setInternalErrors(next);
      onErrorsChange?.(next);
    },
    [errorsProp, onErrorsChange],
  );

  const updateRows = useCallback(
    (nextRows: T[]) => {
      setDraftRows(nextRows);
      editableConfig?.onRowsChange?.(nextRows);
    },
    [editableConfig],
  );

  const applyCellValidation = useCallback(
    (rowId: string | number, columnId: string, value: unknown, nextRows: T[]) => {
      const column = columns.find((entry) => entry.id === columnId);
      const rowIndex = findRowIndexById(nextRows, rowId, getRowId);
      const updatedRow = rowIndex >= 0 ? nextRows[rowIndex] : undefined;
      if (!column || !updatedRow) return null;

      const error = validateDataGridCell(value, column, updatedRow, nextRows, rowIndex);
      const nextRowErrors = { ...(errors[String(rowId)] ?? {}) };
      if (error) nextRowErrors[columnId] = error;
      else delete nextRowErrors[columnId];

      const nextErrors = { ...errors, [String(rowId)]: nextRowErrors };
      if (Object.keys(nextRowErrors).length === 0) delete nextErrors[String(rowId)];
      setErrors(nextErrors);
      return error;
    },
    [columns, errors, getRowId, setErrors],
  );

  const updateDraftCell = useCallback(
    (rowId: string | number, columnId: string, value: unknown, validate: boolean) => {
      const column = columns.find((entry) => entry.id === columnId);
      if (!column) return;

      const nextRows = draftRows.map((row, index) => {
        const id = getRowId?.(row, index) ?? index;
        if (String(id) !== String(rowId)) return row;
        return setRowColumnValue(row, column, value);
      });

      updateRows(nextRows);
      if (validate) applyCellValidation(rowId, columnId, value, nextRows);
    },
    [applyCellValidation, columns, draftRows, getRowId, updateRows],
  );

  const commitCell = useCallback(
    (rowId: string | number, columnId: string, options?: { notify?: boolean }) => {
      const column = columns.find((entry) => entry.id === columnId);
      const rowIndex = findRowIndexById(draftRows, rowId, getRowId);
      const row = rowIndex >= 0 ? draftRows[rowIndex] : undefined;
      if (!column || !row) return;

      const value = getRawValue(row, column);
      const error = applyCellValidation(rowId, columnId, value, draftRows);
      const focusKey = cellFocusKey(rowId, columnId);
      const previousValue = focusValuesRef.current.get(focusKey);
      const changed = previousValue === undefined || previousValue !== value;
      const shouldNotify = options?.notify ?? true;

      if (!error && changed && shouldNotify) {
        editableConfig?.onCellChange?.({
          rowId,
          columnId,
          value,
          row,
          rows: draftRows,
        });
      }

      focusValuesRef.current.delete(focusKey);
    },
    [applyCellValidation, columns, draftRows, editableConfig, getRowId],
  );

  const handleCellFocus = useCallback((rowId: string | number, columnId: string, value: unknown) => {
    focusValuesRef.current.set(cellFocusKey(rowId, columnId), value);
  }, []);

  const handleCellChange = useCallback(
    (rowId: string | number, columnId: string, value: unknown) => {
      const shouldValidate = editableConfig?.validateOn === "change";
      const shouldCommit = editableConfig?.commitOn === "change";
      updateDraftCell(rowId, columnId, value, shouldValidate);
      if (shouldCommit) commitCell(rowId, columnId);
    },
    [commitCell, editableConfig?.commitOn, editableConfig?.validateOn, updateDraftCell],
  );

  const handleCellBlur = useCallback(
    (rowId: string | number, columnId: string) => {
      commitCell(rowId, columnId, { notify: editableConfig?.commitOn !== "change" });
    },
    [commitCell, editableConfig?.commitOn],
  );

  const toggleExpandedRow = useCallback(
    (rowId: string | number) => {
      if (!expandableConfig) return;
      const id = String(rowId);
      const current = expandedRowIds.map(String);
      const isExpanded = current.includes(id);
      const next = expandableConfig.multiple
        ? isExpanded
          ? expandedRowIds.filter((entry) => String(entry) !== id)
          : [...expandedRowIds, rowId]
        : isExpanded
          ? []
          : [rowId];

      if (expandableConfig.expandedRowIds === undefined) {
        setExpandedState(next);
      }
      expandableConfig.onExpandedChange?.(next);
    },
    [expandableConfig, expandedRowIds],
  );

  const handleSort = (column: DataGridColumn<T>) => {
    if (!column.sortable) return;
    const nextDirection = toggleSort(sort, column.id);
    setSort(nextDirection ? { columnId: column.id, direction: nextDirection } : null);
  };

  const handlePageChange = (nextPage: number) => {
    if (paginationConfig?.page === undefined) setPageState(nextPage);
    paginationConfig?.onPageChange?.(nextPage);
  };

  const handlePageSizeChange = (nextSize: number) => {
    if (paginationConfig?.pageSize === undefined) setPageSizeState(nextSize);
    paginationConfig?.onPageSizeChange?.(nextSize);
    handlePageChange(1);
  };

  const renderRowCells = (row: T, absoluteIndex: number, compactError = false) => {
    const rowId = getRowId?.(row, absoluteIndex) ?? absoluteIndex;
    const rowErrors = errors[String(rowId)] ?? {};
    const isExpanded = expandableConfig
      ? expandedRowIds.some((entry) => String(entry) === String(rowId))
      : false;

    const cells: ReactNode[] = [];

    if (expandableConfig) {
      cells.push(
        <Table.Cell key="__expand" className={styles.expandCell}>
          <DataGridExpandToggle
            expanded={isExpanded}
            onToggle={() => toggleExpandedRow(rowId)}
            label={`${isExpanded ? "Collapse" : "Expand"} row ${absoluteIndex + 1}`}
          />
        </Table.Cell>,
      );
    }

    columns.forEach((column) => {
      const value = getRawValue(row, column);
      const columnEditable = Boolean(editableConfig && isColumnEditable(column, editAll));

      cells.push(
        <Table.Cell key={column.id} align={column.align}>
          {columnEditable ? (
            <DataGridEditableCell
              column={column}
              value={value}
              editable
              error={rowErrors[column.id] || undefined}
              compactError={compactError}
              onFocus={() => handleCellFocus(rowId, column.id, value)}
              onChange={(next) => handleCellChange(rowId, column.id, next)}
              onBlur={() => handleCellBlur(rowId, column.id)}
              onCommit={() => handleCellBlur(rowId, column.id)}
            />
          ) : (
            (getCellValue(row, column) as ReactNode)
          )}
        </Table.Cell>,
      );
    });

    return cells;
  };

  const totalColumnCount = columns.length + (expandableConfig ? 1 : 0);

  return (
    <div
      ref={ref}
      className={cn(styles.root, classNames?.root, className)}
      style={{ height: toCssSize(height), ...style }}
      role={virtualConfig ? "grid" : undefined}
    >
      <DataGridToolbar
        columns={columns}
        rows={sortedRows}
        exportable={exportable}
        onImport={onImport}
        className={classNames?.toolbar}
      />

      {filterConfig?.global !== false && filterConfig ? (
        <DataGridFilter
          filter={activeFilter}
          placeholder={filterConfig.placeholder}
          onFilterChange={setFilter}
          className={styles.filterBar}
        />
      ) : null}

      {virtualConfig ? (
        <div className={cn(styles.virtualViewport, classNames?.viewport)}>
          <div
            className={cn(styles.virtualHeader, stickyHeader && styles.stickyHead)}
            role="row"
            style={{ gridTemplateColumns: buildColumnGridTemplate(columns) }}
          >
            {columns.map((column) => {
              const active = sort?.columnId === column.id ? sort.direction : null;
              return (
                <div
                  key={column.id}
                  className={styles.virtualHeadCell}
                  role="columnheader"
                  data-align={column.align}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSort(column)}
                      aria-label={`Sort by ${typeof column.header === "string" ? column.header : column.id}`}
                    >
                      {column.header}
                      <SortIcon direction={active} />
                    </button>
                  ) : (
                    column.header
                  )}
                </div>
              );
            })}
          </div>
          {columnFiltersEnabled ? (
            <div
              className={styles.virtualHeader}
              role="row"
              style={{ gridTemplateColumns: buildColumnGridTemplate(columns) }}
            >
              {columns.map((column) => {
                const columnFilter = resolveColumnFilter(column, columnFiltersEnabled);
                return (
                  <div key={`${column.id}-filter`} className={styles.virtualHeadCell}>
                    {columnFilter ? (
                      <DataGridColumnFilterInput
                        column={column}
                        config={columnFilter}
                        value={activeFilter.columns?.[column.id] ?? ""}
                        onChange={setColumnFilter}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
          {loading ? (
            <div className={cn(styles.loading, classNames?.loading)}>Loading…</div>
          ) : displayRows.length === 0 ? (
            <div className={cn(styles.empty, classNames?.empty)}>{emptyMessage}</div>
          ) : (
            <DataGridVirtualBody
              columns={columns}
              rows={displayRows}
              rowHeight={virtualConfig.rowHeight ?? 44}
              height={bodyHeight}
              overscan={virtualConfig.overscan}
              getRowId={getRowId}
              startIndex={paginationResult.startIndex}
              editable={Boolean(editableConfig)}
              editAll={editAll}
              errors={errors}
              onCellFocus={handleCellFocus}
              onCellChange={handleCellChange}
              onCellBlur={handleCellBlur}
            />
          )}
        </div>
      ) : (
        <div className={cn(styles.viewport, classNames?.viewport)} style={{ maxHeight: toCssSize(height) }}>
          <Table variant={variant} scrollable>
            <Table.Header className={stickyHeader ? styles.stickyHead : undefined}>
              <Table.Row>
                {expandableConfig ? (
                  <Table.Head className={styles.expandHead} aria-label="Expand row" />
                ) : null}
                {columns.map((column) => {
                  const active = sort?.columnId === column.id ? sort.direction : null;
                  return (
                    <Table.Head
                      key={column.id}
                      align={column.align}
                      style={{
                        width: toCssSize(column.width),
                        minWidth: toCssSize(column.minWidth),
                      }}
                    >
                      {column.sortable ? (
                        <button
                          type="button"
                          className={styles.sortButton}
                          onClick={() => handleSort(column)}
                          aria-label={`Sort by ${typeof column.header === "string" ? column.header : column.id}`}
                        >
                          {column.header}
                          <SortIcon direction={active} />
                        </button>
                      ) : (
                        column.header
                      )}
                    </Table.Head>
                  );
                })}
              </Table.Row>
              {columnFiltersEnabled ? (
                <Table.Row>
                  {expandableConfig ? <Table.Head className={styles.expandHead} /> : null}
                  {columns.map((column) => {
                    const columnFilter = resolveColumnFilter(column, columnFiltersEnabled);
                    return (
                      <Table.Head key={`${column.id}-filter`} className={styles.columnFilterCell}>
                        {columnFilter ? (
                          <DataGridColumnFilterInput
                            column={column}
                            config={columnFilter}
                            value={activeFilter.columns?.[column.id] ?? ""}
                            onChange={setColumnFilter}
                          />
                        ) : null}
                      </Table.Head>
                    );
                  })}
                </Table.Row>
              ) : null}
            </Table.Header>
            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={totalColumnCount}>
                    <div className={cn(styles.loading, classNames?.loading)}>Loading…</div>
                  </Table.Cell>
                </Table.Row>
              ) : displayRows.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={totalColumnCount}>
                    <div className={cn(styles.empty, classNames?.empty)}>{emptyMessage}</div>
                  </Table.Cell>
                </Table.Row>
              ) : (
                displayRows.map((row, index) => {
                  const absoluteIndex = paginationResult.startIndex + index;
                  const rowId = getRowId?.(row, absoluteIndex) ?? absoluteIndex;
                  const isExpanded = expandableConfig
                    ? expandedRowIds.some((entry) => String(entry) === String(rowId))
                    : false;

                  return (
                    <Fragment key={String(rowId)}>
                      <Table.Row>{renderRowCells(row, absoluteIndex)}</Table.Row>
                      {expandableConfig && isExpanded ? (
                        <Table.Row className={styles.expandedRow}>
                          <Table.Cell colSpan={totalColumnCount}>
                            {expandableConfig.renderExpandedRow(row, absoluteIndex)}
                          </Table.Cell>
                        </Table.Row>
                      ) : null}
                    </Fragment>
                  );
                })
              )}
            </Table.Body>
          </Table>
        </div>
      )}

      {paginationConfig ? (
        <DataGridPagination
          page={paginationResult.page}
          totalPages={paginationResult.totalPages}
          totalRows={paginationResult.totalRows}
          pageSize={pageSize}
          config={paginationConfig}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          className={classNames?.pagination}
        />
      ) : null}
    </div>
  );
}) as <T>(
  props: DataGridNativeProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReactElement;

(DataGridNative as { displayName?: string }).displayName = "DataGridNative";
