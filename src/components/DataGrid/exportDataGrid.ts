import type { DataGridColumn } from "./DataGrid.types";
import { getRawValue } from "./DataGrid.utils";

export type DataGridExportOptions<T> = {
  columns: DataGridColumn<T>[];
  rows: T[];
  /** Download filename without extension. @default "export" */
  filename?: string;
  /** Sheet name for Excel exports. @default "Sheet1" */
  sheetName?: string;
};

function columnHeader<T>(column: DataGridColumn<T>) {
  return typeof column.header === "string" ? column.header : column.id;
}

function cellText(value: unknown) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

function escapeCsv(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function rowsToMatrix<T>(columns: DataGridColumn<T>[], rows: T[]) {
  const headers = columns.map(columnHeader);
  const body = rows.map((row) => columns.map((column) => cellText(getRawValue(row, column))));
  return [headers, ...body];
}

/** Export grid data to CSV — works in browser with zero dependencies. */
export function exportDataGridToCsv<T>({
  columns,
  rows,
  filename = "export",
}: DataGridExportOptions<T>) {
  const matrix = rowsToMatrix(columns, rows);
  const csv = matrix.map((line) => line.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * Export grid data to Microsoft Excel (.xlsx).
 * Requires optional peer dependency `xlsx` (SheetJS).
 */
export async function exportDataGridToExcel<T>({
  columns,
  rows,
  filename = "export",
  sheetName = "Sheet1",
}: DataGridExportOptions<T>) {
  let xlsxModule;
  try {
    xlsxModule = await import("xlsx");
  } catch {
    throw new Error(
      'Excel export requires the optional peer dependency "xlsx". Install with: pnpm add xlsx',
    );
  }

  const matrix = rowsToMatrix(columns, rows);
  const worksheet = xlsxModule.utils.aoa_to_sheet(matrix);
  const workbook = xlsxModule.utils.book_new();
  xlsxModule.utils.book_append_sheet(workbook, worksheet, sheetName);
  xlsxModule.writeFile(workbook, `${filename}.xlsx`);
}

/** Import rows from an Excel workbook. Requires optional peer `xlsx`. */
export async function importDataGridFromExcel<T extends Record<string, unknown>>(
  file: File,
  columns: DataGridColumn<T>[],
): Promise<T[]> {
  let xlsxModule;
  try {
    xlsxModule = await import("xlsx");
  } catch {
    throw new Error(
      'Excel import requires the optional peer dependency "xlsx". Install with: pnpm add xlsx',
    );
  }

  const buffer = await file.arrayBuffer();
  const workbook = xlsxModule.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0] ?? ""];
  if (!sheet) return [];

  const matrix = xlsxModule.utils.sheet_to_json<(string | number | boolean | null)[]>(sheet, {
    header: 1,
    defval: "",
  });

  const [headerRow, ...dataRows] = matrix;
  if (!headerRow?.length) return [];

  return dataRows
    .filter((row) => row.some((cell) => String(cell).trim() !== ""))
    .map((row) => {
      const record = {} as T;
      columns.forEach((column, index) => {
        const header = columnHeader(column);
        const headerIndex = headerRow.findIndex(
          (cell) => String(cell).trim().toLowerCase() === header.toLowerCase(),
        );
        const value = row[headerIndex >= 0 ? headerIndex : index];
        if (typeof column.accessor === "string") {
          (record as Record<string, unknown>)[column.accessor] = value;
        }
      });
      return record;
    });
}
