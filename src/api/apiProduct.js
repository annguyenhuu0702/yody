import axios from "axios";
import { URL } from "../constants";
import { getAllProduct } from "../Redux/productSlide";

export const apiGetAllProduct = async (dispatch, limit) => {
  try {
    const res = await axios.get(`${URL}/v1/product`);
    dispatch(getAllProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const apiGetAllProductByGenderCategorySlug = async (
  dispatch,
  slug,
  limit
) => {
  try {
    const res = await axios.get(
      `${URL}/v1/product/gender-category-slug/${slug}${limit}`
    );
    dispatch(getAllProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const apiGetAllProductByCategorySlug = async (dispatch, slug) => {
  try {
    const res = await axios.get(`${URL}/v1/product/category-slug/${slug}`);
    dispatch(getAllProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const apiGetAllProductByGroupCategorySlug = async (dispatch, slug) => {
  try {
    const res = await axios.get(
      `${URL}/v1/product/group-category-slug/${slug}`
    );
    dispatch(getAllProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const apiProductBySlug = async (slug) => {
  try {
    const res = await axios.get(`${URL}/v1/product/slug/${slug}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
