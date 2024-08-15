import { ChangeEvent, MouseEvent, useState } from "react";
import TablePagination, { TablePaginationOwnProps } from "@mui/material/TablePagination";
import styles from "./table.module.scss";

interface DataTablePaginationProps extends Omit<TablePaginationOwnProps, "onPageChange" | "page"> {
  onPaginate: (pagination: { prevPage: number; currentPage: number } | { limit: number }) => void;
}

export const DataTablePagination = ({
  onPaginate,
  rowsPerPageOptions,
  rowsPerPage: defaultRowsPerPage,
  count,
}: DataTablePaginationProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(() => defaultRowsPerPage);

  const onPageChanger = (_: MouseEvent<HTMLButtonElement> | null, currentPage: number) => {
    onPaginate({ prevPage: page, currentPage });
    setPage(currentPage);
  };

  const onRowsPerPageChanger = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const limit = Number(e.target.value);
    onPaginate({ limit });
    setRowsPerPage(limit);
    setPage(0); // reset to first page
  };

  return (
    <TablePagination
      className={styles.tablePagination}
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChanger}
      onRowsPerPageChange={onRowsPerPageChanger}
    />
  );
};
