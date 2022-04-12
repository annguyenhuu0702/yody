import React from "react";
import "./_banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-share everyday-wear">
        <div className="container pl-0">
          <div className="slider-banner">
            <h2 className="text">EVERYDAY WEAR</h2>
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/banner_hangngay_1.jpg?1646575637708"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="banner-share yody">
        <div className="container pl-0">
          <div className="slider-banner">
            <h2 className="text">YODY</h2>
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/b1.jpg?1646575637708"
              alt=""
            />
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/b2.jpg?1646575637708"
              alt=""
            />
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/b3.jpg?1646575637708"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
