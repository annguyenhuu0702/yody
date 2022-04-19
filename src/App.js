import React from "react";
import { BrowserRouter } from "react-router-dom";
import BackToTop from "./Components/BackToTop/BackToTop";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import PageRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollTop />
      {PageRoutes()}
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
