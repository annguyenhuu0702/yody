import axios from "axios";
import { URL } from "../constants";
import { getAllBuyerType } from "../Redux/buyerTypeSlice";

export const apiGetAllGenderCategory = async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/v1/gender-category`);
    console.log(res.data);
    dispatch(getAllBuyerType(res.data));
  } catch (err) {
    console.log(err);
  }
};
