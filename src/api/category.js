import axios from "axios";
import { URL } from "../constants";
import { getAllCategory } from "../Redux/category";

export const apiGetAllCategory = async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/v1/category`);
    dispatch(getAllCategory(res.data));
  } catch (err) {
    console.log(err);
  }
};
