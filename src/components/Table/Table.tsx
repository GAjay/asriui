import { forwardRef, useMemo } from "react";
import { cn } from "../../utils/cn";
import { TableContext } from "./TableContext";
import type {
  TableCaptionProps,
  TableCellProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
} from "./Table.types";
import styles from "./Table.module.css";

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, variant = "default", size = "md", scrollable = false, wrapperClassName, children, ...rest },
  ref,
) {
  const contextValue = useMemo(() => ({ variant, size }), [size, variant]);

  const table = (
    <TableContext.Provider value={contextValue}>
      <table
        ref={ref}
        className={cn(
          styles.table,
          size === "sm" && styles.sizeSm,
          variant === "striped" && styles.variantStriped,
          variant === "bordered" && styles.variantBordered,
          className,
        )}
        {...rest}
      >
        {children}
      </table>
    </TableContext.Provider>
  );

  if (!scrollable) return table;

  return <div className={cn(styles.wrapper, wrapperClassName)}>{table}</div>;
});
TableRoot.displayName = "Table";

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(function TableCaption(
  { className, children, ...rest },
  ref,
) {
  return (
    <caption ref={ref} className={cn(styles.caption, className)} {...rest}>
      {children}
    </caption>
  );
});
TableCaption.displayName = "Table.Caption";

const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableHeader(
  { className, children, ...rest },
  ref,
) {
  return (
    <thead ref={ref} className={cn(styles.head, className)} {...rest}>
      {children}
    </thead>
  );
});
TableHeader.displayName = "Table.Header";

const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableBody(
  { className, children, ...rest },
  ref,
) {
  return (
    <tbody ref={ref} className={cn(styles.body, className)} {...rest}>
      {children}
    </tbody>
  );
});
TableBody.displayName = "Table.Body";

const TableFooter = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableFooter(
  { className, children, ...rest },
  ref,
) {
  return (
    <tfoot ref={ref} className={cn(styles.footer, className)} {...rest}>
      {children}
    </tfoot>
  );
});
TableFooter.displayName = "Table.Footer";

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, selected = false, children, ...rest },
  ref,
) {
  return (
    <tr
      ref={ref}
      className={cn(styles.row, className)}
      data-selected={selected ? "true" : undefined}
      {...rest}
    >
      {children}
    </tr>
  );
});
TableRow.displayName = "Table.Row";

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, align = "left", children, ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      scope="col"
      className={cn(styles.cell, className)}
      data-align={align}
      {...rest}
    >
      {children}
    </th>
  );
});
TableHead.displayName = "Table.Head";

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, align = "left", children, ...rest },
  ref,
) {
  return (
    <td ref={ref} className={cn(styles.cell, className)} data-align={align} {...rest}>
      {children}
    </td>
  );
});
TableCell.displayName = "Table.Cell";

/** Semantic table primitives with striped, bordered, and scrollable layouts. */
export const Table = Object.assign(TableRoot, {
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});
