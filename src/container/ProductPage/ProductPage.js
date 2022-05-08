import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { apiGetAllProductByGenderCategorySlug } from "../../api/apiProduct";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";
import ListCake from "../../Components/ListCake/ListCake";
import Products from "../../Components/Products/Products";
import Services from "../../Components/Services/Services";
import "./_productpage.scss";

const ProductPage = ({ genderCategory }) => {
  const [products, setProducts] = useState();
  const [visible, setVisible] = useState(10);

  const location = useLocation();
  console.log(location);

  const showBannerContainer = () => {
    let src = "";
    if (location.pathname === "/nam") {
      src =
        "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/page_nam_slider_1.jpg?1647058579726";
    } else if (location.pathname === "/nu") {
      src =
        "https://res.cloudinary.com/diot4imoq/image/upload/v1651998620/page_nu_slider_1_dwk7ao.jpg";
    } else if (location.pathname === "/tre-em") {
      src =
        "https://res.cloudinary.com/diot4imoq/image/upload/v1651999291/page_treem_slider_1_xz3eyo.jpg";
    }
    return src;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const sortByCategory = async () => {
      const data = await apiGetAllProductByGenderCategorySlug(
        genderCategory.slug,
        `?limit=${visible}&pSize=true&pImage=true`
      );
      setProducts(data);
    };
    sortByCategory();
  }, [dispatch, genderCategory.slug, visible]);

  return (
    <>
      <ChangePageTitle pageTitle={genderCategory.full_name} />
      <div className="product-page">
        <div className="banner-container">
          <img className="w-100" src={showBannerContainer()} alt="" />
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
          <div className="row">
            <div className="banner">
              {location.pathname === "/nam" && (
                <>
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
                </>
              )}

              {location.pathname === "/nu" && (
                <>
                  <div className="col-lg-6">
                    <img
                      src="https://res.cloudinary.com/diot4imoq/image/upload/v1651998626/page_nu_banner_1_dkrlyj.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="col-lg-6">
                    <img
                      src="https://res.cloudinary.com/diot4imoq/image/upload/v1651999450/page_nu_banner_2_nzfyxs.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                </>
              )}

              {location.pathname === "/tre-em" && (
                <>
                  <div className="col-lg-6">
                    <img
                      src="https://res.cloudinary.com/diot4imoq/image/upload/v1651999299/page_treem_banner_1_h4anah.png"
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="col-12 d-flex flex-column">
                    <div className="col-lg-6">
                      <img
                        src="https://res.cloudinary.com/diot4imoq/image/upload/v1651999882/page_treem_banner_3_lqefqs.png"
                        alt=""
                        className="w-100"
                      />
                    </div>
                    <div className="col-lg-6">
                      <img
                        style={{ marginTop: "12px" }}
                        src="https://res.cloudinary.com/diot4imoq/image/upload/v1652000565/page_treem_banner_2_f8vzaj.png"
                        alt=""
                        className="w-100"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Products products={products} />
        <div className="container">
          <div className="row">
            <div className="col-12">
              {products?.total_page !== 1 ? (
                <div className="load-more">
                  <button onClick={() => setVisible(visible + 5)}>
                    Xem thêm
                  </button>
                </div>
              ) : (
                <div className="load-more">
                  <button onClick={() => setVisible(10)}>Thu gọn</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
