import { useRef, useState } from "react";
import { Button } from "../Button";
import { cn } from "../../utils/cn";
import type { DataGridColumn, DataGridExportConfig } from "./DataGrid.types";
import { exportDataGridToCsv, exportDataGridToExcel, importDataGridFromExcel } from "./exportDataGrid";
import styles from "./DataGrid.module.css";

type Props<T> = {
  columns: DataGridColumn<T>[];
  rows: T[];
  exportable?: boolean | DataGridExportConfig;
  onImport?: (rows: T[]) => void;
  className?: string;
};

export function DataGridToolbar<T>({ columns, rows, exportable, onImport, className }: Props<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  if (!exportable) return null;

  const config: DataGridExportConfig =
    exportable === true
      ? { csv: true, excel: true, import: false, filename: "export" }
      : { csv: true, excel: true, import: false, filename: "export", ...exportable };

  const filename = config.filename ?? "export";

  const handleExcelExport = async () => {
    setBusy(true);
    try {
      await exportDataGridToExcel({ columns, rows, filename });
    } finally {
      setBusy(false);
    }
  };

  const handleImport = async (file: File) => {
    setBusy(true);
    try {
      const imported = await importDataGridFromExcel(
        file,
        columns as DataGridColumn<Record<string, unknown>>[],
      );
      onImport?.(imported as T[]);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={cn(styles.toolbar, className)}>
      {config.csv !== false ? (
        <Button
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => exportDataGridToCsv({ columns, rows, filename })}
        >
          Export CSV
        </Button>
      ) : null}
      {config.excel !== false ? (
        <Button size="sm" variant="outline" disabled={busy} onClick={handleExcelExport}>
          Export Excel
        </Button>
      ) : null}
      {config.import ? (
        <>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleImport(file);
            }}
          />
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => inputRef.current?.click()}>
            Import Excel
          </Button>
        </>
      ) : null}
    </div>
  );
}
