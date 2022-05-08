import axios from "axios";
import { URL } from "../constants";

export const apiGetAllProduct = async (query) => {
  try {
    const res = await axios.get(`${URL}/v1/product${query}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const apiGetAllProductByGenderCategorySlug = async (slug, limit) => {
  try {
    const res = await axios.get(
      `${URL}/v1/product/gender-category-slug/${slug}${limit}`
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const apiGetAllProductByCategorySlug = async (slug, limit) => {
  try {
    const res = await axios.get(
      `${URL}/v1/product/category-slug/${slug}${limit}`
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const apiGetAllProductByGroupCategorySlug = async (slug, limit) => {
  try {
    const res = await axios.get(
      `${URL}/v1/product/group-category-slug/${slug}${limit}`
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const apiProductBySlug = async (slug) => {
  try {
    const res = await axios.get(
      `${URL}/v1/product/slug/${slug}?pSize=true&pImage=true`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
