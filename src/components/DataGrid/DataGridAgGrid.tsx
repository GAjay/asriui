import { lazy, Suspense, type ComponentType } from "react";
import type { DataGridAgGridProps } from "./DataGrid.types";
import styles from "./DataGrid.module.css";

const LazyAgGrid = lazy(() =>
  import("./DataGridAgGridInner").then((module) => ({
    default: module.DataGridAgGridInner,
  })),
);

export function DataGridAgGrid<T>(props: DataGridAgGridProps<T>) {
  const Grid = LazyAgGrid as ComponentType<DataGridAgGridProps<T>>;

  return (
    <Suspense fallback={<div className={styles.loading}>Loading data grid…</div>}>
      <Grid {...props} />
    </Suspense>
  );
}

DataGridAgGrid.displayName = "DataGridAgGrid";
