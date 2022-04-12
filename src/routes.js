import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// import { apiGetAllBuyerType } from "./api/apiBuyerType";
import { apiGetAllGenderCategory } from "./api/apiGenderCategory";
import { apiGetAllGroupCategory } from "./api/apiGroupCategory";
import { apiGetAllCategory } from "./api/category";
import HomePage from "./container/HomePage/HomePage";
import Login from "./container/Login/Login";
import ProductCategory from "./container/ProductCategory/ProductCategory";
import ProductPage from "./container/ProductPage/ProductPage";
import Register from "./container/Register/Register";
import ProductDetail from "./container/ProductDetail/ProductDetail";
import CartDetail from "./container/CartDetail/CartDetail";

const PageRoutes = () => {
  const genderCategories = useSelector((state) => state.buyertype.buyertypes);

  const showRouteCategory = () => {
    let arr = [];
    genderCategories.forEach((genderCategory) => {
      arr.push(
        <Route
          key={genderCategory.slug}
          path={`/${genderCategory.slug}`}
          element={
            <ProductPage
              genderCategory={genderCategory}
              buyerType={genderCategory}
            />
          }
        />
      );
      genderCategory.Group_Categories.forEach((groupCategory) => {
        arr.push(
          <Route
            key={groupCategory.slug}
            path={`/${groupCategory.slug}`}
            element={<ProductCategory groupCategory={groupCategory} />}
          />
        );
        groupCategory.Categories.forEach((category) => {
          arr.push(
            <Route
              key={category.slug}
              path={`/${category.slug}`}
              element={<ProductCategory category={category} />}
            />
          );
        });
      });
    });
    return arr;
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/account/login" element={<Login />} />
      <Route path="/account/register" element={<Register />} />
      <Route path="/:productDetail" element={<ProductDetail />} />
      <Route path="/cart" element={<CartDetail />} />
      {showRouteCategory()}
    </Routes>
  );
};

export default PageRoutes;
