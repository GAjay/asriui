import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "../../../src/components/DataGrid";
import type { DataGridFilterState, DataGridSortState } from "../../../src/components/DataGrid";

type Row = { id: string; name: string; status: string; owner: string };

const ALL_ROWS: Row[] = [
  { id: "1", name: "License", status: "Active", owner: "Ada" },
  { id: "2", name: "Support plan", status: "Trial", owner: "Grace" },
  { id: "3", name: "Analytics add-on", status: "Active", owner: "Lin" },
  { id: "4", name: "Storage pack", status: "Paused", owner: "Ada" },
  { id: "5", name: "API gateway", status: "Active", owner: "Noor" },
  { id: "6", name: "Design seats", status: "Trial", owner: "Grace" },
  { id: "7", name: "Workflow builder", status: "Active", owner: "Lin" },
  { id: "8", name: "Audit logs", status: "Paused", owner: "Noor" },
  { id: "9", name: "SSO bundle", status: "Active", owner: "Ada" },
  { id: "10", name: "Mobile SDK", status: "Trial", owner: "Grace" },
  { id: "11", name: "Edge cache", status: "Active", owner: "Lin" },
  { id: "12", name: "Premium support", status: "Paused", owner: "Noor" },
];

function sortServerRows(rows: Row[], sort: DataGridSortState | null) {
  if (!sort) return rows;
  const direction = sort.direction === "asc" ? 1 : -1;
  return [...rows].sort((left, right) => {
    const a = left[sort.columnId as keyof Row];
    const b = right[sort.columnId as keyof Row];
    return String(a).localeCompare(String(b)) * direction;
  });
}

function filterServerRows(rows: Row[], filter: DataGridFilterState) {
  const query = filter.query?.trim().toLowerCase();
  const columnValues = filter.columns ?? {};

  return rows.filter((row) => {
    if (columnValues.name && !row.name.toLowerCase().includes(columnValues.name.toLowerCase())) {
      return false;
    }
    if (columnValues.status && !row.status.toLowerCase().includes(columnValues.status.toLowerCase())) {
      return false;
    }
    if (columnValues.owner && !row.owner.toLowerCase().includes(columnValues.owner.toLowerCase())) {
      return false;
    }
    if (!query) return true;
    return `${row.name} ${row.status} ${row.owner}`.toLowerCase().includes(query);
  });
}

export const DATA_GRID_SERVER_CODE = `const [rows, setRows] = useState<Row[]>([]);
const [sort, setSort] = useState<DataGridSortState>(null);
const [filter, setFilter] = useState<DataGridFilterState>({ query: "" });
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(5);

<DataGrid
  columns={columns}
  rows={rows}
  getRowId={(row) => row.id}
  height={320}
  filter={{ query: filter.query, columns: filter.columns, onFilterChange: setFilter }}
  sort={sort}
  onSortChange={setSort}
  serverSide={{ totalRowCount: total }}
  pagination={{
    mode: "server",
    page,
    pageSize,
    totalRowCount: total,
    onPageChange: setPage,
    onPageSizeChange: setPageSize,
  }}
/>`;

export function DataGridServerExample() {
  const [sort, setSort] = useState<DataGridSortState>(null);
  const [filter, setFilter] = useState<DataGridFilterState>({ query: "" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => filterServerRows(ALL_ROWS, filter), [filter]);
  const sorted = useMemo(() => sortServerRows(filtered, sort), [filtered, sort]);
  const total = sorted.length;

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [page, pageSize, sorted]);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 180);
    return () => window.clearTimeout(timer);
  }, [filter, sort, page, pageSize]);

  const handleFilterChange = useCallback((next: DataGridFilterState) => {
    setFilter(next);
    setPage(1);
  }, []);

  return (
    <DataGrid
      columns={[
        { id: "name", header: "Product", accessor: "name", sortable: true, filterable: true },
        { id: "status", header: "Status", accessor: "status", sortable: true, filterable: true },
        { id: "owner", header: "Owner", accessor: "owner", sortable: true, filterable: true },
      ]}
      rows={pageRows}
      getRowId={(row) => row.id}
      height={320}
      loading={loading}
      filter={{
        query: filter.query,
        columns: filter.columns,
        onFilterChange: handleFilterChange,
      }}
      sort={sort}
      onSortChange={(next) => {
        setSort(next);
        setPage(1);
      }}
      serverSide={{ totalRowCount: total }}
      pagination={{
        mode: "server",
        page,
        pageSize,
        totalRowCount: total,
        onPageChange: setPage,
        onPageSizeChange: (next) => {
          setPageSize(next);
          setPage(1);
        },
      }}
    />
  );
}

export function DataGridFilterPaginationExample() {
  return (
    <DataGrid
      columns={[
        { id: "name", header: "Product", accessor: "name", sortable: true, filterable: true },
        {
          id: "status",
          header: "Status",
          accessor: "status",
          sortable: true,
          filterable: {
            type: "select",
            options: [
              { label: "Active", value: "Active" },
              { label: "Trial", value: "Trial" },
              { label: "Paused", value: "Paused" },
            ],
          },
        },
        { id: "owner", header: "Owner", accessor: "owner", sortable: true, filterable: true },
      ]}
      rows={ALL_ROWS}
      getRowId={(row) => row.id}
      height={360}
      filter={{ global: false, columnFilters: true }}
      pagination={{ pageSize: 5, pageSizeOptions: [5, 10] }}
      defaultSort={{ columnId: "name", direction: "asc" }}
    />
  );
}
