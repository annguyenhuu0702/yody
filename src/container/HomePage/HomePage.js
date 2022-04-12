import React from "react";
import Banner from "./Banner/Banner";
import Services from "../../Components/Services/Services";
import Slide from "./Slider/Slider";
import HomeProducts from "./HomeProduct/HomeProducts";

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
