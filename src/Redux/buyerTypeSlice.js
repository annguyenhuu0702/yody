import { createSlice } from "@reduxjs/toolkit";

const buyerTypeSlice = createSlice({
  name: "buyertype",
  initialState: {
    buyertypes: [],
  },
  reducers: {
    getAllBuyerType: (state, action) => {
      state.buyertypes = action.payload;
    },
  },
});

export const { getAllBuyerType } = buyerTypeSlice.actions;
export default buyerTypeSlice.reducer;
