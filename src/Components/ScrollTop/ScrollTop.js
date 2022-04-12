import { useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";

function ScrollTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default ScrollTop;
