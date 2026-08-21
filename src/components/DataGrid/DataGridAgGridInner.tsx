import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { cn } from "../../utils/cn";
import type { DataGridAgGridInnerProps } from "./DataGrid.types";
import { toAgGridColumnDefs, toCssSize } from "./DataGrid.utils";
import styles from "./DataGrid.module.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export function DataGridAgGridInner<T>({
  columns,
  rows,
  gridOptions,
  themeClass = "ag-theme-axiom",
  height = 420,
  className,
  style,
  ...rest
}: DataGridAgGridInnerProps<T>) {
  const columnDefs = useMemo(() => toAgGridColumnDefs(columns), [columns]);

  return (
    <div
      className={cn(styles.root, styles.agShell, className)}
      style={{ height: toCssSize(height), ...style }}
      {...rest}
    >
      <div className={cn("ag-theme-quartz", themeClass, styles.agShell)} style={{ height: "100%" }}>
        <AgGridReact
          rowData={rows}
          columnDefs={columnDefs}
          domLayout={height ? undefined : "autoHeight"}
          suppressCellFocus
          {...gridOptions}
        />
      </div>
    </div>
  );
}

DataGridAgGridInner.displayName = "DataGridAgGridInner";
