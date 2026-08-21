import { forwardRef } from "react";
import type { DataGridProps } from "./DataGrid.types";
import { DataGridAgGrid } from "./DataGridAgGrid";
import { DataGridNative } from "./DataGridNative";

/**
 * Data grid with a native sortable table engine or plug-and-play AG Grid integration.
 *
 * @example Native engine
 * ```tsx
 * <DataGrid
 *   columns={[
 *     { id: "name", header: "Name", accessor: "name", sortable: true },
 *     { id: "status", header: "Status", accessor: "status" },
 *   ]}
 *   rows={data}
 *   getRowId={(row) => row.id}
 * />
 * ```
 *
 * @example AG Grid engine
 * ```tsx
 * <DataGrid
 *   engine="ag-grid"
 *   columns={columns}
 *   rows={data}
 *   gridOptions={{ pagination: true }}
 * />
 * ```
 */
export const DataGrid = forwardRef(function DataGrid<T>(
  props: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  if (props.engine === "ag-grid") {
    return <DataGridAgGrid {...props} />;
  }

  return <DataGridNative ref={ref} {...props} />;
}) as <T>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(DataGrid as { displayName?: string }).displayName = "DataGrid";
