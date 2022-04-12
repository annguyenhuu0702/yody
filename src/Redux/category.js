import { createSlice } from "@reduxjs/toolkit";

const category = createSlice({
  name: "category",
  initialState: {
    category: [],
  },
  reducers: {
    getAllCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { getAllCategory } = category.actions;
export default category.reducer;
