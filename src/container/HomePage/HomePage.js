import React from "react";
import Services from "../../Components/Services/Services";
import Banner from "./Banner/Banner";
import HomeProducts from "./HomeProduct/HomeProducts";
import Slide from "./Slider/Slider";
import "./__homepage.scss";

// const Slide = React.lazy(() => import("./Slider/Slider"));
// const Services = React.lazy(() =>
//   import("../../Components/Services/Services.js")
// );
// const Banner = React.lazy(() => import("./Banner/Banner"));
// const HomeProducts = React.lazy(() => import("./HomeProduct/HomeProducts"));

const HomePage = () => {
  return (
    // <Suspense
    //   fallback={
    //     <div>
    //       <img src="https://register.amis.vn/Content/img/loading.gif" alt="" />
    //     </div>
    //   }
    // >
    <div className="home-page">
      <Slide />
      <Services col={3} />
      <Banner />
      <HomeProducts />
    </div>
    // </Suspense>
  );
};

export default HomePage;
