import React from "react";
import "./_topbar.scss";

const TopBar = () => {
  return (
    <section className="topbar">
      <div className="banner">
        <a href=" ">
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/bannertop.jpg?1646486842767"
            alt=""
          />
        </a>
      </div>
      <div className="container content-text">
        <div className="search-store">
          <i className="fa-solid fa-location-dot"></i>
          <a href=" ">
            Tìm <b>160+</b> cửa hàng
          </a>
        </div>
        <div className="hotline">
          <i className="fa-solid fa-phone"></i>
          <a href=" ">18002086</a>
        </div>
        <div className="mail-store">
          <i className="fa-solid fa-envelope"></i>
          <a href=" ">chamsockhachhang@yody.vn</a>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
