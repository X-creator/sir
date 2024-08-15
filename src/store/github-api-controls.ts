import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRepoQueryVariables } from "types";

const initialState: SearchRepoQueryVariables = {
  name: "",
  pagination: { direction: "forward", cursor: "", limit: 10 },
  sorting: ["updated", "desc"],
};

const githubApiControlsSlice = createSlice({
  name: "githubApiControls",
  initialState,
  reducers: {
    search(state, action: PayloadAction<SearchRepoQueryVariables["name"]>) {
      state.name = action.payload;
    },
    sort(state, action: PayloadAction<SearchRepoQueryVariables["sorting"]>) {
      state.sorting = action.payload;
    },
    paginate(state, action: PayloadAction<Partial<SearchRepoQueryVariables["pagination"]>>) {
      if ("limit" in action.payload) {
        state.pagination = { ...initialState.pagination, ...action.payload }; // reset to first page
      } else state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

export const { search, paginate, sort } = githubApiControlsSlice.actions;

export default githubApiControlsSlice.reducer;
