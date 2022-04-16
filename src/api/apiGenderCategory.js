import axios from "axios";
import { URL } from "../constants";
import { getAllGenderCategory } from "../Redux/genderCategorySlice";

export const apiGetAllGenderCategory = async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/v1/gender-category`);
    dispatch(getAllGenderCategory(res.data));
  } catch (err) {
    console.log(err);
  }
};
