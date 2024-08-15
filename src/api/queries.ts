import { gql } from "graphql-request";

export const SearchRepoQuery = gql`
  query SearchRepo($query: String!, $first: Int, $last: Int, $before: String, $after: String) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      nodes {
        ... on Repository {
          name
          description
          licenseInfo {
            name
          }
          primaryLanguage {
            name
          }
          forkCount
          stargazerCount
          pushedAt
        }
      }
    }
  }
`;
