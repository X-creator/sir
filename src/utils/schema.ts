import { z } from "zod";

export const RepositorySchema = z
  .object({
    name: z.string().trim().min(1),
    description: z.string().nullable(),
    licenseInfo: z
      .object({ name: z.string().trim().min(1) })
      .strict()
      .nullable(),
    primaryLanguage: z
      .object({ name: z.string().trim().min(1) })
      .strict()
      .nullable(),
    forkCount: z.number().nonnegative(),
    stargazerCount: z.number().nonnegative(),
    pushedAt: z.string().datetime().nullable(),
  })
  .strict();

export type Repository = z.infer<typeof RepositorySchema>;

export const ApiResponseSchema = z
  .object({
    search: z
      .object({
        nodes: RepositorySchema.array(),
        pageInfo: z
          .object({
            startCursor: z.string().nullable(),
            endCursor: z.string().nullable(),
            hasNextPage: z.boolean(),
            hasPreviousPage: z.boolean(),
          })
          .strict(),
        repositoryCount: z.number().nonnegative(),
      })
      .strict(),
  })
  .strict();

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
