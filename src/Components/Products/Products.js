import React from "react";
import "./_product.scss";
import { Link } from "react-router-dom";
import { URL } from "../../constants";
import { castToVND } from "../../Common";

const Products = (props) => {
  const { products, visible } = props;
  console.log(products);

  return (
    <div className="container pl-0">
      <div className="row">
        {products.slice(0, visible)?.map((item) => {
          return (
            <div className="col-lg-3 col-md-4 col-6 product-item" key={item.id}>
              <div className="item-img">
                <Link to={`/${item.slug}`}>
                  <img
                    className="w-100"
                    src={`${item.Product_Colors[0].Product_Color_Images[0]?.url}`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="product-info">
                <div className="name">
                  <Link to={`/${item.slug}`} className="link-name">
                    {item.name}
                  </Link>
                </div>
                <div className="price">
                  <span className="current">{castToVND(item.price)}</span>
                  {/* {item.oldPrice === 0 ? (
                    ""
                  ) : (
                    <span className="sale">{castToVND(item.oldPrice)}</span>
                  )} */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
