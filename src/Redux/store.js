import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import productReducer from "./productSlide";
import buyertypeReducer from "./buyerTypeSlice";
import cartReducer from "./cartSlice";
import groupCategoryReducer from "./groupCategory";
import categoryReducer from "./category";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    buyertype: buyertypeReducer,
    cart: cartReducer,
    groupCategory: groupCategoryReducer,
    category: categoryReducer,
  },
});
