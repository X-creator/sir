import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { SearchRepoQuery } from "api/queries.ts";
import { ApiResponse, ApiResponseSchema } from "utils/schema.ts";
import { SearchRepoQueryVariables } from "types";

const URL = "https://api.github.com/graphql";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: graphqlRequestBaseQuery({
    url: URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`); // replace with your access token
      return headers;
    },
  }),
  endpoints: (build) => ({
    searchRepoByName: build.query<ApiResponse["search"] | null, SearchRepoQueryVariables>({
      query: ({ name, pagination, sorting }) => ({
        document: SearchRepoQuery,
        variables: {
          query: `${name} in:name sort:${sorting.join("-")}`, // search in name and sorting
          ...(pagination.direction === "forward"
            ? {
                first: pagination.limit, // forward pagination
                after: pagination.cursor,
              }
            : {
                last: pagination.limit, // backward pagination
                before: pagination.cursor,
              }),
        },
      }),
      transformResponse: (res: ApiResponse) => {
        const result = ApiResponseSchema.safeParse(res);
        return result.success ? result.data.search : null;
      },
    }),
  }),
});

export const { useSearchRepoByNameQuery } = githubApi;
