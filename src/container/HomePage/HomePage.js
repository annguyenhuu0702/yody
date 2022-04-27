import React from "react";
import Services from "../../Components/Services/Services";
import Banner from "./Banner/Banner";
import HomeProducts from "./HomeProduct/HomeProducts";
import Slide from "./Slider/Slider";
import "./__homepage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <Slide />
      <Services col={3} />
      <Banner />
      <HomeProducts />
    </div>
  );
};

export default HomePage;
