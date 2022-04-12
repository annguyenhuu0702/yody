import { createSlice } from "@reduxjs/toolkit";

const groupCategory = createSlice({
  name: "groupCategory",
  initialState: {
    groupCategory: [],
  },
  reducers: {
    getAllGroupCategory: (state, action) => {
      state.groupCategory = action.payload;
    },
  },
});

export const { getAllGroupCategory } = groupCategory.actions;
export default groupCategory.reducer;
