import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiRefreshToken } from "../api/apiAuth";
import { refreshToken } from "../Redux/authSlice";
export const configAxios = (user, dispatch) => {
  const instance = axios.create({
    withCredentials: true,
  });
  instance.interceptors.request.use(
    async (config) => {
      if (user) {
        if (jwtDecode(user.accessToken) * 1000 < new Date().getTime()) {
          const data = await apiRefreshToken();
          if (data.accessToken) {
            dispatch(refreshToken(data.accessToken));
            config.headers["authorization"] = `Bearer ${data.accessToken}`;
          }
        } else {
          config.headers["authorization"] = `Bearer ${user.accessToken}`;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
};
