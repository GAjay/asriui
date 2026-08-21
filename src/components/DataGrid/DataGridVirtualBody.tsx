import { useMemo } from "react";
import type { ReactNode } from "react";
import { VirtualList } from "../VirtualList";
import { cn } from "../../utils/cn";
import { DataGridEditableCell } from "./DataGridEditableCell";
import { buildColumnGridTemplate, isColumnEditable } from "./DataGrid.features";
import type { DataGridColumn } from "./DataGrid.types";
import { getCellValue, getRawValue } from "./DataGrid.utils";
import styles from "./DataGrid.module.css";

type Props<T> = {
  columns: DataGridColumn<T>[];
  rows: T[];
  rowHeight: number;
  height: number;
  overscan?: number;
  getRowId?: (row: T, index: number) => string | number;
  startIndex?: number;
  editable?: boolean;
  editAll?: boolean;
  errors?: Record<string, Record<string, string>>;
  onCellFocus?: (rowId: string | number, columnId: string, value: unknown) => void;
  onCellChange?: (rowId: string | number, columnId: string, value: unknown) => void;
  onCellBlur?: (rowId: string | number, columnId: string) => void;
};

export function DataGridVirtualBody<T>({
  columns,
  rows,
  rowHeight,
  height,
  overscan = 6,
  getRowId,
  startIndex = 0,
  editable = false,
  editAll = false,
  errors = {},
  onCellFocus,
  onCellChange,
  onCellBlur,
}: Props<T>) {
  const gridTemplate = useMemo(() => buildColumnGridTemplate(columns), [columns]);

  return (
    <div className={styles.virtualShell} style={{ height }}>
      <VirtualList
        items={rows}
        itemHeight={rowHeight}
        height={height}
        overscan={overscan}
        getItemKey={(row, index) => String(getRowId?.(row, startIndex + index) ?? startIndex + index)}
        listStyle={{ width: "100%" }}
        renderItem={(row, index) => {
          const absoluteIndex = startIndex + index;
          const rowId = getRowId?.(row, absoluteIndex) ?? absoluteIndex;
          const rowErrors = errors[String(rowId)] ?? {};

          return (
            <div
              className={cn(styles.virtualRow, index % 2 === 1 && styles.virtualRowStriped)}
              style={{ gridTemplateColumns: gridTemplate }}
              role="row"
            >
              {columns.map((column) => {
                const value = getRawValue(row, column);
                const columnEditable = editable && isColumnEditable(column, editAll);
                return (
                  <div
                    key={column.id}
                    className={styles.virtualCell}
                    role="gridcell"
                    data-align={column.align}
                  >
                    {columnEditable ? (
                      <DataGridEditableCell
                        column={column}
                        value={value}
                        editable
                        compactError
                        error={rowErrors[column.id]}
                        onFocus={() => onCellFocus?.(rowId, column.id, value)}
                        onChange={(next) => onCellChange?.(rowId, column.id, next)}
                        onBlur={() => onCellBlur?.(rowId, column.id)}
                        onCommit={() => onCellBlur?.(rowId, column.id)}
                      />
                    ) : (
                      <span className={styles.cellValue}>{getCellValue(row, column) as ReactNode}</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
}
