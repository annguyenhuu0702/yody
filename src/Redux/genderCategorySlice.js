import { createSlice } from "@reduxjs/toolkit";

const genderCategorySlice = createSlice({
  name: "genderCategory",
  initialState: {
    genderCategory: [],
  },
  reducers: {
    getAllGenderCategory: (state, action) => {
      state.genderCategory = action.payload;
    },
  },
});

export const { getAllGenderCategory } = genderCategorySlice.actions;
export default genderCategorySlice.reducer;
