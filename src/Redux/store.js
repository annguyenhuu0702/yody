import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import productReducer from "./productSlide";
import genderCateogryReducer from "./genderCategorySlice";
import cartReducer from "./cartSlice";
import groupCategoryReducer from "./groupCategory";
import categoryReducer from "./category";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    genderCategory: genderCateogryReducer,
    cart: cartReducer,
    groupCategory: groupCategoryReducer,
    category: categoryReducer,
  },
});
