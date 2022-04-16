import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetAllProductByCategorySlug,
  apiGetAllProductByGroupCategorySlug,
} from "../../api/apiProduct";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";
import Products from "../../Components/Products/Products";
import { sortProduct } from "../../Redux/productSlide";
import "./_productcategory.scss";

const ProductCategory = ({ groupCategory, category }) => {
  console.log(groupCategory, category);
  const [sort, setSort] = useState("Mặc định");

  const [toogle, setToogle] = useState({
    color: false,
    size: false,
    price: false,
  });

  const options = [
    "Mặc định",
    "Tên A-Z",
    "Tên Z-A",
    "Giá giảm dần",
    "Giá tăng dần",
  ];

  const colors = [
    {
      color: "Xanh navy",
      colorCode: "#03204C",
    },
    {
      color: "Đen",
      colorCode: "#000000",
    },
    {
      color: "Xanh lá",
      colorCode: "#62BF5E",
    },
    {
      color: "Nâu",
      colorCode: "#613B0D",
    },
    {
      color: "Mint",
      colorCode: "#8CD6C4",
    },
    {
      color: "Xám",
      colorCode: "#C1C5C0",
    },
    {
      color: "Đỏ ",
      colorCode: "#F10008",
    },
    {
      color: "Xanh",
      colorCode: "#6BBBDD",
    },
    {
      color: "Tím than",
      colorCode: "#321B3B",
    },
    {
      color: "Vàng",
      colorCode: "#EFE159",
    },
    {
      color: "Trắng",
      colorCode: "#FFFFFF",
    },
    {
      color: "Hồng",
      colorCode: "#DC85AC",
    },
    {
      color: "Be",
      colorCode: "#E3CCB5",
    },
    {
      color: "Cam",
      colorCode: "#F19F00",
    },
    {
      color: "Tím ",
      colorCode: "#C48FE2",
    },
    {
      color: "Xanh cổ vịt",
      colorCode: "#00867D",
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

  const prices = [
    {
      price: "Nhỏ hơn 100.000đ",
    },
    {
      price: "Từ 100.000đ - 300.000đ",
    },
    {
      price: "Từ 300.000đ - 500.000đ",
    },
    {
      price: "Từ 500.000đ - 700.000đ",
    },

    {
      price: "Lớn hơn 700.000đ",
    },
  ];

  const dispatch = useDispatch();

  const products = useSelector((state) => state.product?.products);

  // áo quần phụ kiện---------áo thun nam, áo polo nam....
  const slug = groupCategory ? groupCategory.slug : category.slug;

  // sản phẩm theo category slug, group category slug
  useEffect(() => {
    if (!groupCategory) {
      apiGetAllProductByCategorySlug(dispatch, slug);
    } else {
      apiGetAllProductByGroupCategorySlug(dispatch, slug);
    }
  }, [dispatch, groupCategory, slug]);

  // sort product
  const handleSort = (sort) => {
    dispatch(sortProduct(sort));
    setSort(sort);
  };

  // loadmore color
  const [visible, setVisible] = useState(8);

  const handleLoadMore = () => {
    setVisible((prev) => {
      if (prev === 8) {
        prev = colors.length;
      } else {
        prev = 8;
      }
      return prev;
    });
  };

  // hover border color
  const color = useRef();

  const handleMoseEnter = (target, colorCode) => {
    color.current = target;
    target.style.border = `1px solid ${colorCode}`;
  };

  const handleMouseLeave = () => {
    color.current.style.border = `1px solid transparent`;
  };

  // filtered
  const [selectedFilter, setSelectedFilter] = useState({
    colors: [],
    sizes: [],
    prices: [],
  });

  const selectFilter = (item, key) => {
    const newFiltered = { ...selectedFilter };
    let index = -1;
    if (key === "colors") {
      index = newFiltered[key].findIndex((color) => color.color === item.color);
    } else if (key === "sizes") {
      index = newFiltered[key].findIndex((size) => size === item);
    } else if (key === "prices") {
      index = newFiltered[key].findIndex((price) => price === item);
    }
    if (index !== -1) {
      newFiltered[key].splice(index, 1);
    } else {
      newFiltered[key].push(item);
    }
    setSelectedFilter(newFiltered);
  };

  // bỏ chọn từng item
  const handleDeleteFilter = (item, key) => {
    let result = { ...selectedFilter }[key];
    if (key === "colors") {
      result = result.filter((color) => color.color !== item);
    } else if (key === "sizes") {
      result = result.filter((size) => size !== item);
    } else if (key === "prices") {
      result = result.filter((price) => price !== item);
    }
    setSelectedFilter({ ...selectedFilter, [key]: result });
  };

  return (
    <>
      <ChangePageTitle
        pageTitle={groupCategory ? groupCategory.full_name : category.full_name}
      />
      <div className="product-category">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 left">
              <div className="filter">
                {selectedFilter.colors.length > 0 ||
                selectedFilter.sizes.length > 0 ||
                selectedFilter.prices.length > 0 ? (
                  <div className="filtered">
                    <div className="filtered-header">
                      <span className="choose">Bạn chọn</span>
                      <span
                        className="clear-all"
                        onClick={() =>
                          setSelectedFilter({
                            colors: [],
                            sizes: [],
                            prices: [],
                          })
                        }
                      >
                        Bỏ hết
                      </span>
                    </div>
                    <div className="filtered-container">
                      {selectedFilter.colors.map((item) => {
                        return (
                          <span
                            key={item.color}
                            onClick={() => {
                              handleDeleteFilter(item.color, "colors");
                            }}
                          >
                            {item.color}
                          </span>
                        );
                      })}
                      {selectedFilter.sizes.map((item) => {
                        return (
                          <span
                            key={item}
                            onClick={() => {
                              handleDeleteFilter(item, "sizes");
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                      {selectedFilter.prices.map((item) => {
                        return (
                          <span
                            key={item}
                            onClick={() => {
                              handleDeleteFilter(item, "prices");
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="filter-color">
                  <div className="title">
                    <h3>Màu sắc</h3>
                    <div
                      onClick={() => {
                        setToogle({ ...toogle, color: !toogle.color });
                      }}
                    >
                      {toogle.color ? (
                        <i className="fa-solid fa-arrow-up"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down"></i>
                      )}
                    </div>
                  </div>
                  <div className="color">
                    <ul
                      className={`list-item list-color ${
                        toogle.color ? "hidden" : ""
                      }`}
                    >
                      {colors &&
                        colors.length > 0 &&
                        colors.slice(0, visible).map((item) => {
                          return (
                            <li
                              className="filter-item"
                              key={item.color}
                              ref={color}
                              onMouseEnter={(e) =>
                                handleMoseEnter(e.target, item.colorCode)
                              }
                              onMouseLeave={() => handleMouseLeave()}
                              onClick={() => {
                                selectFilter(item, "colors");
                              }}
                            >
                              <input
                                type="checkbox"
                                name=""
                                defaultValue=""
                                hidden
                              />
                              <span>
                                <i
                                  style={{
                                    backgroundColor: item.colorCode,
                                  }}
                                ></i>
                                {item.color}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                    {colors.length <= 8 || toogle.color ? (
                      ""
                    ) : (
                      <span
                        className="visible"
                        onClick={() => {
                          handleLoadMore();
                        }}
                      >
                        {visible <= 8 ? "Xem thêm" : "Thu gọn"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="filter-size">
                  <div className="title">
                    <h3>Kích thước</h3>
                    <div
                      onClick={() => {
                        setToogle({ ...toogle, size: !toogle.size });
                      }}
                    >
                      {toogle.size ? (
                        <i className="fa-solid fa-arrow-up"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down"></i>
                      )}
                    </div>
                  </div>
                  <div className="size">
                    <ul
                      className={`list-item list-size ${
                        toogle.size ? "hidden" : ""
                      }`}
                    >
                      {sizes &&
                        sizes.length > 0 &&
                        sizes.map((item) => {
                          return (
                            <li
                              className="filter-item"
                              key={item}
                              onClick={() => {
                                selectFilter(item, "sizes");
                              }}
                            >
                              <input
                                type="checkbox"
                                name=""
                                defaultValue=""
                                hidden
                              />
                              <span>{item}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className="filter-price">
                  <div className="title">
                    <h3>Khoảng giá (VNĐ)</h3>
                    <div
                      onClick={() => {
                        setToogle({ ...toogle, price: !toogle.price });
                      }}
                    >
                      {toogle.price ? (
                        <i className="fa-solid fa-arrow-up"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down"></i>
                      )}
                    </div>
                  </div>
                  <div className="price">
                    <ul
                      className={`list-item list-price ${
                        toogle.price ? "hidden" : ""
                      }`}
                    >
                      {prices.map((item) => {
                        return (
                          <li
                            key={item.price}
                            className="filter-item"
                            onClick={() => {
                              selectFilter(item.price, "prices");
                            }}
                          >
                            <input type="checkbox" name="" defaultValue="" />
                            <span>{item.price}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 right">
              <div className="section-sort">
                <span className="count">
                  {products.length > 0
                    ? `${products.length} sản phẩm`
                    : "Sản phẩm đang được cập nhật .........."}
                </span>
                <div className="sort">
                  <div className="form-group d-flex">
                    <div className="hover-sort">
                      Sắp xếp theo
                      <span>
                        {sort}
                        <i className="fa-solid fa-check"></i>
                      </span>
                    </div>
                    <ul className="list-sort">
                      {options.length > 0 &&
                        options.map((item) => {
                          return (
                            <li
                              key={item}
                              onClick={() => {
                                handleSort(item);
                              }}
                            >
                              <span>
                                {item}
                                {item === sort ? (
                                  <i className="fa-solid fa-check"></i>
                                ) : (
                                  ""
                                )}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="product">
                <Products products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
