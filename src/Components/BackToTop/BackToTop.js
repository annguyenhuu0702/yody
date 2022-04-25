import React from "react";
import { useEffect, useState } from "react";
import "./__backtotop.scss";

const BackToTop = () => {
  const [btnBackToTop, setBtnBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setBtnBackToTop(true);
      } else {
        setBtnBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {btnBackToTop && (
        <button className="button__scroll" onClick={scrollUp}>
          <i className="fa-solid fa-arrow-up-long"></i>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
