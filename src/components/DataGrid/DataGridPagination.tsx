import { Button } from "../Button";
import { cn } from "../../utils/cn";
import type { DataGridPaginationConfig } from "./DataGrid.types";
import styles from "./DataGrid.module.css";

type Props = {
  page: number;
  totalPages: number;
  totalRows: number;
  pageSize: number;
  config: DataGridPaginationConfig;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  className?: string;
};

export function DataGridPagination({
  page,
  totalPages,
  totalRows,
  pageSize,
  config,
  onPageChange,
  onPageSizeChange,
  className,
}: Props) {
  const start = totalRows === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRows);
  const options = config.pageSizeOptions ?? [5, 10, 25, 50];

  return (
    <div className={cn(styles.pagination, className)} aria-label="Table pagination">
      <p className={styles.paginationMeta}>
        {totalRows === 0 ? "0 rows" : `${start}–${end} of ${totalRows}`}
      </p>
      <div className={styles.paginationControls}>
        <label className={styles.pageSizeLabel}>
          Rows
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {options.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <Button
          size="sm"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <span className={styles.pageIndicator}>
          Page {page} of {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
