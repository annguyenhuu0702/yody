import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    message: "",
  },
  reducers: {
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const newCarts = [...state.carts];
      const index = newCarts.findIndex(
        (item) => item.id + "" === cartItem.id + ""
      );
      if (index === -1) {
        newCarts.push(cartItem);
      } else {
        newCarts[index].quantity = cartItem.quantity;
      }
      state.carts = newCarts;
    },

    showMessage: (state, action) => {
      state.message = action.payload;
    },

    getCartByUser: (state, action) => {
      state.carts = action.payload;
    },

    updateCart: (state, action) => {
      const cartItem = action.payload;
      const index = state.carts.findIndex(
        (item) =>
          item.sizeId === cartItem.sizeId && item.userId === cartItem.userId
      );
      if (index !== -1) {
        if (cartItem.quantity === 0) {
          state.carts.splice(index, 1);
        } else {
          state.carts[index].quantity = cartItem.quantity;
        }
      }
    },

    deleteCart: (state, action) => {
      const id = action.payload;
      state.carts = state.carts.filter((item) => item.id !== id);
    },
  },
});

export const { addToCart, showMessage, getCartByUser, updateCart, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
