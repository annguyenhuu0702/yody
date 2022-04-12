import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./_productdetail.scss";
import { URL } from "../../constants/index";
import { castToVND, convertSizeStringToNumber } from "../../Common";
import { apiAddToCart } from "../../api/apiCart";
import { useSelector, useDispatch } from "react-redux";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";
import { apiProductBySlug } from "../../api/apiProduct";
import Services from "../../Components/Services/Services";

const ProductDetail = () => {
  const [state, setState] = useState({});
  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexSize, setIndexSize] = useState(0);

  const [qtt, setQtt] = useState(1);

  const [product, setProduct] = useState();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setIndexImage(0);
    return () => {
      setState({});
    };
  }, [indexColor]);

  useEffect(() => {
    const api = async () => {
      const data = await apiProductBySlug(params.productDetail);
      console.log(data);
      setProduct(data);
    };
    api();
    return () => {
      setState({});
    };
  }, [params.productDetail]);

  const handleQtt = () => {};

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  // const message = useSelector((state) => state.cart.message);
  // const carts = useSelector((state) => state.cart.carts);

  const addToCart = (data) => {
    apiAddToCart(user, dispatch, data);
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
                  <div className="small-wrap">
                    {product.Product_Colors[
                      indexColor
                    ].Product_Color_Images.map((item, index) => {
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
                  <div className="large-img">
                    <img
                      src={`${product.Product_Colors[indexColor].Product_Color_Images[indexImage].url}`}
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
                        Màu sắc: {product.Product_Colors[indexColor].color}
                      </span>
                    </div>
                    <div className="color-img">
                      {product.Product_Colors?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              indexColor === index
                                ? "img-wrap active"
                                : "img-wrap"
                            }
                            onClick={() => {
                              setIndexColor(index);
                            }}
                          >
                            <img
                              src={`${item.Product_Color_Images[indexImage].url}`}
                              alt=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {product.Product_Colors[indexColor].Product_Color_Sizes
                    .length > 0 ? (
                    <div className="info size">
                      <div className="text-size">
                        Kích thước:{" "}
                        {
                          product.Product_Colors[indexColor]
                            .Product_Color_Sizes[indexSize].size_text
                        }
                      </div>
                      <div className="size-item">
                        {product.Product_Colors[
                          indexColor
                        ].Product_Color_Sizes.map((item, index) => {
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
                </div>
                <div className="add-to-cart">
                  <button
                    type="button"
                    className="btn-add-cart"
                    onClick={() => {
                      addToCart({
                        sizeId:
                          product.Product_Colors[indexColor].sizes[indexSize]
                            .id,
                        quantity: qtt,
                        amount:
                          product.Product_Colors[indexColor].sizes[indexSize]
                            .amount,
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
                        sizeId:
                          product.Product_Colors[indexColor].sizes[indexSize]
                            .id,
                        quantity: qtt,
                        amount:
                          product.Product_Colors[indexColor].sizes[indexSize]
                            .amount,
                      });
                      navigate("/cart");
                    }}
                  >
                    Muan ngay
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
