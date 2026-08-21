import { createContext, useContext } from "react";
import type { TableSize, TableVariant } from "./Table.types";

export type TableContextValue = {
  variant: TableVariant;
  size: TableSize;
};

export const TableContext = createContext<TableContextValue>({
  variant: "default",
  size: "md",
});

export function useTableContext() {
  return useContext(TableContext);
}
