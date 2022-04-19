import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../api/apiAuth";
import {
  apiDeleteCart,
  apiGetCartByUser,
  apiUpdateCart,
} from "../../api/apiCart";
import { apiGetAllGenderCategory } from "../../api/apiGenderCategory";
import { castToVND } from "../../Common";
import "./_navbar.scss";

const NavBar = () => {
  const category = [
    { name: "POLY YODY", id: Date.now() + Math.random(), link: "polo-yody" },
    { name: "BỘ SƯU TẬP", id: Date.now() + Math.random(), link: "bo-suu-tap" },
    { name: "YODY LOVE", id: Date.now() + Math.random(), link: "yody-love" },
    { name: "ĐỒNG PHỤC", id: Date.now() + Math.random(), link: "dong-phuc" },
  ];

  const myInfo = [
    {
      name: "Tài khoản của tôi",
      url: "account",
    },
    {
      name: "Đổi mật khẩu",
      url: "account/changepassword",
    },
    {
      name: "Sổ địa chỉ",
      url: "account/address",
    },
    {
      name: "Sản phẩm yêu thích",
      url: "yeu-thich",
    },
  ];

  const user = useSelector((state) => state.auth.login?.currentUser);
  const genderCategory = useSelector(
    (state) => state.genderCategory.genderCategory
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  useEffect(() => {
    // apigetAllGenderCategory(dispatch);
    apiGetAllGenderCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      apiGetCartByUser(user, dispatch);
    }
  }, [dispatch, user]);

  const carts = useSelector((state) => state.cart.carts);
  console.log(carts);

  const subTotal = () => {
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      total +=
        carts[i].product_color_size.product_color.product.price *
        carts[i].quantity;
    }
    return total;
  };

  const handleDeleteCart = (id) => {
    apiDeleteCart(user, dispatch, id);
  };

  const updateCart = (newQuantity, item) => {
    if (newQuantity > -1 && newQuantity <= item.product_color_size.amount) {
      apiUpdateCart(user, dispatch, {
        product_color_size_id: item.product_color_size_id,
        quantity: newQuantity,
      });
    }
  };

  return (
    <section className="header-nav-main container">
      <Link to="/" className="logo">
        <img
          src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/logo.svg?1646486842767"
          alt=""
        />
      </Link>
      <div className="header-nav">
        <ul className="header-menu">
          {genderCategory.map((item) => {
            return (
              <li className="category" key={item.slug}>
                <Link className="nav-name" to={`/${item.slug}`}>
                  {item.short_name}
                </Link>
                <div className="list-category">
                  <div className="wrap-item d-flex">
                    {item.group_categories.map((group) => {
                      return (
                        <div
                          className="category-item col-lg-2"
                          key={group.slug}
                        >
                          <Link to={`/${group.slug}`} className="title">
                            {group.short_name}
                          </Link>
                          <div className="item">
                            {group.categories.map((category) => {
                              return (
                                <Link
                                  to={`/${category.slug}`}
                                  key={category.slug}
                                >
                                  {category.short_name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
          {category.map((item) => {
            return (
              <li className="category" key={item.name}>
                <Link className="nav-name" to={`/${item.link}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="header-search">
        <input
          className="search-text form-control"
          placeholder="Tìm sản phẩm"
        />
        <button className="btn btn-warning btn-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="nav-main-right">
        <div className="auth">
          <a href=" ">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/user.svg?1646575637708"
              alt=""
            />
          </a>
          {user ? (
            <ul className="header-account">
              <li>
                <p>{`${user.first_name + " " + user.last_name}`}</p>
                {myInfo &&
                  myInfo.map((item) => {
                    console.log(item);
                    return (
                      <Link to={`/${item.url}`} key={item.name}>
                        <span className="my-info">{item.name}</span>
                      </Link>
                    );
                  })}

                <Link
                  to="/account/login"
                  className="logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="header-account">
              <li>
                <Link to="/account/register" className="register">
                  Đăng kí
                </Link>
              </li>
              <li>
                <Link to="/account/login" className="login">
                  Đăng nhập
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="cart">
          <Link to="/cart">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/cart.svg?1646575637708"
              alt=""
            />
          </Link>
          {carts.length > 0 && user ? (
            <div className="cart-length">
              <Link to={`/cart`}>
                <span>{carts.length}</span>
              </Link>
            </div>
          ) : (
            ""
          )}
          <div className="cart-content">
            {carts.length > 0 && user ? (
              <div className="cart-container">
                <div className="cart-top"></div>
                <div className="cart-item">
                  {carts.map((item) => {
                    return (
                      <div className="cart-main" key={item.id}>
                        <div className="img">
                          <Link to={`/${item.slug}`}>
                            <img
                              src={`${item.product_color_size.product_color.product_color_images[0].url}`}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="cart-info">
                          <div className="info name">
                            <Link
                              to={`/${item.product_color_size.product_color.product.slug}`}
                            >
                              {
                                item.product_color_size.product_color.product
                                  .name
                              }
                            </Link>
                            <i
                              className="fa-solid fa-trash-can"
                              onClick={() => {
                                handleDeleteCart(item.id);
                              }}
                            ></i>
                          </div>
                          <span className="info price">
                            {castToVND(
                              item.product_color_size.product_color.product
                                .price
                            )}
                          </span>
                          <span className="info color-size">
                            {item.product_color_size.product_color.color} /{" "}
                            {item.product_color_size.size_text}
                          </span>
                          <div className="info qtt">
                            <div className="cart-qtt">
                              <div className="quantity">
                                <button
                                  type="button"
                                  className="btn-qtt minus"
                                  onClick={() => {
                                    updateCart(item.quantity - 1, item);
                                  }}
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </button>
                                <input
                                  className="form-control"
                                  value={item.quantity}
                                  onChange={(e) => updateCart(e.target.value)}
                                />
                                <button
                                  type="button"
                                  className="btn-qtt plus"
                                  onClick={() => {
                                    updateCart(item.quantity + 1, item);
                                  }}
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                              </div>
                            </div>
                            <div className="total-price">
                              <span>Tổng cộng</span>
                              <span>
                                {castToVND(
                                  item.product_color_size.product_color.product
                                    .price * item.quantity
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="subs-total">
                  <span>Tổng cộng: </span>
                  <span>{castToVND(subTotal())}</span>
                </div>
                <div className="payment">
                  <button
                    className="btn-payment"
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            ) : (
              <div className="cart-no-item">
                <img
                  src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/blank_cart.svg?1646575637708"
                  alt=""
                  className="cart-img"
                />
                <p className="cart-message">Giỏ hàng của bạn đang trống</p>
                {!user ? (
                  <Link to="/account/login" className="login-cart">
                    Đăng nhập/Đăng kí
                  </Link>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bars">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
