import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetAllProduct,
  apiGetAllProductByCategorySlug,
} from "../../../api/apiProduct";
import Products from "../../../Components/Products/Products";
import { sortProduct } from "../../../Redux/productSlide";
import "./_homeproduct.scss";

const HomeProducts = () => {
  const [visible, setVisible] = useState(10);
  const [idxCategory, setInxCategory] = useState(0);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const buyertypes = useSelector((state) => state.buyertype.buyertypes);

  useEffect(() => {
    const sortByCategory = async () => {
      await apiGetAllProduct(dispatch);
      // dispatch(sortProduct());
    };
    sortByCategory();
  }, [dispatch]);

  const showMoreProduct = () => {
    setVisible((prev) => {
      if (prev === products.length) {
        prev = 10;
      } else {
        prev = prev + 10;
        if (prev > products.length) {
          prev = products.length;
        }
      }
      return prev;
    });
  };

  const getProductsByBuyertype = async (item, index) => {
    await apiGetAllProductByCategorySlug(dispatch, item.slug);
    // dispatch(sortProduct());
    setInxCategory(index + 1);
  };

  const getAllProduct = async () => {
    await apiGetAllProduct(dispatch);
    // dispatch(sortProduct());
    setInxCategory(0);
  };

  return (
    <section className="home-product">
      <div className="container pl-0">
        <div className="tabs-title">
          <h2>ĐỀ XUẤT CHO BẠN</h2>
          <div className="title-destop">
            <ul className="title-list">
              <li
                className={`item ${0 === idxCategory ? "item-active" : "item"}`}
                onClick={() => {
                  getAllProduct();
                }}
              >
                Tất cả
              </li>
              {buyertypes.map((item, index) => {
                return (
                  <li
                    className={`item ${
                      index + 1 === idxCategory ? "item-active" : "item"
                    }`}
                    key={item.slug}
                    onClick={() => {
                      getProductsByBuyertype(item, index);
                    }}
                  >
                    {item.full_name}
                  </li>
                );
              })}

              <li className="item">Polo yody</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="product">
        <Products products={products} visible={visible} />
      </div>
      <div className="load-more">
        <button onClick={showMoreProduct}>
          {visible === products.length ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>
    </section>
  );
};

export default HomeProducts;
