import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: JSON.parse(localStorage.getItem("my-shop:user")),
      isFetching: false,
      error: false,
      message: "",
    },
    register: {
      isFetching: false,
      success: false,
      error: false,
      message: "",
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.error = false;
      state.login.currentUser = action.payload;
      localStorage.setItem(
        "my-shop:user",
        JSON.stringify(state.login.currentUser)
      );
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.message = action.payload;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.message = action.payload;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.error = false;
      state.login.currentUser = null;
      localStorage.setItem(
        "my-shop:user",
        JSON.stringify(state.login.currentUser)
      );
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    refreshToken: (state, action) => {
      state.login.currentUser.accessToken = action.payload;
      localStorage.setItem("my-shop:user", JSON.stringify(state.currentUser));
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  refreshToken,
} = authSlice.actions;
export default authSlice.reducer;
