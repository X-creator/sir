import { useState } from "react";
import { DataTable } from "components/table";
import { Loader } from "components/loader";
import { Details } from "components/details";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import { paginate, sort } from "store/github-api-controls.ts";
import { useSearchRepoByNameQuery } from "api";
import { formatDate } from "utils";
import { Repository } from "utils/schema.ts";
import { Column, Pagination, Sorting } from "types";
import styles from "./main.module.scss";

const COLUMNS = [
  { field: "name", headerName: "Название", align: "left", sortable: false },
  {
    field: "primaryLanguage",
    getField: (row) => row?.primaryLanguage?.name,
    headerName: "Язык",
    align: "left",
    sortable: false,
  },
  {
    field: "forks",
    getField: (row) => row?.forkCount,
    headerName: "Число форков",
    align: "left",
    sortable: true,
  },
  {
    field: "stars",
    getField: (row) => row?.stargazerCount,
    headerName: "Число звезд",
    align: "left",
    sortable: true,
  },
  {
    field: "updated",
    getField: (row) => row?.pushedAt,
    headerName: "Дата обновления",
    align: "left",
    sortable: true,
    format: (value) => (typeof value === "string" ? formatDate(value) : value),
  },
] as const satisfies Column<Repository>[];

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;

export const Main = () => {
  const githubApiControls = useAppSelector((state) => state.githubApiControls);
  const { data, isError, isFetching, error } = useSearchRepoByNameQuery(githubApiControls, {
    skip: !githubApiControls.name,
  });
  const [selected, setSelected] = useState<Repository>();
  const dispatch = useAppDispatch();

  if (isError) console.error(error);

  const onSelect = (row: Repository) => {
    setSelected(row);
  };

  const onSort = (sorting: Sorting) => {
    dispatch(sort(sorting));
  };

  const onPaginate = (
    pagination: { prevPage: number; currentPage: number } | { limit: number },
  ) => {
    let pageInfo: Partial<Pagination> = {};

    if ("limit" in pagination) pageInfo = pagination;

    if ("currentPage" in pagination) {
      const direction: Pagination["direction"] =
        pagination.currentPage > pagination.prevPage ? "forward" : "backward";

      const cursor: Pagination["cursor"] =
        direction === "forward"
          ? (data?.pageInfo.endCursor ?? "")
          : (data?.pageInfo.startCursor ?? "");

      pageInfo = { direction, cursor };
    }

    dispatch(paginate(pageInfo));
  };

  return (
    <main className={styles.main}>
      {isError && <h1 className={styles.initialHeading}>Что-то пошло не так</h1>}

      {!data && <h1 className={styles.initialHeading}>Добро пожаловать</h1>}

      {data && (
        <>
          <div className={styles.result}>
            <h1 className={styles.heading}>Результаты поиска</h1>
            <DataTable
              columns={COLUMNS}
              rows={data?.nodes ?? []}
              onSelect={onSelect}
              onSort={onSort}
              onPaginate={onPaginate}
              defaultSorting={githubApiControls.sorting}
              defaultPagination={{
                rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
                rowsPerPage: githubApiControls.pagination.limit,
                count: data?.repositoryCount ?? 0,
              }}
            />
          </div>
          <div className={styles.details}>
            {!selected && data?.nodes?.length && (
              <h3 className={styles.detailsHeading}>Выберите репозиторий</h3>
            )}

            {selected && (
              <Details
                title={selected?.name}
                description={selected?.description ?? ""}
                licenseInfo={selected?.licenseInfo?.name}
              />
            )}
          </div>
        </>
      )}

      <Loader isLoading={isFetching} />
    </main>
  );
};
