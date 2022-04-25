import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllProductByGenderCategorySlug } from "../../api/apiProduct";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";
import ListCake from "../../Components/ListCake/ListCake";
import Products from "../../Components/Products/Products";
import Services from "../../Components/Services/Services";
import { sortProduct } from "../../Redux/productSlide";
import "./_productpage.scss";

const ProductPage = ({ genderCategory }) => {
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const sortByCategory = async () => {
      await apiGetAllProductByGenderCategorySlug(dispatch, genderCategory.slug);
      dispatch(sortProduct());
    };
    sortByCategory();
  }, [dispatch, genderCategory.slug]);

  return (
    <>
      <ChangePageTitle pageTitle={genderCategory.full_name} />
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
          <ListCake genderCategory={genderCategory} />
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
