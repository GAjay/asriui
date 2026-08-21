import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { DataGrid } from "./DataGrid";
import type { DataGridColumn } from "./DataGrid.types";

type ProductRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  status: "Draft" | "Active" | "Archived";
};

const seedRows: ProductRow[] = Array.from({ length: 120 }, (_, index) => ({
  id: `row-${index + 1}`,
  sku: `SKU-${String(index + 1).padStart(4, "0")}`,
  name: `Product ${index + 1}`,
  category: index % 3 === 0 ? "Hardware" : index % 3 === 1 ? "Software" : "Services",
  price: 10 + (index % 15) * 3,
  status: index % 5 === 0 ? "Draft" : index % 7 === 0 ? "Archived" : "Active",
}));

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
    sortable: true,
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
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    renderCell: (row) => (
      <Badge variant={row.status === "Active" ? "secondary" : "outline"}>{row.status}</Badge>
    ),
  },
];

function EditableCatalogDemo() {
  const [rows, setRows] = useState(seedRows);

  const exportRows = useMemo(() => rows, [rows]);

  return (
    <DataGrid
      columns={columns}
      rows={exportRows}
      getRowId={(row) => row.id}
      height={420}
      defaultSort={{ columnId: "sku", direction: "asc" }}
      editable={{
        validateOn: "blur",
        onRowsChange: setRows,
        onCellChange: ({ columnId, value }) => {
          console.info("cell saved", columnId, value);
        },
      }}
      pagination={{ pageSize: 8, pageSizeOptions: [8, 16, 32] }}
      virtualize={{ rowHeight: 48, threshold: 20 }}
      exportable={{ csv: true, excel: true, filename: "product-catalog" }}
    />
  );
}

const meta: Meta<typeof DataGrid> = {
  title: "Components/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const Native: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      rows={seedRows.slice(0, 6)}
      getRowId={(row) => row.id}
      height={280}
      defaultSort={{ columnId: "name", direction: "asc" }}
    />
  ),
};

export const EditableWithValidation: Story = {
  render: () => <EditableCatalogDemo />,
};
