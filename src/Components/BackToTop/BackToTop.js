import React from "react";
import { useEffect, useState } from "react";
import "./__backtotop.scss";

const BackToTop = () => {
  const [btnBackToTop, setBtnBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBtnBackToTop(true);
      } else {
        setBtnBackToTop(false);
      }
    });
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
