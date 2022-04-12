import React from "react";
import "./_listcake.scss";
import { URL } from "../../constants/index";
import { Link } from "react-router-dom";

const ListCake = (props) => {
  const { categories, buyerType } = props;
  return (
    <div className="list-cake">
      <div className="container">
        <div className="row">
          {categories &&
            categories.length > 0 &&
            categories.map((item) => {
              if (item.icon === "") {
                return "";
              }
              return (
                <div className="col-lg-3" key={item.id}>
                  <Link to={`/${item.slug}`} className="list-cake-item">
                    <img src={`${URL}/${item.icon}`} alt="" />
                    <span>{item.name.split(buyerType.name.toLowerCase())}</span>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ListCake;
