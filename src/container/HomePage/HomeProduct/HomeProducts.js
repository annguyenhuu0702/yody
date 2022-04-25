import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetAllProduct,
  apiGetAllProductByGenderCategorySlug,
} from "../../../api/apiProduct";
import Products from "../../../Components/Products/Products";
import "./_homeproduct.scss";

const HomeProducts = () => {
  const [idxCategory, setInxCategory] = useState(0);
  const [visible, setVisible] = useState(5);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const genderCategory = useSelector(
    (state) => state.genderCategory.genderCategory
  );

  useEffect(() => {
    const sortByCategory = async () => {
      await apiGetAllProduct(dispatch);
    };
    sortByCategory();
  }, [dispatch]);

  const getProductsByGenderCategory = async (item, index) => {
    await apiGetAllProductByGenderCategorySlug(
      dispatch,
      item.slug,
      `?limit=${visible}`
    );
    setInxCategory(index + 1);
    setVisible(5);
  };

  const getAllProduct = async () => {
    await apiGetAllProduct(dispatch);
    setInxCategory(0);
  };

  //load more product theo gendercategory
  useEffect(() => {
    const callApi = async () => {
      if (idxCategory === 0) {
        //
      } else {
        await apiGetAllProductByGenderCategorySlug(
          dispatch,
          genderCategory[idxCategory - 1].slug,
          `?limit=${visible}`
        );
      }
    };
    callApi();
  }, [dispatch, genderCategory, idxCategory, visible]);

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
              {genderCategory.map((item, index) => {
                return (
                  <li
                    className={`item ${
                      index + 1 === idxCategory ? "item-active" : "item"
                    }`}
                    key={item.slug}
                    onClick={() => {
                      getProductsByGenderCategory(item, index);
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
        <Products products={products} />
      </div>
      {products.total_page * products.length !== 5 &&
        (products.total_page !== 1 ? (
          <div className="load-more">
            <button onClick={() => setVisible(visible + 5)}>Xem thêm</button>
          </div>
        ) : (
          <div className="load-more">
            <button
              onClick={() => {
                setVisible(5);
              }}
            >
              Thu gọn
            </button>
          </div>
        ))}
    </section>
  );
};

export default HomeProducts;
