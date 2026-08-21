export function DataGridAgGridFallback() {
  return (
    <div className="asriui-datagrid-fallback" role="status">
      <p>
        Install AG Grid to use <code>engine=&quot;ag-grid&quot;</code>:
      </p>
      <code>pnpm add ag-grid-community ag-grid-react</code>
    </div>
  );
}
