import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./_slider.scss";

const Slider = () => {
  const srcImg = [
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_1.jpg?1646575637708",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_2.jpg?1646575637708",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_3.jpg?1646575637708",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_4.jpg?1646575637708",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_5.jpg?1646575637708",
  ];
  return (
    <section className="sec-slider">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
      >
        {srcImg &&
          srcImg.length > 0 &&
          srcImg.map((src, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="slider-img" key={index}>
                  <img src={src} alt="" />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

export default Slider;
