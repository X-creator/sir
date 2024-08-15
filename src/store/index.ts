import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "api";
import githubApiControlsSliceReducer from "./github-api-controls";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    githubApiControls: githubApiControlsSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
