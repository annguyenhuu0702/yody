import React from "react";
import { BrowserRouter } from "react-router-dom";
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
    </BrowserRouter>
  );
};

export default App;
