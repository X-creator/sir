import { useState } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Column, Sorting } from "types";
import styles from "./table.module.scss";

interface DataTableHeadProps<Row extends object> {
  columns: readonly Column<Row>[];
  defaultSorting: Sorting;
  onSort: (sorting: Sorting) => void;
}

export const DataTableHead = <const Row extends object>({
  columns,
  defaultSorting,
  onSort,
}: DataTableHeadProps<Row>) => {
  const [[orderBy, order], setSorting] = useState(() => defaultSorting);

  const onTableSort = (field: string) => {
    const newOrder = field !== orderBy ? "asc" : order === "asc" ? "desc" : "asc";

    if (newOrder !== order || field !== orderBy) {
      const sorting: Sorting = [field, newOrder];
      onSort(sorting);
      setSorting(sorting);
    }
  };

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>
        {columns.map(({ field, align, sortable, headerName }) =>
          sortable ? (
            <TableCell key={field} align={align} sortDirection={orderBy === field ? order : false}>
              <TableSortLabel
                active={orderBy === field}
                direction={orderBy === field ? order : "asc"}
                onClick={() => {
                  onTableSort(field);
                }}
              >
                {headerName}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={field} align={align}>
              {headerName}
            </TableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
};
