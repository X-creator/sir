import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TablePaginationOwnProps } from "@mui/material/TablePagination";
import { DataTableHead } from "./table-head.tsx";
import { DataTablePagination } from "./table-pagination.tsx";
import { Column, FieldValue, Sorting } from "types";
import styles from "./table.module.scss";

interface DataTableProps<Row extends object> {
  columns: readonly Column<Row>[];
  rows: readonly Row[];
  onSelect: (row: Row) => void;
  onSort: (sorting: Sorting) => void;
  onPaginate: (pagination: { prevPage: number; currentPage: number } | { limit: number }) => void;
  defaultSorting: Sorting;
  defaultPagination: Pick<TablePaginationOwnProps, "rowsPerPage" | "count" | "rowsPerPageOptions">;
}

export const DataTable = <const Row extends object>({
  columns,
  rows,
  onSelect,
  onSort,
  onPaginate,
  defaultSorting,
  defaultPagination,
}: DataTableProps<Row>) => {
  const [selected, setSelected] = useState<Row>();

  return (
    <>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader>
          <DataTableHead columns={columns} defaultSorting={defaultSorting} onSort={onSort} />
          <TableBody>
            {rows.map((row, id) => (
              <TableRow
                selected={JSON.stringify(selected) === JSON.stringify(row)}
                key={id}
                onClick={() => {
                  onSelect(row);
                  setSelected(row);
                }}
              >
                {columns.map((column) => {
                  const field = column.getField
                    ? column.getField(row) // if nested field
                    : (row[column.field] as FieldValue);

                  const cellValue = column.format ? column.format(field) : field;

                  return <TableCell key={column.field}> {cellValue} </TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DataTablePagination {...defaultPagination} onPaginate={onPaginate} />
    </>
  );
};
