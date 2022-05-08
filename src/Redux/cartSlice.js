import { createSlice } from "@reduxjs/toolkit";

const checkCart = JSON.parse(localStorage.getItem("my-shop:carts"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: checkCart ? checkCart : [],
    message: "",
  },
  reducers: {
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const newCarts = [...state.carts];
      const index = newCarts.findIndex((item) => item.id === cartItem.id);
      if (index === -1) {
        newCarts.push(cartItem);
      } else {
        newCarts[index].quantity = cartItem.quantity;
      }
      state.carts = newCarts;
      localStorage.setItem("my-shop:carts", JSON.stringify(state.carts));
    },

    updateCart: (state, action) => {
      const cartItem = action.payload;
      const index = state.carts.findIndex(
        (item) =>
          item.product_color_size_id === cartItem.product_color_size_id &&
          item.user_id === cartItem.userId
      );
      if (index !== -1) {
        if (cartItem.quantity === 0) {
          state.carts.splice(index, 1);
        } else {
          state.carts[index].quantity = cartItem.quantity;
        }
      }
      localStorage.setItem("my-shop:carts", JSON.stringify(state.carts));
    },

    deleteCart: (state, action) => {
      const id = action.payload;
      state.carts = state.carts.filter((item) => item.id !== id);
      localStorage.setItem("my-shop:carts", JSON.stringify(state.carts));
    },

    showMessage: (state, action) => {
      state.message = action.payload;
    },

    getCartByUser: (state, action) => {
      state.carts = action.payload;
    },
  },
});

export const { addToCart, showMessage, getCartByUser, updateCart, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
