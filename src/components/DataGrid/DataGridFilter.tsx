import { Input } from "../Input";
import { cn } from "../../utils/cn";
import type { DataGridColumn, DataGridColumnFilter, DataGridFilterState } from "./DataGrid.types";
import styles from "./DataGrid.module.css";

type ColumnFilterInputProps<T> = {
  column: DataGridColumn<T>;
  config: DataGridColumnFilter;
  value: string;
  onChange: (columnId: string, value: string) => void;
};

export function DataGridColumnFilterInput<T>({
  column,
  config,
  value,
  onChange,
}: ColumnFilterInputProps<T>) {
  const headerLabel = typeof column.header === "string" ? column.header : column.id;
  const placeholder = config.placeholder ?? `Filter ${headerLabel}`;

  if (config.type === "select") {
    return (
      <select
        className={styles.columnFilterSelect}
        value={value}
        aria-label={placeholder}
        onChange={(event) => onChange(column.id, event.target.value)}
        onClick={(event) => event.stopPropagation()}
      >
        <option value="">All</option>
        {config.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="search"
      className={styles.columnFilterInput}
      value={value}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(event) => onChange(column.id, event.target.value)}
      onClick={(event) => event.stopPropagation()}
    />
  );
}

type GlobalFilterProps = {
  filter: DataGridFilterState;
  placeholder?: string;
  onFilterChange: (filter: DataGridFilterState) => void;
  className?: string;
};

export function DataGridFilter({ filter, placeholder, onFilterChange, className }: GlobalFilterProps) {
  return (
    <div className={cn(styles.filterBar, className)}>
      <Input
        type="search"
        placeholder={placeholder ?? "Filter rows…"}
        value={filter.query ?? ""}
        onChange={(event) => onFilterChange({ ...filter, query: event.target.value })}
        aria-label="Filter table rows"
      />
    </div>
  );
}
