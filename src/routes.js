import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CartDetail from "./container/CartDetail/CartDetail";
import HomePage from "./container/HomePage/HomePage";
import Login from "./container/Login/Login";
import ProductCategory from "./container/ProductCategory/ProductCategory";
import ProductDetail from "./container/ProductDetail/ProductDetail";
import ProductPage from "./container/ProductPage/ProductPage";
import Register from "./container/Register/Register";

const PageRoutes = () => {
  const gendercategories = useSelector(
    (state) => state.genderCategory.genderCategory
  );

  const showRouteCategory = () => {
    let arr = [];
    gendercategories.forEach((genderCategory) => {
      arr.push(
        <Route
          key={genderCategory.slug}
          path={`/${genderCategory.slug}`}
          element={<ProductPage genderCategory={genderCategory} />}
        />
      );
      genderCategory.group_categories.forEach((groupCategory) => {
        arr.push(
          <Route
            key={groupCategory.slug}
            path={`/${groupCategory.slug}`}
            element={<ProductCategory groupCategory={groupCategory} />}
          />
        );
        groupCategory.categories.forEach((category) => {
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
