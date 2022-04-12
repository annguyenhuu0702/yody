import { configAxios } from "../config/configAxios";
import { URL } from "../constants";
import {
  addToCart,
  getCartByUser,
  updateCart,
  deleteCart,
  showMessage,
} from "../Redux/cartSlice";

export const apiAddToCart = async (user, dispatch, data) => {
  try {
    const res = await configAxios(user, dispatch).post(`${URL}/v1/cart`, data);
    if (res.data) {
      dispatch(addToCart(res.data));
    } else {
      dispatch(showMessage("Số lượng tồn không đủ!"));
    }
  } catch (err) {
    console.log(err);
  }
};

export const apiGetCartByUser = async (user, dispatch) => {
  try {
    const res = await configAxios(user, dispatch).get(
      `${URL}/v1/cart/userId/${user.id}`
    );
    dispatch(getCartByUser(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const apiUpdateCart = async (user, dispatch, data) => {
  try {
    await configAxios(user, dispatch).put(`${URL}/v1/cart`, data);
    dispatch(updateCart({ ...data, userId: user.id }));
  } catch (err) {
    console.log(err);
  }
};

export const apiDeleteCart = async (user, dispatch, id) => {
  try {
    await configAxios(user, dispatch).delete(`${URL}/v1/cart/${id}`);
    dispatch(deleteCart(id));
  } catch (err) {
    console.log(err);
  }
};
