import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllProductByCategorySlug } from "../../api/apiProduct";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";
import ListCake from "../../Components/ListCake/ListCake";
import Products from "../../Components/Products/Products";
import Services from "../../Components/Services/Services";
import { sortProduct } from "../../Redux/productSlide";
import "./_productpage.scss";

const ProductPage = ({ buyerType }) => {
  const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  // lấy sản phẩm theo slug, ví dụ: ao-thun-nam, ao-nam
  useEffect(() => {
    const sortByCategory = async () => {
      await apiGetAllProductByCategorySlug(dispatch, buyerType.slug);
      dispatch(sortProduct());
    };
    sortByCategory();
  }, [dispatch, buyerType.slug]);

  return (
    <>
      {/* <ChangePageTitle pageTitle={buyerType.name.toUpperCase()} /> */}
      <div className="product-page">
        <div className="banner-container">
          <img
            className="w-100"
            src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/page_nam_slider_1.jpg?1647058579726"
            alt=""
          />
        </div>
        <Services col={3} />
        <div className="container">
          <div className="title-block">
            <h3>MUA THEO THỂ LOẠI</h3>
          </div>
          <ListCake categories={categories} buyerType={buyerType} />
        </div>
        <div className="container">
          <div className="title-block">
            <h3>MUA THEO PHONG CÁCH</h3>
          </div>
          <div className="banner">
            <div className="col-lg-6">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/page_nam_banner_1.jpg?1647058579726"
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-lg-6">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/page_nam_banner_2.jpg?1647058579726"
                alt=""
                className="w-100"
              />
            </div>
          </div>
        </div>
        <Products products={products} />
      </div>
    </>
  );
};

export default ProductPage;
