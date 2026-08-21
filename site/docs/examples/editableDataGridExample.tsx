/**
 * Full DataGrid example — editable cells, validation, pagination, virtualization, and export.
 * Copy into your app or open the Storybook story "EditableWithValidation".
 */
import { useState } from "react";
import { DataGrid, type DataGridColumn } from "../../../src/components/DataGrid";
import { ToastProvider, toast } from "../../../src/components/Toast";

type ProductRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
};

const columns: DataGridColumn<ProductRow>[] = [
  {
    id: "sku",
    header: "SKU",
    accessor: "sku",
    sortable: true,
    editable: true,
    width: 120,
    required: true,
    unique: true,
    pattern: /^SKU-\d{4}$/,
  },
  {
    id: "name",
    header: "Name",
    accessor: "name",
    editable: "text",
    minLength: 3,
    maxLength: 40,
  },
  {
    id: "category",
    header: "Category",
    accessor: "category",
    editable: "select",
    editor: {
      options: [
        { label: "Hardware", value: "Hardware" },
        { label: "Software", value: "Software" },
        { label: "Services", value: "Services" },
      ],
    },
    rules: [{ type: "oneOf", values: ["Hardware", "Software", "Services"] }],
  },
  {
    id: "price",
    header: "Price",
    accessor: "price",
    align: "right",
    editable: "number",
    min: 1,
    max: 999,
  },
];

const initialRows: ProductRow[] = Array.from({ length: 80 }, (_, index) => ({
  id: `row-${index + 1}`,
  sku: `SKU-${String(index + 1).padStart(4, "0")}`,
  name: `Product ${index + 1}`,
  category: ["Hardware", "Software", "Services"][index % 3]!,
  price: 10 + (index % 10) * 5,
}));

export const EDITABLE_DATA_GRID_CODE = `import { useState } from "react";
import { DataGrid, type DataGridColumn } from "axiom-ui/data-grid";
import { ToastProvider, toast } from "axiom-ui/toast";

type ProductRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
};

const columns: DataGridColumn<ProductRow>[] = [
  { id: "sku", header: "SKU", accessor: "sku", editable: true, required: true, unique: true },
  { id: "name", header: "Name", accessor: "name", editable: "text", minLength: 3 },
  { id: "category", header: "Category", accessor: "category", editable: "select", editor: { options: [...] } },
  { id: "price", header: "Price", accessor: "price", editable: "number", min: 1, max: 999 },
];

export function ProductCatalogGrid() {
  const [rows, setRows] = useState<ProductRow[]>(initialRows);

  return (
    <ToastProvider>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        height={420}
        editable={{
          validateOn: "blur",
          commitOn: "blur",
          onRowsChange: setRows,
          onCellChange: ({ row, columnId }) =>
            toast.success("Row saved", { description: \`Updated \${columnId} on \${row.name}\` }),
        }}
        expandable={{
          renderExpandedRow: (row) => (
            <div>
              <strong>{row.name}</strong> — SKU {row.sku}, {row.category}, \${row.price}
            </div>
          ),
        }}
        pagination={{ pageSize: 10, pageSizeOptions: [10, 25, 50] }}
        virtualize={{ rowHeight: 48, threshold: 30 }}
        exportable={{ csv: true, excel: true, filename: "products" }}
      />
    </ToastProvider>
  );
}`;

export function EditableDataGridExample() {
  const [rows, setRows] = useState(initialRows);

  return (
    <ToastProvider position="top-center">
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        height={420}
        defaultSort={{ columnId: "sku", direction: "asc" }}
        editable={{
          validateOn: "blur",
          commitOn: "blur",
          onRowsChange: setRows,
          onCellChange: ({ row, columnId }) =>
            toast.success("Row saved", {
              description: `Updated ${columnId} on ${row.name}`,
            }),
        }}
        expandable={{
          renderExpandedRow: (row) => (
            <div>
              <strong>{row.name}</strong> — SKU {row.sku}, {row.category}, ${row.price}
            </div>
          ),
        }}
        pagination={{ pageSize: 10, pageSizeOptions: [10, 25, 50] }}
        virtualize={{ rowHeight: 48, threshold: 30 }}
        exportable={{ csv: true, excel: true, filename: "products" }}
      />
    </ToastProvider>
  );
}
