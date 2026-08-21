import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataGrid } from "./DataGrid";

type Row = { id: string; name: string; status: string };

const rows: Row[] = [
  { id: "1", name: "Zebra", status: "Draft" },
  { id: "2", name: "Alpha", status: "Stable" },
];

const columns = [
  { id: "name", header: "Name", accessor: "name" as const, sortable: true, editable: true, required: true },
  { id: "status", header: "Status", accessor: "status" as const },
];

describe("DataGrid", () => {
  it("renders native rows", () => {
    render(<DataGrid columns={columns} rows={rows} getRowId={(row) => row.id} />);
    expect(screen.getByRole("cell", { name: "Zebra" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Stable" })).toBeInTheDocument();
  });

  it("sorts rows when header is clicked", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <DataGrid columns={columns} rows={rows} getRowId={(row) => row.id} onSortChange={onSortChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Sort by Name" }));
    expect(onSortChange).toHaveBeenCalledWith({ columnId: "name", direction: "asc" });
  });

  it("shows empty state", () => {
    render(<DataGrid columns={columns} rows={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("edits cells and validates on blur", async () => {
    const user = userEvent.setup();
    const onRowsChange = vi.fn();

    render(
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        editable={{ onRowsChange, validateOn: "blur", commitOn: "blur" }}
      />,
    );

    const input = screen.getAllByRole("textbox")[0]!;
    await user.clear(input);
    await user.tab();
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });

  it("fires onCellChange on blur after a valid edit, not on every keystroke", async () => {
    const user = userEvent.setup();
    const onCellChange = vi.fn();
    const onRowsChange = vi.fn();

    render(
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        editable={{ onRowsChange, onCellChange, validateOn: "blur", commitOn: "blur" }}
      />,
    );

    const input = screen.getAllByRole("textbox")[0]!;
    await user.click(input);
    await user.type(input, "!");
    expect(onCellChange).not.toHaveBeenCalled();
    await user.tab();
    expect(onCellChange).toHaveBeenCalledTimes(1);
  });

  it("expands row details when expandable is enabled", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        expandable={{
          renderExpandedRow: (row) => <div>Details for {row.name}</div>,
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /expand row 1/i }));
    expect(await screen.findByText("Details for Zebra")).toBeInTheDocument();
  });

  it("paginates rows", () => {
    const manyRows = Array.from({ length: 12 }, (_, index) => ({
      id: String(index + 1),
      name: `Row ${index + 1}`,
      status: "Stable",
    }));

    render(
      <DataGrid
        columns={columns}
        rows={manyRows}
        getRowId={(row) => row.id}
        pagination={{ pageSize: 5 }}
      />,
    );

    expect(screen.getByText("Row 1")).toBeInTheDocument();
    expect(screen.queryByText("Row 6")).not.toBeInTheDocument();
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
  });
});
