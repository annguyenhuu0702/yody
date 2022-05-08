import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import ToastMessage from "./Components/ToastMessage/ToastMessage";
import PageRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollTop />
      {PageRoutes()}
      <Footer />
      {/* <BackToTop /> */}
      <ToastMessage />
    </BrowserRouter>
  );
};

export default App;
