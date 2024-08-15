export interface Pagination {
  direction: "forward" | "backward";
  cursor: string;
  limit: number;
}

export type SortingDirections = "asc" | "desc";

export type Sorting = [string, SortingDirections];

export interface SearchRepoQueryVariables {
  name: string;
  sorting: Sorting;
  pagination: Pagination;
}

export type FieldValue = string | number | boolean | null | undefined;

export type Column<Row extends object> = (
  | {
      field: Extract<keyof Row, string>;
      getField?: never;
    }
  | {
      field: string;
      getField: (row: Row) => FieldValue;
    }
) & {
  headerName: string;
  align: "left" | "right";
  sortable: boolean;
  format?: (value: FieldValue) => FieldValue;
};
