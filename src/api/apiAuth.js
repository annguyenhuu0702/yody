import axios from "axios";
import { URL } from "../constants";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "../Redux/authSlice";
import { showToastMessage } from "../Redux/toastSlice";

export const loginUSer = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${URL}/v1/auth/login`, user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data));
    dispatch(
      showToastMessage({
        type: "success",
        isOpen: true,
        text: "Đăng nhập thành công!",
      })
    );
    navigate("/");
  } catch (err) {
    dispatch(loginFailed(err.response.data));
    dispatch(
      showToastMessage({
        type: "warning",
        isOpen: true,
        text: "Thông tin của bạn không chính xác!",
      })
    );
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${URL}/v1/auth/register`, user, {
      withCredentials: true,
    });
    dispatch(registerSuccess(res.data));
    dispatch(
      showToastMessage({
        type: "success",
        isOpen: true,
        text: "Đăng kí thành công!",
      })
    );
    navigate("/account/login");
  } catch (err) {
    dispatch(registerFailed(err.response.data));
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    await axios.post(
      `${URL}/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(logoutSuccess());
    dispatch(
      showToastMessage({
        type: "success",
        isOpen: true,
        text: "Đăng xuất thành công!",
      })
    );
    navigate("/");
  } catch (err) {
    dispatch(logoutFailed());
  }
};

export const apiRefreshToken = async () => {
  try {
    const res = await axios.post(
      `${URL}/v1/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
