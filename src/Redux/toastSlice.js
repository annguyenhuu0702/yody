import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toastSlice",
  initialState: {
    toastMessage: {
      type: "success",
      isOpen: false,
      text: "",
    },
  },
  reducers: {
    showToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
  },
});

export const { showToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
