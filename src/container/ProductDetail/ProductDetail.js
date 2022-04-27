import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiAddToCart } from "../../api/apiCart";
import { apiProductBySlug } from "../../api/apiProduct";
import { castToVND } from "../../Common";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";
import Services from "../../Components/Services/Services";
import { showMessage } from "../../Redux/cartSlice";
import "./_productdetail.scss";

const ProductDetail = () => {
  const [state, setState] = useState({});
  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexSize, setIndexSize] = useState(0);

  const [qtt, setQtt] = useState(1);

  const [product, setProduct] = useState();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const message = useSelector((state) => state.cart.message);
  const carts = useSelector((state) => state.cart.carts);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const api = async () => {
      const data = await apiProductBySlug(params.productDetail);
      setProduct(data);
    };
    api();
    return () => {
      setState({});
    };
  }, [params.productDetail]);

  useEffect(() => {
    // tìm sizeID trong giỏ hàng
    // số lượng hiện: nếu có thì lấy số lượng giỏ hàng còn không thì cho bằng 0
    // so sánh số luong hiện tại với giỏ hàng ===> nếu lớn hơn thì xuất mess không đủ số lượng còn không thì xuất mess ""
    if (product) {
      const checkCart = carts.find(
        (item) =>
          item.product_color_size_id ===
          product.product_colors[indexColor].product_color_sizes[indexSize].id
      );
      const currentQtt = checkCart ? checkCart.quantity : 0;
      if (
        product &&
        qtt + currentQtt ===
          product.product_colors[indexColor].product_color_sizes[indexSize]
            .amount +
            1
      ) {
        dispatch(showMessage("Số lượng tồn không đủ!"));
      } else if (
        product &&
        qtt + currentQtt <=
          product.product_colors[indexColor].product_color_sizes[indexSize]
            .amount
      ) {
        dispatch(showMessage(""));
      }
    }
  }, [carts, dispatch, indexColor, indexSize, product, qtt]);

  const handleQtt = () => {};

  const addToCart = (data) => {
    // apiAddToCart(user, dispatch, data);
    const checkCart = carts.find(
      (item) =>
        item.product_color_size_id ===
        product.product_colors[indexColor].product_color_sizes[indexSize].id
    );
    const currentQtt = checkCart ? checkCart.quantity : 0;
    if (
      data.quantity + currentQtt <=
      product.product_colors[indexColor].product_color_sizes[indexSize].amount
    ) {
      apiAddToCart(user, dispatch, data);
    } else {
      dispatch(showMessage("Số lượng tồn không đủ!"));
    }
  };

  if (!product) return "";
  return (
    <>
      <ChangePageTitle pageTitle={product.name} />
      <div className="product-detail">
        <section className="bread-crumb">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul className="breadcrumbs">
                  <li className="home">
                    <Link to="/">Trang chủ</Link>
                    <span className="mr_lr">&nbsp;/&nbsp;</span>
                  </li>
                  <li>
                    <span>{product.name}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="main-product">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 left">
                <div className="product-detail-img">
                  {product?.product_colors[indexColor]?.product_color_images
                    .length > 1 && (
                    <div className="small-wrap">
                      {product.product_colors[
                        indexColor
                      ].product_color_images.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              indexImage === index
                                ? "small-img active"
                                : "small-img"
                            }
                            onClick={() => {
                              setIndexImage(index);
                            }}
                          >
                            <img src={`${item.url}`} alt="" />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="large-img">
                    <img
                      src={`${product.product_colors[indexColor].product_color_images[indexImage].url}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-5 right">
                <div className="info-product">
                  <div className="info name">
                    <span>{product.name}</span>
                  </div>
                  <div className="info price">
                    <span>{castToVND(product.price)}</span>
                  </div>
                  <div className="info color">
                    <div className="text-color">
                      <span>
                        Màu sắc: {product.product_colors[indexColor].color}
                      </span>
                    </div>
                    <div className="color-img">
                      {product.product_colors?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              indexColor === index
                                ? "img-wrap active"
                                : "img-wrap"
                            }
                            onClick={() => {
                              setIndexImage(0);
                              setIndexColor(index);
                            }}
                          >
                            <img
                              src={`${item.product_color_images[0].url}`}
                              alt=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {product.product_colors[indexColor].product_color_sizes
                    .length > 1 ? (
                    <div className="info size">
                      <div className="text-size">
                        Kích thước:{" "}
                        {
                          product.product_colors[indexColor]
                            .product_color_sizes[indexSize].size_text
                        }
                      </div>
                      <div className="size-item">
                        {product.product_colors[
                          indexColor
                        ].product_color_sizes.map((item, index) => {
                          return (
                            <div
                              className={`item ${
                                item.amount === 0
                                  ? "out-of-stock"
                                  : index === indexSize
                                  ? "active"
                                  : ""
                              }`}
                              key={item.id}
                              onClick={() => setIndexSize(index)}
                            >
                              {item.size_text}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="info quantity">
                    <button
                      type="button"
                      className="btn-qtt minus"
                      onClick={() => {
                        setQtt((prev) => {
                          if (qtt <= 1) {
                            return 1;
                          } else {
                            return prev - 1;
                          }
                        });
                      }}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      className="form-control"
                      value={qtt}
                      onChange={handleQtt}
                    />
                    <button
                      type="button"
                      className="btn-qtt plus"
                      onClick={() => {
                        setQtt((prev) => prev + 1);
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <p className="qtt-message">{message}</p>
                </div>
                <div className="add-to-cart">
                  <button
                    type="button"
                    className="btn-add-cart"
                    onClick={() => {
                      addToCart({
                        product_color_size_id:
                          product.product_colors[indexColor]
                            .product_color_sizes[indexSize].id,
                        quantity: qtt,
                      });
                    }}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    type="button"
                    className="btn-add-cart buy-now"
                    onClick={() => {
                      addToCart({
                        product_color_size_id:
                          product.product_colors[indexColor]
                            .product_color_sizes[indexSize].id,
                        quantity: qtt,
                      });
                      navigate("/cart");
                    }}
                  >
                    Mua ngay
                  </button>
                </div>
                <>
                  <Services col={6} />
                </>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
