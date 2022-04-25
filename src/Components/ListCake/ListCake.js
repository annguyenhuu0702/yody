import React from "react";
import "./_listcake.scss";
import { Link } from "react-router-dom";

const ListCake = (props) => {
  const { genderCategory } = props;

  const showListCake = () => {
    let arr = [];
    genderCategory.group_categories.forEach((groupCategory) => {
      groupCategory.categories.forEach((category) => {
        console.log(category);
        arr.push(
          <div className="col-lg-3" key={category.id}>
            <Link to={`/${category.slug}`} className="list-cake-item">
              <img src={category.icon} alt="" />
              <span>{category.short_name}</span>
            </Link>
          </div>
        );
      });
    });
    return arr;
  };
  return (
    <div className="list-cake">
      <div className="container">
        <div className="row">{showListCake()}</div>
      </div>
    </div>
  );
};

export default ListCake;
